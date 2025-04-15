import {db} from '../config/db.mjs';

const GET_UPGRADES_BY_THEME_QUERY = `SELECT * FROM upgrade WHERE uuid = ? AND theme = ?;`
const SAVE_UPGRADE_QUERY = `INSERT INTO upgrade (id, uuid, theme, category, count) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE count = VALUES (count)`;
const SAVE_UPGRADES_QUERY = `INSERT INTO upgrade (id, uuid, theme, category, count) VALUES ? ON DUPLICATE KEY UPDATE count = VALUES (count)`;

export const GetUpgrade = {
    theme: async (uuid, theme) => {
        try {
            const [rows] = await db.query(GET_UPGRADES_BY_THEME_QUERY, [uuid, theme]);
            return rows;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

export const SaveUpgrade = {
    single: async (uuid, info) => {
        try {
            if (typeof info === "string") {
                info = JSON.parse(info);
            }
            const id = info.id;
            const theme = info.theme;
            const category = info.category;
            const count = info.count;

            const [result] = await db.query(SAVE_UPGRADE_QUERY, [id, uuid, theme, category, count]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    multiple: async (uuid, arr) => {
        try
        {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({id, theme, category, count}) => [id, uuid, theme, category, count]);
            const [result] = await db.query(SAVE_UPGRADES_QUERY, [values]);
            return result.affectedRows > 0;
        }
        catch(error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}

export default {
    GetUpgrade,
    SaveUpgrade

}

