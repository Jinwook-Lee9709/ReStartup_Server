import { Review } from '../models/review.dao.mjs';
import { handleRequest } from "../utils/template.mjs";

export const process = {
    insert: async (req, res) => {
        await handleRequest(async() => {
            const uuid = req.uuid;
            const isPositive = req.body.isPositive;
            const reviewId = req.body.reviewId;
            const createdTime = req.body.createdTime;
            const result = await Review.insert(uuid, isPositive, reviewId, createdTime);
            return result ? {} : null;
        }, res)
    },
    delete: async (req, res) => {
        await handleRequest(async() => {
            const uuid = req.uuid;
            const orderIndex = req.body.orderIndex;
            const result = await Review.delete(uuid, orderIndex);
            return result ? {} : null;
        }, res)
    },
    getAll: async (req, res) => {
        await handleRequest(async() => {
            const uuid = req.uuid;
            const result = await Review.getAll(uuid);
            return result != null ? { result } : null;
        }, res)
    }
}
export default { process };

