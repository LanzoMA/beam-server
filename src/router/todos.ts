import { Router } from 'express';
import { createTodoHandler, deleteTodoHandler, getTodosHandler, updateTodoHandler } from '../controllers/todos';

export default (router: Router): void => {
    router.get('/todos', getTodosHandler);
    router.post('/todos', createTodoHandler);
    router.put('/todos', updateTodoHandler);
    router.delete('/todos', deleteTodoHandler);
}