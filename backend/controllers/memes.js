import MemAccepted from '../models/memAccepted.js';
import MemNoAccepted from '../models/memNoAccepted.js';
import Avatar from '../models/avatar.js';

export const getMemes = async (req, res) => {
    try {
        const memes = await MemAccepted.find().sort({createdAt: -1});

        for(const mem of memes) {
            let avatar = await Avatar.findOne({ ownerId: mem.creatorId });
            mem.creatorAvatar = avatar ? avatar.image : null
        }
        return res.status(200).json(memes);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getMemesToAcceptation = async (req, res) => {
    try {
        const memes = await MemNoAccepted.find().sort({createdAt: -1});
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
        newMem.creatorId = req.user._id;
        newMem.creatorName = req.user.name;
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