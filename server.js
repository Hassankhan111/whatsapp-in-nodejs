import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();
app.use(router);

import path from 'path';

import chatRoutes from './routes/web.js';

import connection from './confiq/database.js';

//middlwware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
app.use('/',chatRoutes);
app.use('/login',chatRoutes);
app.use('/register',chatRoutes);
app.use('/signup',chatRoutes);

//database connection


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});