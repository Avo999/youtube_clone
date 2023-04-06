import express from "express";
import UserController from "../controllers/UserController";
import UserActions from "../controllers/UserActions"
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema} from "../schemas/UserSchemas";
import checkAuth from "../middlewares/checkAuth";
const router = express.Router();

router.post('/register', validationMiddleware(UserCreateSchema), UserController.userRegister);
router.post('/login', validationMiddleware(UserLogInSchema), UserController.userLogin);
router.post('/google', UserController.googleAuth);

router.put('/:id', checkAuth, UserController.updateUser);
router.get('/find/:id', UserController.getUser);
router.delete('/:id', checkAuth, UserController.deleteUser);
router.put('/sub/:id', checkAuth, UserActions.subscribe);
router.put('/unsub/:id', checkAuth, UserActions.unSubscribe);

export default router;