import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DBNAME

});

if(db.connect((err) => {
    if(err) {
        console.log("Error connecting to database", err);
    } else {
        console.log("Connected to database");
    }
}));

export default db;