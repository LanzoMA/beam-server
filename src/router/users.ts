import { Router } from 'express';
import { register, getUsersHandler, login, logout, updateUserHandler, deleteUserHandler } from '../controllers/users';

export default (router: Router) => {
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', logout);
    router.get('/users', getUsersHandler);
    router.put('/users', updateUserHandler);
    router.delete('/users', deleteUserHandler);
}
