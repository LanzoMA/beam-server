import { Request, Response } from 'express';
import { createUser, getUsers } from '../db/users';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email/Password was not given');
        return;
    }

    await createUser({ email, password });

    res.send('New user created');
};

export const login = async (req: Request, res: Response) => {

};

export const logout = async (req: Request, res: Response) => {

};

export const getUsersHandler = async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json(users);
};

export const updateUserHandler = async (req: Request, res: Response) => {

};

export const deleteUserHandler = async (req: Request, res: Response) => {

};
