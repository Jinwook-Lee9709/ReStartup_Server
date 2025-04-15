import { db } from '../config/db.mjs';

const INSERT_RECORDS_QUERY = `INSERT INTO theme_records (uuid, theme, cumulative, ranking, rank_point) VALUES (?, ?, ?, ?, ?)`;

const GET_RANKING_QUERY = `SELECT ranking FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_RANKING_QUERY = `UPDATE theme_records SET ranking = ? WHERE uuid = ? AND theme = ?`;

const GET_RANKPOINT_QUERY = `SELECT rank_point FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_RANKPOINT_QUERY = `UPDATE theme_records SET rank_point = ? WHERE uuid = ? AND theme = ?`;

const GET_CUMULATIVE_QUERY = `SELECT cumulative FROM theme_records WHERE uuid = ? AND theme = ?`;
const UPDATE_CUMULATIVE_QUERY = `UPDATE theme_records SET cumulative = ? WHERE uuid = ? AND theme = ?`;

export const General = {
    insertRecords : async(uuid, records) => {
        try
        {
            const {theme, cumulative, ranking, rank_point} = records;
            const [result] = await db.query(INSERT_RECORDS_QUERY, [uuid, theme, cumulative, ranking, rank_point]);
            console.log(result);
            return result.affectedRows > 0;
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
    }
}