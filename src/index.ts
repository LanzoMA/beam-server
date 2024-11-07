import express from 'express';
import { connectDB } from './db';
import { createUser, getUsers } from './db/users';

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.get('/users', async (req: express.Request, res: express.Response) => {
    const users = await getUsers();
    res.json(users);
});

app.post('/account', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email/Password was not given');
        return;
    }

    await createUser(email, password);

    res.send('New user created');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
