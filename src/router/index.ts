import express from 'express';
import users from './users';
import todos from './todos';

const router = express.Router();

export default (): express.Router => {
    users(router);
    todos(router);
    return router;
}