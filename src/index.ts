import express from 'express';
import { connectDB } from './db';

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
