import { db } from '../config/db.mjs';

const INSERT_REVIEW_PROCEDURE = `CALL InsertReview(?, ?, ?, ?)`;
const DELETE_REVIEW_PROCEDURE  = `CALL DeleteMiddleAndReorder(?, ?)`;
const GET_ALL_REVIEW_QUERY = `SELECT * FROM review WHERE uuid = ?`;

export const Review = {
    insert: async (uuid, isPositive, reviewId, createdTime)=>
    {
        try{
            const [result] = await db.execute(INSERT_REVIEW_PROCEDURE, [uuid, isPositive, reviewId, createdTime]);
            return result.affectedRows > 0;
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    delete: async (uuid, orderIndex)=>
    {
        try{
            const [result] = await db.execute(DELETE_REVIEW_PROCEDURE, [uuid, orderIndex]);
            const success = result[1][0].success; // 프로시저 success_flag 값 확인
            return success === 1; // 성공 여부 반환

        }catch(error){
            console.log(error);
            throw error;
        }
    },
    getAll: async (uuid)=>
    {
        try{
            const [rows] = await db.execute(GET_ALL_REVIEW_QUERY, [uuid]);
            return rows;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}