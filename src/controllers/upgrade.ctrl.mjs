import { Interior, Employee, Food } from '../models/upgrade.dao.mjs';
import { handleRequest } from '../utils/template.mjs';

export const interior ={
    getByTheme: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.query.theme;
            const result = await Interior.getByTheme(uuid, theme);
            return result != null ? { result } : null;
        }, res);
    },
    saveSingle: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await Interior.saveSingle(uuid, info);
            return result ? {} : null;
        }, res)
    },
    saveMultiple: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await Interior.saveMultiple(uuid, arr);
            return result ? {} : null;
        }, res)
    }
}

export const employee = {
    getByTheme: async (req, res) => {
        await handleRequest(async() =>{
            const uuid = req.uuid;
            const theme = req.query.theme;
            const result = await Employee.getByTheme(uuid, theme);
            return result != null ? { result } : null;
        }, res);
    },
    saveSingle: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await Employee.saveSingle(uuid, info);
            return result ? {} : null;
        }, res)
    },
    saveMultiple: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await Employee.saveMultiple(uuid, arr);
            return result ? {} : null;
        }, res)
    }
}

export const food = {
    getByTheme: async (req, res) => {
        await handleRequest(async() =>{
            const uuid = req.uuid;
            const theme = req.query.theme;
            const result = await Food.getByTheme(uuid, theme);
            return result != null ? { result } : null;
        }, res);
    },
    saveSingle: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await Food.saveSingle(uuid, info);
            return result ? {} : null;
        }, res)
    },
    saveMultiple: async (req, res) => {
        await handleRequest( async () =>{
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await Food.saveMultiple(uuid, arr);
            return result ? {} : null;
        }, res)
    }
}

export default { interior, employee, food };

