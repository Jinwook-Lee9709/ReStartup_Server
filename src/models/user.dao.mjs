import { db } from '../config/db.mjs';

const GET_USER_BY_UUID_QUERY = "SELECT * FROM users WHERE uuid = ?";
const GET_NAME_BY_UUID_QUERY = "SELECT name FROM users WHERE uuid = ?";
const UPDATE_NAME_BY_UUID_QUERY = "UPDATE users SET name = ? WHERE uuid = ?";


export const User = {
    getUser: async (uuid) => {
        try {
            const [rows] = await db.query(GET_USER_BY_UUID_QUERY, [uuid]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    getName: async (uuid) => {
        try{
            const [rows] = await db.query(GET_NAME_BY_UUID_QUERY, [uuid]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    updateName: async(uuid, name) => {
        try{
            const [result] = await db.query(UPDATE_NAME_BY_UUID_QUERY, [name, uuid]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

