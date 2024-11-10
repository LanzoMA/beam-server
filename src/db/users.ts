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

export const getUserIdByEmail = async (email: string): Promise<Schema.Types.ObjectId> => {
    const user: mongoose.Document | null = await UserModel.findOne({ email }).exec();

    if (!user) {
        throw Error('User not found');
    }

    return user._id as Schema.Types.ObjectId;
};

export const getUserPasswordByEmail = async (email: string): Promise<string> => {
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
        throw Error('User not found');
    }

    return user.password;
}

export const createUser = async (user: UserStructure): Promise<void> => { new UserModel(user).save() };
export const updateUserEmailById = async (id: string, email: string): Promise<void> => { UserModel.findByIdAndUpdate(id, { email }) };
export const updateUserPasswordById = async (id: string, password: string): Promise<void> => { UserModel.findByIdAndUpdate(id, { password }) };
export const deleteUserById = async (id: string): Promise<void> => { UserModel.findByIdAndDelete(id) };
