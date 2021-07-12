import Mem from '../models/mem.js';

export const getMemes = async (req, res) => {
    try {
        const memes = await Mem.find().sort({createdAt: -1});
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadMem = async (req, res) => {
    try {
        const newMem = new Mem;
        newMem.title = req.body.title;
        newMem.description = req.body.description;
        newMem.creatorId = req.user._id;
        newMem.creatorName = req.user.name;
        newMem.file = req.body.image;
        await newMem.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};