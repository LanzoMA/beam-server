import mongoose, { Schema } from 'mongoose';
import { User, UserInput } from '../models/users';

export const getUsers = async () => User.find();

export const getUserIdByEmail = async (email: string): Promise<Schema.Types.ObjectId> => {
    const user: mongoose.Document | null = await User.findOne({ email }).exec();

    if (!user) {
        throw Error('User not found');
    }

    return user._id as Schema.Types.ObjectId;
};

export const getUserPasswordByEmail = async (email: string): Promise<string> => {
    const user = await User.findOne({ email }).exec();

    if (!user) {
        throw Error('User not found');
    }

    return user.password;
}

export const createUser = async (user: UserInput): Promise<void> => {
    new User(user).save()
};

export const updateUserEmailByEmail = async (oldEmail: string, newEmail: string): Promise<void> => {
    User.updateOne({ email: oldEmail }, { email: newEmail }).exec();
};

export const updateUserPasswordByEmail = async (email: string, password: string): Promise<void> => {
    User.updateOne({ email }, { password }).exec();
};

export const deleteUserByEmail = async (email: string): Promise<void> => {
    User.deleteOne({ email }).exec();
};
