import bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';

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

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'No email or password' });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                return res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    livechat_projectID: process.env.LIVECHAT_PROJECTID,
                    livechat_chatID: process.env.LIVECHAT_CHATID,
                    livechat_chatAccessKey: process.env.LIVECHAT_CHATACCESSKEY
                });
            }
        }
        return res.status(401).send({ message: 'Invalid email or password' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const register = async (req, res) => {

    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    if (!strongPassword.test(req.body.password)) {
        return res.status(400).send({ message: "Haslo jest zbyt slabe" });
    }
    if (!EmailValidator.validate(req.body.email)) {
        return res.status(400).send({ message: "Niepoprawny adres email" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).send({ message: "Adres email jest zajety" });
    }

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const createdUser = await user.save();
        return res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
            livechat_projectID: process.env.LIVECHAT_PROJECTID,
            livechat_chatID: process.env.LIVECHAT_CHATID,
            livechat_chatAccessKey: process.env.LIVECHAT_CHATACCESSKEY
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}