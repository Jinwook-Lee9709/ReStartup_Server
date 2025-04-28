import { GetStatus, SaveStatus } from "../models/stage_status.dao.mjs";
import { handleRequest } from "../utils/template.mjs";

export const process = {
    getAllStatus: async(req, res) => {
        await handleRequest(async() => {
            const uuid = req.uuid;
            const result = await GetStatus.all(uuid);
            return result != null ? { result } : null;
        },res);
    },
    saveStatus: async(req, res) => {
        await handleRequest(async() => {
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await SaveStatus.single(uuid, info);
            return result ? {} : null;
        },res)
    }
}

export default process;
