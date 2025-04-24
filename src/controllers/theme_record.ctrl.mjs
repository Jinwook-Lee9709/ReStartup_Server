import { General, Rank } from "../models/theme_record.dao.mjs";
import { handleRequest } from "../utils/template.mjs";

export const general = {
    insertRecords: async(req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const records = req.body.records;
            const result = await General.insertRecords(uuid, records);
            return result ? {} : null; // 성공 시 빈 객체 반환
        }, res);
    },
    getRecords: async(req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.query.theme;
            const result = await General.getRecords(uuid, theme);
            return result != null ? { result } : null;
        }, res)
    }

};

export const process = {
    getRanking: async(req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.body.theme;
            if(theme == null)
                return null;
            const result = await Rank.getRanking(uuid, theme);
            return result != null ? { result } : null; // ranking 객체 반환
        }, res);
    },
    saveRanking: async (req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.body.theme;
            const ranking = req.body.ranking;
            if(theme == null || ranking == null)
                return null;
            const result = await Rank.saveRanking(uuid, theme, ranking);
            return result ? {} : null;
        }, res);
    },
    getRankpoint: async(req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.body.theme;
            if(theme == null)
                return null;
            const result = await Rank.getRankPoint(uuid, theme);
            return result != null ? { result } : null;
        }, res);
    },
    saveRankpoint: async(req, res) =>{
        await handleRequest(async () =>{
            const uuid = req.uuid;
            const theme = req.body.theme;
            const rankpoint = req.body.rank_point;
            if(theme == null || rankpoint == null)
                return null;
            const result = await Rank.saveRankPoint(uuid, theme, rankpoint);
            return result ? {} : null;
        }, res)
    },
    getCumulative: async(req, res) =>{
        await handleRequest(async () => {
            const uuid = req.uuid;
            const theme = req.body.theme;
            if(theme == null)
                return null;
            const result = await Rank.getCumulative(uuid, theme);
            return result != null ? { result } : null;
        },res)
    },
    saveCumulative: async(req, res) =>{
        await handleRequest(async ()=> {
            const uuid = req.uuid;
            const theme = req.body.theme;
            const cumulative = req.body.cumulative;
            if(theme == null || cumulative == null)
                return null;
            const result =  await Rank.saveCumulative(uuid, theme, cumulative);
            return result ? {} : null;
        },res)
    },
    getRanker: async(req, res) =>{
        await handleRequest(async () => {
            const result = await Rank.getRanker();
            return result != null ? { result } : null;
        },res)
    },
    getUserRank: async(req, res) => {
        await handleRequest(async () => {
            const uuid = req.uuid;
            const result = await Rank.getUserRank(uuid);
            console.log(result);
            return result != null ? { result } : null;
        }, res)
    }
};


export default { general, process };