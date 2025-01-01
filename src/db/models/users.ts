import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserInput {
    email: string;
    password: string;
}

interface UserDocument extends Document, UserInput {
    createdAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export { User, UserInput };