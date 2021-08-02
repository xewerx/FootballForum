import MemAccepted from '../models/memAccepted.js';
import MemNoAccepted from '../models/memNoAccepted.js';
import Avatar from '../models/avatar.js';
import User from '../models/user.js';

export const getMemes = async (req, res) => {
    try {
        let memes = await MemAccepted.find().sort({createdAt: -1});

        for(let mem of memes) {
            let avatar = await Avatar.findOne({ ownerId: mem.creatorId });
            mem._doc.creatorAvatar = avatar ? avatar.image : null // add addiotional property which is no in schema
            let creator = await User.findOne({ _id: mem.creatorId });
            mem.creatorName = creator ? creator.name : "unknown"; // set creator name for mem by id of creator
        }
        return res.status(200).json(memes);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getMemesToAcceptation = async (req, res) => {
    try {
        let memes = await MemNoAccepted.find().sort({createdAt: -1});

        for(let mem of memes) {
            if(!mem.creatorId.split(' ')[0] === 'GA') { // if mem not from google user has a avatar of creator and maybe other creator name(use could change it)
                let avatar = await Avatar.findOne({ ownerId: mem.creatorId });
                mem._doc.creatorAvatar = avatar ? avatar.image : null // add addiotional property which is no in schema
                let creator = await User.findOne({ _id: mem.creatorId });
                mem.creatorName = creator ? creator.name : "unknown"; // set creator name for mem by id of creator
            }
        }

        return res.status(200).json(memes);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const uploadMem = async (req, res) => {
    try {
        const newMem = new MemNoAccepted;
        newMem.title = req.body.title;
        newMem.description = req.body.description;
        newMem.creatorId = req.user._id || `GA ${req.user.sub}`; // custom id or google auth id
        newMem.creatorName = req.user.name || req.user.given_name; // custom name or google name
        newMem.file = req.body.image;
        await newMem.save();
        return res.status(200).send({ message: "Mem dodany pomyslnie!"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const acceptMem = async (req, res) => {
    if(!req.body._id|| req.user.isAdmin != true) {
        return res.status(401).send({ message: 'Niepoprawne dane' });
    } else {
        try {
            const mem = await MemNoAccepted.findById(req.body._id);
            await MemAccepted.insertMany(mem);
            await MemNoAccepted.deleteOne({_id: req.body._id});
            return res.status(200).send({ message: "Mem zaakceptowany pomyślnie!"});
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    } 
};

export const discardMem = async (req, res) => {
    if(!req.body._id|| req.user.isAdmin != true) {
        return res.status(401).send({ message: 'Niepoprawne dane' });
    } else {
        try {
            await MemNoAccepted.deleteOne({_id: req.body._id});
            return res.status(200).send({ message: "Mem skasowany pomyślnie!"});
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    } 
};

export const deleteMem = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).send({ message: "Niepoprawne dane" });
    }

    try {
        await MemAccepted.deleteOne({_id: req.params.id});
        return res.status(200).send({ message: "Mem usunięty pomyślnie!"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};