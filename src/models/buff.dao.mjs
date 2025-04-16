import { db } from '../config/db.mjs';

const GET_BUFF_QUERY = `SELECT * FROM buff WHERE uuid = ?`;

const SAVE_BUFF_QUERY = `INSERT INTO buff (uuid, id, remain_time)
                         VALUES (?, ?, ?) ON DUPLICATE KEY
                         UPDATE remain_time =
                         VALUES (remain_time)`;
const SAVE_BUFFS_QUERY = `INSERT INTO buff (uuid, id, remain_time)
                          VALUES ? ON DUPLICATE KEY
                          UPDATE remain_time =
                          VALUES (remain_time)`;
const DELETE_BUFF_QUERY = `DELETE FROM buff WHERE uuid = ? AND id = ?`;

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
    saveBuff: async (uuid, id, remain_time) => {
        try{
            const [result] = await db.query(SAVE_BUFF_QUERY, [uuid, id, remain_time]);
            return result.affectedRows;
        }catch(error){

        }
    },
    saveBuffs: async (uuid, arr) => {
        try{
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({ id, remain_time }) => [uuid, id, remain_time]);
            const [result] = await db.query(SAVE_BUFFS_QUERY, [values]);
            return result.affectedRows > 0;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    deleteBuff: async (uuid, id) => {
        try{
            const [result] = await db.query(DELETE_BUFF_QUERY, [uuid, id]);
            return result.affectedRows > 0;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}