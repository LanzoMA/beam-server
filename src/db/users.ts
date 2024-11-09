import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export const getUsers = async () => User.find();
export const createUser = async (email: string, password: string) => new User({ email, password }).save();
export const updateUserEmailById = async (id: string, email: string) => User.findByIdAndUpdate(id, { email });
export const updateUserPasswordById = async (id: string, password: string) => User.findByIdAndUpdate(id, { password });
export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
