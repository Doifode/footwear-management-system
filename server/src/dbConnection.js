import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// Create a MySQL connection pool
const sqlPool = mysql.createPool({
    connectionLimit: 10, // Number of connections in the pool
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    insecureAuth: true,
    multipleStatements: true // Optional: if you want to allow multiple queries in a single query string
});

// Function to establish connection
sqlPool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) {
        console.log('Connected to the database.');
        connection.release(); // Release connection back to the pool
    }
});

// Query execution function
const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        sqlPool.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

export default sqlPool;
