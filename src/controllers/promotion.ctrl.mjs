import { Promotion } from '../models/promotion.dao.mjs';
import { handleRequest } from "../utils/template.mjs";

export default process ={
    getAllPromotions: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const result = await Promotion.getPromotion(uuid);
            return result != null ? { result } : null;
        }, res)
    },
    saveAllPromotions: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const arr = req.body.info;
            const result = await Promotion.savePromotion(arr);
            return result != null ? { result } : null;
        })
    },
}


