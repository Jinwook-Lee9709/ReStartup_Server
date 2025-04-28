import { db } from '../config/db.mjs';

const GET_ALL_QUERY = 'SELECT * FROM stage_status WHERE uuid = ?';
const SAVE_THEME_INFO_QUERY = 'INSERT INTO stage_status (uuid, theme, is_cleared, last_claim, manager_count) VALUES (?, ?, ?, ?, ?)';

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
            if(typeof info == "string"){
                info = JSON.parse(info);
            }
            const { theme, is_cleared, last_claim, manager_count } = info;

            const [result] = await db.query(SAVE_THEME_INFO_QUERY, [uuid, theme, is_cleared, last_claim, manager_count]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
        }
    }
}