import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createUser, getUsers } from '../db/users';
import { authenticate } from '../helpers/authenticate';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email/Password was not given');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({ email, password: hashedPassword });

    res.send('New user created');
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email/Password was not given');
        return;
    }

    try {
        const isPasswordCorrect = await authenticate(email, password);

        if (isPasswordCorrect) {
            res.send('Successfully logged in');
            return;
        }

        res.send('Incorrect credentials');
    } catch (error) {
        console.log(error);
        res.send(500).send('Something went wrong');
    }
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
