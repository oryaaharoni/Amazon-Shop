import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import  { signup, signin } from '../controllers/usersController.js';

const userRouter = express.Router();

// עוטפים את הפעולות באסינק הנדלר - כלומר זה עושה לנו טריי וקאטצ אוטומטי
userRouter.post('/signin',expressAsyncHandler(signin));
userRouter.post('/signup',expressAsyncHandler(signup));

export default userRouter;