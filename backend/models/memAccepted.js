import mongoose from 'mongoose';

const memSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    creatorId: { type: String, required: true},
    creatorName: { type: String, required: true},
    file: { type: String, required: true},
    likes: {
        type: [String],
        default: [],
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    }
}, {
    timestamps: true
})

const MemAccepted = mongoose.model('memesAccepted', memSchema);

export default MemAccepted;