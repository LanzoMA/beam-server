import { Request, Response } from 'express';
import { createTodo, getTodos } from '../db/todos';
import { getUserIdByEmail } from '../db/users';
import { Schema } from 'mongoose';

export const getTodosHandler = async (req: Request, res: Response): Promise<void> => {
    const todos = await getTodos();
    res.json(todos);
}

export const createTodoHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password, title, description } = req.body;

    if (!email || !password || !title) {
        res.sendStatus(400);
        return;
    }

    console.log(description);


    try {
        const userId: Schema.Types.ObjectId = await getUserIdByEmail(email);
        await createTodo({ title, description, user: userId });
        res.send('Todo successfully created');
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateTodoHandler = async (req: Request, res: Response): Promise<void> => {

}

export const deleteTodoHandler = async (req: Request, res: Response): Promise<void> => {

}
