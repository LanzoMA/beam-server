import { Request, Response } from 'express';
import { checkTodoById, createTodo, deleteTodoById, getTodos, uncheckTodoById, updateTodoDescriptionById, updateTodoTitleById } from '../db/todos';
import { getUserIdByEmail } from '../db/users';
import { Schema } from 'mongoose';

export const getTodosHandler = async (req: Request, res: Response): Promise<void> => {
    const todos = await getTodos();
    res.json(todos);
};

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
};

export const updateTodoHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password, id, title, description, checked } = req.body;

    if (!email || !password) {
        res.status(400).send('Email and password was not found');
        return;
    }

    if (!id) {
        res.status(400).send('No todo given to change');
        return;
    }

    if (title) {
        await updateTodoTitleById(id, title);
    }

    if (description) {
        await updateTodoDescriptionById(id, description);
    }

    if (checked === true) {
        await checkTodoById(id);
    }

    if (checked === false) {
        await uncheckTodoById(id);
    }

    res.send('Successfully updated todo');
};

export const deleteTodoHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password, id } = req.body;

    if (!email || !password) {
        res.status(400).send('Email and password was not found');
        return;
    }

    if (!id) {
        res.status(400).send('No todo given to delete');
        return;
    }

    await deleteTodoById(id);
    res.send('Successfully deleted todo');
};
