const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error('Database connection failed:', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections.');
        }
        if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('Database does not exist.');
        }
    } else {
        console.log('MySQL connected successfully!');
    }
});

module.exports = connection;
