import { db } from '../config/db.mjs';

const INSERT_REVIEW_PROCEDURE = `CALL InsertReview(?, ?, ?, ?)`;
const DELETE_REVIEW_PROCEDURE  = `CALL DeleteMiddleAndReorder(?, ?, @success_flag);
            SELECT @success_flag AS success_flag;
`;
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
            const [resultSets] = await db.query(DELETE_REVIEW_PROCEDURE, [uuid, orderIndex]);
            const successFlag = resultSets[1][0].success_flag;

            console.log('Success Flag:', successFlag);
            return successFlag === 1;

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