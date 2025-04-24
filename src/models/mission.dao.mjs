import { db }  from '../config/db.mjs';

const GET_MISSIONS_QUERY = `SELECT * FROM mission WHERE uuid = ?`
const SAVE_MISSION_QUERY = `INSERT INTO mission (uuid, mission_id, count, is_cleared) VALUES (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE count = VALUES(count), is_cleared = VALUES(is_cleared)`


export const Mission = {
    getMissions: async (uuid) => {
        try
        {
            var [rows] = await db.query(GET_MISSIONS_QUERY, [uuid]);
            return rows;
        }
        catch(error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    saveMission: async (uuid, info) => {
        try
        {
            if(typeof  info == "string"){
                info = JSON.parse(info);
            }
            const id = info.mission_id;
            const count = info.count;
            const is_cleared = info.is_cleared;
            const [result] = await db.query(SAVE_MISSION_QUERY, [uuid, id, count, is_cleared]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    }


}