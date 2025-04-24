import { db } from '../config/db.mjs';

const GET_USER_QUERY = `SELECT * FROM users WHERE provider_id = ?`;
const CREATE_USER_QUERY = `INSERT INTO users(uuid, provider_id, login_source) VALUES (?, ?, ?)`;

export const Login = {
    getUserByProviderId: async (providerId) => {
        try{
            const [result] = await db.query(GET_USER_QUERY, [providerId]);
            return result[0];
        }catch(error){
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

export const Register = {
    registerUser: async (userData) => {
        try {
            const [result] = await db.query(CREATE_USER_QUERY, [userData.uuid, userData.providerId, userData.loginSource]);
            return result;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

export const Delete = {
    deleteUser: async (uuid) => {
        try {
            console.log('Deleting user: ', uuid);
            const [result] = await db.query(`DELETE FROM users WHERE uuid = ?`, [uuid]);
            return result;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}
