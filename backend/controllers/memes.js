import mongoose from 'mongoose';
import Mem from '../models/mem.js';

import { sampleMemes } from '../data.js';

export const getMemes = async (req, res) => {
    try {
        const memes = await Mem.find({});
        res.status(200).json(memes);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const addMemes = async (req, res) => {

};