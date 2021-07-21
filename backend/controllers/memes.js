import MemAccepted from '../models/memAccepted.js';
import MemNoAccepted from '../models/memNoAccepted.js';

export const getMemes = async (req, res) => {
    try {
        const memes = await MemAccepted.find().sort({createdAt: -1});
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
        return res.status(200).send({ message: "Mem dodany pomyslnie"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};