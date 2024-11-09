import express from 'express';
import { createUser, getUsers } from '../db/users';

export default (router: express.Router) => {
    router.get('/users', async (req: express.Request, res: express.Response) => {
        const users = await getUsers();
        res.json(users);
    });

    router.post('/users', async (req: express.Request, res: express.Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send('Email/Password was not given');
            return;
        }

        await createUser(email, password);

        res.send('New user created');
    });
}
