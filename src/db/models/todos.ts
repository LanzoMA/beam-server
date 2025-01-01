import mongoose, { Document, Schema, Model } from 'mongoose';

interface TodoStructure {
    title: string;
    description?: string;
    user: Schema.Types.ObjectId;
};

interface Todo extends mongoose.Document {
    title: string
    description: string
    completed: boolean
    createdAt?: Date
    completedAt?: Date
    user: Schema.Types.ObjectId
}

const todoSchema: Schema<Todo> = new Schema<Todo>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    completedAt: { type: Date, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const TodoModel: mongoose.Model<Todo> = mongoose.model<Todo>('Todo', todoSchema);

export { TodoStructure, TodoModel };