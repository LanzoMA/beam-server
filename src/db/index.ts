import mongoose from "mongoose";

export const connectDB = (): void => {
    mongoose.connect('mongodb://localhost:27017/beam');
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });
    mongoose.connection.on('error', error => {
        console.error('Error connecting to MongoDB:', error);
    });
};
