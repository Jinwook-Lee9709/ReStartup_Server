import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2"


let dbInstance = null;

const createDbConnection = () => {
    if (!dbInstance) {
        dbInstance = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        }).promise();
        console.log("Connected to database pool");
    }
    return dbInstance;
};

export const db =  createDbConnection();
