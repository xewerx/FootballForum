import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema({
    ownerId: { type: String, required: true, unique: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});

const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;