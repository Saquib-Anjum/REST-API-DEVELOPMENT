
import express from 'express'
import {registerController} from '../controllers/index.js'
import {loginController,userController,refreshController} from '../controllers/index.js'
import auth from '../middlewares/auth.js'
const router = express.Router();

router.post('/register',registerController.register);

router.post('/login',loginController.login);

router.get('/me',auth,userController.me)

router.post('/refresh',refreshController.refresh);

export default router;