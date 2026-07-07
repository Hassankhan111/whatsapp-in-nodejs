import db from "../confiq/database.js";

/* enter a new user into user account table */

const createUser = (username, number, password, image, callback) => {

    const sql = `INSERT INTO users (username, phone_number, password_hash, profile_photo_url) VALUES (?, ?, ?, ?)`;
   
    db.query(sql, [username, number, password, image], (err, result) => {

        if (err) {
            console.error('Error creating user:', err);
            callback(err, null);
        } else {
            console.log('User created successfully:', result);
            callback(null, result);
        }

    });

};


/* login user */
const loginUser = (number, callback) => {
    
    const sql = 'SELECT * FROM users WHERE phone_number = ?';

    db.query(sql ,[number], (err, result) => {

        if(err) {
            console.error('Error logging in user:', err);
            return callback(err, null);
           } 

            if(result.length === 0) {
              return callback(null, null);
            }
             callback(null, result[0]);
        
    });
}

/* show all user in chat */
const getAllUsers = (callback) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if(err) {
            console.error('Error fetching users:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
}


export { createUser, loginUser, getAllUsers };
