import bcrypt from 'bcrypt';

import User from '../models/user.js';
import { generateToken } from '../middleware/auth.js';

import data from '../data.js';

export const seed = async (req, res) => {
    try {
        await User.remove({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    } catch (error) {
        res.send(error.message);
    }
};

export const signin = async (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(401).send({ message: 'No email or password' });
        return;
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const register = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}