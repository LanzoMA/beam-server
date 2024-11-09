import mongoose, { Schema } from "mongoose";

interface UserStructure {
    email: string;
    password: string;
}

interface User extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema<User>({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

const UserModel: mongoose.Model<User> = mongoose.model<User>('User', userSchema);

export const getUsers = async () => UserModel.find();

export const getUserIdByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email }).exec();
    return user?._id;
}
export const createUser = async (user: UserStructure) => new UserModel(user).save();
export const updateUserEmailById = async (id: string, email: string) => UserModel.findByIdAndUpdate(id, { email });
export const updateUserPasswordById = async (id: string, password: string) => UserModel.findByIdAndUpdate(id, { password });
export const deleteUserById = async (id: string) => UserModel.findByIdAndDelete(id);
