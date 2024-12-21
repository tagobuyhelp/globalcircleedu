import { app, server } from './app.js';
import connectDB from './database/mongoConnection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => {
            console.log(`Server started on port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });