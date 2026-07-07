import { createUser, loginUser, getAllUsers } from '../model/chatModel.js';
import bcrypt from 'bcryptjs';

const chat = ((req, res) => {
    res.render('chat');
});

const login = ((req, res) => {
    res.render('auth/login');
});

const register = ((req, res) => {
    res.render('auth/signup');
});

/*signup user */
const signup = async (req, res) => {
    try {
        const { username, number, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const image = req.file ? req.file.filename : null;

        createUser(username, number, hashedPassword, image, (err, result) => {

            if (err) {
                console.error('Error registering user:', err);

                setTimeout(() => {
                    res.render('auth/signup', { message: 'Username and Phone Number already exist. Please try again.' });
                }, 500);

            } else {
                setTimeout(() => {
                    res.render('auth/login', { message: 'User registered successfully. Please log in.' });
                }, 500);
            }
        });

    } catch (err) {
        console.error(err);
        res.render('auth/signup', { message: 'Error registering user. Please try again.' });
    }
};

/*login user */
const userlogin = (req, res) => {

    try {

        const { number, password } = req.body;

        loginUser(number, async (err, user) => {

            if (err) {
                console.error('Error logging in user:', err);
                res.render('auth/login', { message: 'Error logging in user. Please try again.' });

            }

            if (!user) {
                res.render('auth/login', { message: 'Phone Number Not Found' });
            }

            //compare the password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                res.render('auth/login', { message: 'Invalid Password' });

            } else {
                res.render('chat', { user });
            }

        });

    } catch (err) {
        console.error(err);
        res.render('auth/login', { message: 'Error logging in user. Please try again.' });
    }
}

/* show all user in chat */
const showAllUsers = (req, res) => {
    getAllUsers((err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        } else {
            res.render('chat', { user :users});
        }
    });
}

export default chat;
export { login, register, signup, userlogin, showAllUsers }; 