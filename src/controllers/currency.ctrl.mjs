import { GetCurrency, SaveCurrency } from "../models/currency.dao.mjs";
import { handleRequest } from "../utils/template.mjs";

export const process = {
    getAllCurrencies: async(req, res) => {

        await handleRequest(async() =>{
            const result = await GetCurrency.all(req.uuid);
            return result != null ? { result } : null;
        }, res)
    },
    saveCurrency: async(req, res) => {
        await handleRequest(async() =>{
            const currency = req.body.currency;
            const result = await SaveCurrency.single(req.uuid, currency);
            return result ? {} : null;
        }, res)
    },
    saveMultipleCurrencies: async(req, res) => {
        await handleRequest(async() => {
            const arr = req.body.currencies;
            const result = SaveCurrency.multiple(req.uuid, arr);
            return result ? {} : null;
        }, res)
    }
}

export default { process };