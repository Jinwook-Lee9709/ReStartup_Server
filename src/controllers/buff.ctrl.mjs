import { Buff } from '../models/buff.dao.mjs';
import { handleRequest } from "../utils/template.mjs";

export const buff = {
    getAllBuffs: async(req,res) => {
        await handleRequest(async () => {
            const result = await Buff.getBuffs(req.uuid);
            return result != null ? { result } : null;
        },res)
    },
    saveBuff: async(req,res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const buff_type = req.body.buff_type;
            console.log(buff_type);
            const id = req.body.id;
            const remain_time = req.body.remain_time;
            const result = await Buff.saveBuff(uuid, buff_type, id, remain_time);
            return result ? {} : null;
        }, res)
    },
    saveBuffs: async(req,res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await Buff.saveBuffs(uuid, arr);
            return result ? {} : null;
        }, res)
    },
    deleteBuff: async(req,res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const buff_type = req.body.buff_type;
            const result = await Buff.deleteBuff(uuid, buff_type);
            return result ? {} : null;
        }, res)
    }
}


export default { buff };