import mongoose, { Schema } from "mongoose";

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

export const getTodos = async () => TodoModel.find();
export const getTodosByUser = async (id: string) => TodoModel.find({ user: id });
export const createTodo = async (todo: TodoStructure) => new TodoModel(todo).save();
export const updateTodoTitleById = async (id: string, title: string) => TodoModel.findByIdAndUpdate(id, { title });
export const updateTodoDescriptionById = async (id: string, description: string) => TodoModel.findByIdAndUpdate(id, { description });
export const checkTodoById = async (id: string) => TodoModel.findByIdAndUpdate(id, { completed: true, completedAt: Date.now() });
export const uncheckTodoById = async (id: string) => TodoModel.findByIdAndUpdate(id, { completed: false, completedAt: null });
export const deleteTodoById = async (id: string) => TodoModel.findByIdAndDelete(id);  
