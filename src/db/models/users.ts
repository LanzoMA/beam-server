import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserStructure {
    email: string;
    password: string;
}

interface User extends Document {
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema<User>({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

const UserModel: mongoose.Model<User> = mongoose.model<User>('User', userSchema);

export { UserModel, UserStructure };