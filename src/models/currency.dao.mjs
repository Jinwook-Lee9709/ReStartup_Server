import { db } from '../config/db.mjs';

const GET_CURRENCIES_QUERY = `SELECT currency_type, amount FROM user_currency WHERE uuid = ?`;
const SAVE_CURRENCY_QUERY = `INSERT INTO user_currency (uuid, currency_type, amount)VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = ?;`;
const SAVE_CURRENCIES_QUERY = `INSERT INTO user_currency (uuid, currency_type, amount) VALUES ? ON DUPLICATE KEY UPDATE amount = VALUES(amount)`;

export const GetCurrency = {
    all : async(uuid) => {
        try
        {
            const [rows] = await db.query(GET_CURRENCIES_QUERY, [uuid]);
            return rows;
        }
        catch(error){
            console.log('DB Error: ', error.message);
            throw new Error(error);
        }
    }
}

export const SaveCurrency = {
    single : async(uuid, currency) => {
        try
        {
            const currency_type = currency.currency_type;
            const amount = currency.amount;
            const values = [uuid, currency_type, amount, amount];
            const [result] = await db.query(SAVE_CURRENCY_QUERY, values);
            return result.affectedRows > 0;
        }catch (error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    },
    multiple : async(uuid, arr) => {
        try
        {
            if (typeof arr === "string") {
                arr = JSON.parse(arr);
            }
            const values = arr.map(({ currency_type, amount }) => [uuid, currency_type, amount]);
            const [result] = await db.query(SAVE_CURRENCIES_QUERY, [values]);
            return result.affectedRows > 0;
        }
        catch(error)
        {
            console.log('DB Error: ', error.message);
            return false;
        }
    }
}