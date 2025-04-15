import { db } from '../config/db.mjs';

const GET_USER_BY_UID_QUERY = "SELECT * FROM users WHERE uuid = ?";


export const User = {
    getUser: async (uuid) => {
        try {
            const [rows] = await db.query(GET_USER_BY_UID_QUERY, [uuid]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

