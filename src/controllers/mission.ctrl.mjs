import { Mission } from '../models/mission.dao.mjs';
import { handleRequest } from '../utils/template.mjs';

export const mission = {
    getMissions: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const result = await Mission.getMissions(uuid);
            return result != null ? { result } : null;
        }, res)
    },
    saveMission: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const info = req.body.info;
            const result = await Mission.saveMission(uuid, info);
        }, res)
    }
}

export default { mission };