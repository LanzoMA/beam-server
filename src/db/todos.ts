import mongoose, { Schema } from "mongoose";

const todoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '', required: true },
    completed: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    completedAt: { type: Date, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

export const getTodos = async () => Todo.find();
export const getTodosByUser = async (id: string) => Todo.find({ user: id });
export const createTodo = async (values: Record<string, any>) => new Todo(values).save();
export const updateTodoTitleById = async (id: string, title: string) => Todo.findByIdAndUpdate(id, { title });
export const updateTodoDescriptionById = async (id: string, description: string) => Todo.findByIdAndUpdate(id, { description });
export const checkTodoById = async (id: string) => Todo.findByIdAndUpdate(id, { completed: true, completedAt: Date.now() });
export const uncheckTodoById = async (id: string) => Todo.findByIdAndUpdate(id, { completed: false, completedAt: null });
export const deleteTodoById = async (id: string) => Todo.findByIdAndDelete(id);  