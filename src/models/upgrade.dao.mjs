import {db} from '../config/db.mjs';

const GET_INTERIORS_BY_THEME_QUERY = `SELECT *
                                      FROM interior
                                      WHERE uuid = ?
                                        AND theme = ?`;
const SAVE_INTERIOR_QUERY = `INSERT INTO interior (id, uuid, theme, level)
                             VALUES (?, ?, ?, ?) ON DUPLICATE KEY
                             UPDATE level =
                             VALUES (level)`;
const SAVE_INTERIORS_QUERY = `INSERT INTO interior (id, uuid, theme, level)
                              VALUES ? ON DUPLICATE KEY
                              UPDATE level =
                              VALUES (level)`;

const GET_EMPLOYEE_BY_THEME_QUERY = `SELECT *
                                     FROM employee
                                     WHERE uuid = ?
                                       AND theme = ?`;
const SAVE_EMPLOYEE_QUERY = `INSERT INTO employee (id, uuid, theme, level, remain_hp, remain_hp_decrease_time)
                             VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
UPDATE
    level =
VALUES (level), remain_hp =
VALUES (remain_hp), remain_hp_decrease_time =
VALUES (remain_hp_decrease_time)`;
const SAVE_EMPLOYEES_QUERY = `INSERT INTO employee (id, uuid, theme, level, remain_hp, remain_hp_decrease_time)
                              VALUES ? ON DUPLICATE KEY
UPDATE
    level =
VALUES (level), remain_hp =
VALUES (remain_hp), remain_hp_decrease_time =
VALUES (remain_hp_decrease_time)`;

const GET_FOOD_BY_THEME_QUERY = `SELECT *
                                 FROM food
                                 WHERE uuid = ?
                                   AND theme = ?`;
const SAVE_FOOD_QUERY = `INSERT INTO food (id, uuid, theme, level, sell_count)
                         VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY
                         UPDATE level =
                         VALUES (level), sell_count =
                         VALUES (sell_count)`;
const SAVE_FOODS_QUERY = `INSERT INTO food (id, uuid, theme, level, sell_count)
                          VALUES ? ON DUPLICATE KEY
                          UPDATE level =
                          VALUES (level).sell_count =
                          VALUES (sell_count)`;

export const Interior = {
    getByTheme: async (uuid, theme) => {
        try {
            const [rows] = await db.query(GET_INTERIORS_BY_THEME_QUERY, [uuid, theme]);
            return rows;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveSingle: async (uuid, info) => {
        try {
            if (typeof info === "string") {
                info = JSON.parse(info);
            }
            const id = info.id;
            const theme = info.theme;
            const level = info.level;
            const [result] = await db.query(SAVE_INTERIOR_QUERY, [id, uuid, theme, level]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveMultiple: async (uuid, arr) => {
        try {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({id, theme, level}) => [id, uuid, theme, level]);
            const [result] = await db.query(SAVE_INTERIORS_QUERY, [values]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}

export const Employee = {
    getByTheme: async (uuid, theme) => {
        try {
            const [rows] = await db.query(GET_EMPLOYEE_BY_THEME_QUERY, [uuid, theme]);
            return rows;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveSingle: async (uuid, info) => {
        try {
            if (typeof info === "string") {
                info = JSON.parse(info);
            }
            const id = info.id;
            const theme = info.theme;
            const level = info.level;
            const remain_hp = info.remain_hp;
            const remain_hp_decrease_time = info.remain_hp_decrease_time;
            const [result] = await db.query(SAVE_EMPLOYEE_QUERY, [id, uuid, theme, level, remain_hp, remain_hp_decrease_time]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveMultiple: async (uuid, arr) => {
        try {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({
                                        id,
                                        theme,
                                        level,
                                        remain_hp,
                                        remain_hp_decrease_time
                                    }) => [id, uuid, theme, level, remain_hp, remain_hp_decrease_time]);
            const [result] = await db.query(SAVE_EMPLOYEES_QUERY, [values]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}

export const Food = {
    getByTheme: async (uuid, theme) => {
        try {
            const [rows] = await db.query(GET_FOOD_BY_THEME_QUERY, [uuid, theme]);
            return rows;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveSingle: async (uuid, info) => {
        try {
            if (typeof info === "string") {
                info = JSON.parse(info);
            }
            const id = info.id;
            const theme = info.theme;
            const level = info.level;
            const sell_count = info.sell_count;
            const [result] = await db.query(SAVE_FOOD_QUERY, [id, uuid, theme, level, sell_count]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    },
    saveMultiple: async (uuid, arr) => {
        try {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({id, theme, level, sell_count}) => [id, uuid, theme, level, sell_count]);
            const [result] = await db.query(SAVE_FOODS_QUERY, [values]);
            return result.affectedRows > 0;
        } catch (error) {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}
