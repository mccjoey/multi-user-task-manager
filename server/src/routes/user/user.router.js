const express =  require('express');
const isAuthenticated = require('../../middlewares/auth');
const { getUser, loginUser, registerUser, logoutUser } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/', isAuthenticated, getUser);
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/logout', logoutUser);

module.exports = userRouter;