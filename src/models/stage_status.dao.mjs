import { db } from '../config/db.mjs';

const GET_ALL_QUERY = 'SELECT * FROM stage_status WHERE uuid = ?';
const SAVE_THEME_INFO_QUERY = 'INSERT INTO stage_status (uuid, theme, is_cleared, last_played) VALUES (?, ?, ?, ?)';

export const GetStatus ={
    all: async (uuid) => {
        try{
            const [rows] = await db.query(GET_ALL_QUERY, [uuid]);
            return rows;
        }catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

export const SaveStatus = {
    single: async (uuid, info) => {
        try
        {
            const { theme, is_cleared, last_Played } = info;

            const [result] = await db.query(SAVE_THEME_INFO_QUERY, [uuid, theme, is_cleared, last_Played]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
        }
    }
}