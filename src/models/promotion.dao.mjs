import { db }  from '../config/db.mjs';

const GET_PROMOTIONS_QUERY = `SELECT * FROM promotion WHERE uuid = ?`;
const SAVE_PROMOTIONS_QUERY =  `INSERT INTO promotion (uuid, id, buy_use_count, ad_use_count)
                                VALUES ? ON DUPLICATE KEY UPDATE buy_use_count =
                                VALUES (buy_use_count), ad_use_count =
                                VALUES (ad_use_count)`;

export const Promotion ={
    getPromotion: async (uuid) => {
        try
        {
            var [rows] = await db.query(GET_PROMOTIONS_QUERY, [uuid]);
            return rows;
        }
        catch(error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    savePromotion: async (uuid, arr) => {
        try
        {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({id, buy_use_count, ad_use_count}) => ([uuid, id, buy_use_count, ad_use_count]));
            const [result] = await db.query(SAVE_PROMOTIONS_QUERY, [values]);
            return result.affectedRows > 0;
        }
        catch(error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }

    }
}