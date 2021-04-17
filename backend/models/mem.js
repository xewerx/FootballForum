import mongoose from 'mongoose';

const memSchema = mongoose.Schema({
    tittle: String,
    description: String,
    creator: String,
    file: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const mem = mongoose.model('memes', memSchema);

export default mem;