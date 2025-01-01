import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createUser, deleteUserByEmail, getUsers, updateUserEmailByEmail, updateUserPasswordByEmail } from '../db/services/users';
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

        if (!isPasswordCorrect) {
            res.send('Incorrect credentials');
            return;
        }

        // Todo: Generate access token and refresh token and return as json
    } catch (error) {
        console.log(error);
        res.send(500).send('Something went wrong');
    }
};

export const logout = async (req: Request, res: Response) => {
    // Todo: Delete refresh token
};

export const getUsersHandler = async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json(users);
};

export const updateUserHandler = async (req: Request, res: Response) => {
    const { email, password, newEmail, newPassword } = req.body;

    const isPasswordCorrect = await authenticate(email, password);

    if (!isPasswordCorrect) {
        res.send('Incorrect credentials given');
        return;
    }

    if (newEmail) {
        await updateUserEmailByEmail(email, newEmail);
    }

    if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPasswordByEmail(email, hashedPassword);
    }

    res.send('Successfully updated details');
};

export const deleteUserHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const isPasswordCorrect = await authenticate(email, password);

    if (!isPasswordCorrect) {
        res.send('Incorrect credentials given');
        return;
    }

    await deleteUserByEmail(email);

    res.send('Successfully deleted user');
};
