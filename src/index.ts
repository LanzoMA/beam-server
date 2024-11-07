import express from 'express';
import mongoose, { mongo } from 'mongoose';

mongoose.connect('mongodb://localhost:27017');
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});
mongoose.connection.on('error', error => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
