import { db } from '../config/db.mjs';

const GET_BUFF_QUERY = `SELECT * FROM buff WHERE uuid = ?`;

const SAVE_BUFF_QUERY = `INSERT INTO buff (uuid, buff_type, id, remain_time)
                         VALUES (?, ?, ?, ?) ON DUPLICATE KEY
                         UPDATE remain_time =
                         VALUES (remain_time),
                             id = VALUES (id)`;
const SAVE_BUFFS_QUERY = `INSERT INTO buff (uuid, buff_type, id, remain_time)
                          VALUES ? ON DUPLICATE KEY
                          UPDATE remain_time =
                          VALUES (remain_time),
                              id = VALUES (id)`;
const DELETE_BUFF_QUERY = `DELETE FROM buff WHERE uuid = ? AND buff_type = ?`;

export const Buff = {
    getBuffs: async (uuid) => {
        try{
            const [rows] = await db.query(GET_BUFF_QUERY, [uuid]);
            return rows;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    saveBuff: async (uuid, type, id, remain_time) => {
        try{
            const [result] = await db.query(SAVE_BUFF_QUERY, [uuid, buff_type, id, remain_time]);
            return result.affectedRows > 0;
        }catch(error){

        }
    },
    saveBuffs: async (uuid, arr) => {
        try{
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({ buff_type, id, remain_time }) => [uuid, buff_type, id, remain_time]);
            const [result] = await db.query(SAVE_BUFFS_QUERY, [values]);
            return result.affectedRows > 0;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    deleteBuff: async (uuid, buff_type) => {
        try{
            const [result] = await db.query(DELETE_BUFF_QUERY, [uuid, buff_type]);
            return result.affectedRows > 0;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}