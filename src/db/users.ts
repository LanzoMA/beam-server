import mongoose, { Schema } from "mongoose";

interface User {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export const getUsers = async () => User.find();
export const createUser = async (user: User) => new User(user).save();
export const updateUserEmailById = async (id: string, email: string) => User.findByIdAndUpdate(id, { email });
export const updateUserPasswordById = async (id: string, password: string) => User.findByIdAndUpdate(id, { password });
export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
