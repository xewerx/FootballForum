import bcrypt, { hashSync } from 'bcrypt';
import * as EmailValidator from 'email-validator';

import User from '../models/user.js';
import { generateToken } from '../middleware/auth.js';

import data from '../data.js';
import Avatar from '../models/avatar.js';
import MemAccepted from '../models/memAccepted.js';

const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

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
    let avatar;

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Brak adresu email lub hasła' });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                avatar = await Avatar.findOne({ ownerId: user._id });
                return res.status(200).send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: avatar ? avatar.image : null, // from avatars
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    livechat_projectID: process.env.LIVECHAT_PROJECTID,
                    livechat_chatID: process.env.LIVECHAT_CHATID,
                    livechat_chatAccessKey: process.env.LIVECHAT_CHATACCESSKEY
                });
            }
        }
        return res.status(401).send({ message: 'Niepoprawny email lub hasło' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const register = async (req, res) => {

    if (!strongPassword.test(req.body.password)) {
        return res.status(400).send({ message: "Hasło jest zbyt słabe" });
    }
    if (!EmailValidator.validate(req.body.email)) {
        return res.status(400).send({ message: "Niepoprawny adres email" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).send({ message: "Adres email jest zajęty" });
    }

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const createdUser = await user.save();
        return res.status(200).send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            avatar: "",
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
            livechat_projectID: process.env.LIVECHAT_PROJECTID,
            livechat_chatID: process.env.LIVECHAT_CHATID,
            livechat_chatAccessKey: process.env.LIVECHAT_CHATACCESSKEY
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const editProfile = async (req, res) => {
    let user = null;
    if(!req.body.email) {
        return res.status(400).send({ message: "Niepoprawne dane" }); // oszczedzam na zapytaniu do bazy 
    }

    try {
        user = await User.findOne({ email: req.body.email });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

    if(!user) {
        return res.status(400).send({ message: "Niepoprawne dane" });
    }

    if(req.body.name) {
        user.name = req.body.name;
    }

    if(req.body.password) {
        if (!strongPassword.test(req.body.password)) {
            return res.status(400).send({ message: "Hasło jest zbyt slabe" });
        } else {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
    }

    try {
        await user.save();
        return res.status(200).send({ message: "Dane zapisane pomyślnie"})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const uploadAvatar = async (req, res) => {
    if(!req.body.image) {
        return res.status(400).send({ message: "Niepoprawne dane" });
    }
    try {
        const currentAvatar = await Avatar.findOne({ ownerId: req.user._id })
        if(currentAvatar) {
            currentAvatar.image = req.body.image;
            await currentAvatar.save();
        } else {
            const newAvatar = new Avatar;
            newAvatar.image = req.body.image;
            newAvatar.ownerId = req.user._id;
            await newAvatar.save();
        }
        return res.status(200).send({ message: "Awatar ustawiony pomyślnie"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getAvatar = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).send({ message: "Niepoprawne dane" });
    }
    let avatar;
    try {
        avatar = await Avatar.findOne({ ownerId: req.params.id });
        return res.status(200).send({ avatar: avatar })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const likeOrUnlike = async (req, res) => {
    if(!req.params.id || req.body.isLike === undefined) {
        return res.status(400).send({ message: "Niepoprawne dane" });
    }
    try {
        if(req.body.isLike) {
            await MemAccepted.updateOne({ _id: req.params.id }, { $addToSet: { likes: req.user._id }}); // The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
        } else {
            await MemAccepted.updateOne({ _id: req.params.id }, { $pull: { likes: req.user._id }}); 
        }
        const mem = await MemAccepted.findOne({ _id: req.params.id });
        return res.status(200).send({ message: mem.likes });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
