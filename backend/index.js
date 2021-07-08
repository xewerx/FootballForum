import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import memesRoutes from './routes/memes.js';

const app = express();
dotenv.config();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api/memes', memesRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => app.listen(PORT, () => console.log("Server work on port: " + PORT)))
    .catch( (err) => console.log("Database connection error: " + err.message));