import express from 'express';
import { connectDB } from './db';
import router from './router';

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', router());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
