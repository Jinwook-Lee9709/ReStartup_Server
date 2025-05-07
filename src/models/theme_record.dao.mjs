import { db } from '../config/db.mjs';

const INSERT_RECORDS_QUERY = `INSERT INTO theme_records (uuid, theme, cumulative, ranking, rank_point) VALUES (?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE 
                        cumulative = VALUES(cumulative),
                        ranking = VALUES(ranking),
                        rank_point = VALUES(rank_point)`;
const GET_RECORDS_QUERY = `SELECT * FROM theme_records WHERE uuid = ? AND theme = ?`;

const GET_RANKING_QUERY = `SELECT ranking FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_RANKING_QUERY = `UPDATE theme_records SET ranking = ? WHERE uuid = ? AND theme = ?`;

const GET_RANKPOINT_QUERY = `SELECT rank_point FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_RANKPOINT_QUERY = `UPDATE theme_records SET rank_point = ? WHERE uuid = ? AND theme = ?`;

const GET_CUMULATIVE_QUERY = `SELECT cumulative FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_CUMULATIVE_QUERY = `UPDATE theme_records SET cumulative = ? WHERE uuid = ? AND theme = ?`;

const UPDATE_IS_CLAIMED_QUERY = `UPDATE theme_records SET is_claimed = ? WHERE uuid = ? AND theme = ?`;

const GET_RANKER_QUERY = `SELECT T.uuid, U.name, SUM(T.rank_point) AS total_rank_point
                          FROM theme_records T
                          JOIN users U ON T.uuid = U.uuid
                          GROUP BY T.uuid, U.name
                          ORDER BY total_rank_point DESC
                              LIMIT 50;`;

const GET_USER_RANK_QUERY = `SELECT total_rank_point,ranking
                             FROM
                                 (SELECT
                                     uuid, SUM(rank_point) AS total_rank_point, RANK() OVER (ORDER BY SUM(rank_point) DESC) AS ranking
                                     FROM theme_records
                                     GROUP BY uuid
                                 )AS rank_data
                             WHERE uuid = ?`;

export const General = {
    insertRecords : async(uuid, records) => {
        try
        {
            if (typeof records === "string") {
                records = JSON.parse(records);
            }
            const {theme, cumulative, ranking, rank_point} = records;
            const [result] = await db.query(INSERT_RECORDS_QUERY, [uuid, theme, cumulative, ranking, rank_point]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    getRecords : async(uuid, theme) => {
        try
        {
            const [rows] = await db.query(GET_RECORDS_QUERY, [uuid, theme]);
            return rows;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}

export const Rank = {
    getRanking : async(uuid, theme) => {
        try
        {
            const [rows] = await db.query(GET_RANKING_QUERY, [uuid, theme]);
            return rows.length > 0 ? rows[0].ranking : null;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveRanking : async(uuid, theme, ranking) => {
        try
        {
            const [result] = await db.query(UPDATE_RANKING_QUERY, [ranking, uuid, theme]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    getRankPoint : async(uuid, theme) => {
        try
        {
            const [rows] = await db.query(GET_RANKPOINT_QUERY, [uuid, theme]);
            return rows.length > 0 ? rows[0].rank_point : null;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveRankPoint : async(uuid, theme, rankpoint) => {
        try
        {
            const [result] = await db.query(UPDATE_RANKPOINT_QUERY, [rankpoint, uuid, theme]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    getCumulative : async(uuid, theme) => {
        try
        {
            const [rows] = await db.query(GET_CUMULATIVE_QUERY, [uuid, theme]);
            return rows.length > 0 ? rows[0].cumulative : null;

        }catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveCumulative : async(uuid, theme, cumulative) => {
        try
        {
            const [result] = await db.query(UPDATE_CUMULATIVE_QUERY, [cumulative, uuid, theme]);
            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    saveIsClaimed : async(uuid, theme, isClaimed) => {
        try
        {
            const [result] = await db.query(UPDATE_IS_CLAIMED_QUERY, [isClaimed ? 1 : 0, uuid, theme]);

            return result.affectedRows > 0;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    }


    ,getRanker : async() =>{
        try
        {
            const [rows] = await db.query(GET_RANKER_QUERY);
            return rows;
        }
        catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }, getUserRank : async(uuid) =>{
        try
        {
            const [rows] = await db.query(GET_USER_RANK_QUERY, [uuid]);
            return rows.length > 0 ? rows[0] : null;
        }catch (error)
        {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}