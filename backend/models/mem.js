import mongoose from 'mongoose';

const memSchema = mongoose.Schema({
    tittle: { type: String, required: true},
    description: { type: String, required: true},
    creator: { type: String, required: true},
    file: { type: String, required: true},
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    }
}, {
    timestamps: true
})

const Mem = mongoose.model('memes', memSchema);

export default Mem;