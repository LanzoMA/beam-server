import { TodoModel, TodoStructure } from "../models/todos";

export const getTodos = async () => TodoModel.find();
export const getTodosByUser = async (id: string) => TodoModel.find({ user: id });
export const createTodo = async (todo: TodoStructure) => new TodoModel(todo).save();
export const updateTodoTitleById = async (id: string, title: string) => TodoModel.findByIdAndUpdate(id, { title });
export const updateTodoDescriptionById = async (id: string, description: string) => TodoModel.findByIdAndUpdate(id, { description });
export const checkTodoById = async (id: string) => TodoModel.findByIdAndUpdate(id, { completed: true, completedAt: Date.now() });
export const uncheckTodoById = async (id: string) => TodoModel.findByIdAndUpdate(id, { completed: false, completedAt: null });
export const deleteTodoById = async (id: string) => TodoModel.findByIdAndDelete(id);  
