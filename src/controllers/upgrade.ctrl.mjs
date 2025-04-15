import { GetUpgrade, SaveUpgrade } from '../models/upgrade.dao.mjs';
import { handleRequest } from '../utils/template.mjs';

export const process ={
    getByTheme: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.query.theme;
            const result = await GetUpgrade.theme(uuid, theme);
            return result != null ? { result } : null;
        }, res);
    },
    saveSingleUpgrade: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await SaveUpgrade.single(uuid, info);
            return result ? {} : null;
        }, res)
    },
    saveMultipleUpgrade: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await SaveUpgrade.multiple(uuid, arr);
            return result ? {} : null;
        }, res)
    }
}

export default process;

