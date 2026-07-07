import express from 'express';

const router = express.Router();

import chatController, {login, register ,signup, userlogin, showAllUsers} from '../controller/chatController.js';
import upload from '../confiq/multer.js';

router.get('/chat', chatController);

router.get('/', login);

 /* open the register page */
router.get('/register', register);
/* add the new user data from register page to the database */
router.post('/signup', upload.single('image'), signup);

/* login user */
router.post('/login', userlogin);

/* show all user in chat */
router.get('/chat', showAllUsers);

export default router;