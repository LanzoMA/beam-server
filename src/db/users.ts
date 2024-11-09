import mongoose, { Schema } from "mongoose";

interface User extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema<User>({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

const User: mongoose.Model<User> = mongoose.model<User>('User', userSchema);

export const getUsers = async () => User.find();

export const getUserIdByEmail = async (email: string) => {
    const user = await User.findOne({ email }).exec();
    return user?._id;
}
export const createUser = async (user: User) => new User(user).save();
export const updateUserEmailById = async (id: string, email: string) => User.findByIdAndUpdate(id, { email });
export const updateUserPasswordById = async (id: string, password: string) => User.findByIdAndUpdate(id, { password });
export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
