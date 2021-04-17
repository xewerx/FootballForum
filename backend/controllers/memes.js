import mongoose from 'mongoose';
import Mem from '../models/mem.js';

export const getMemes = async (req, res) => {
    try {
        const memes = await Mem.find();
        res.status(200).json(memes);
    } catch (error){
        console.log(error);
        res.status(404).json({message: "Something went wrong"});
    }
}