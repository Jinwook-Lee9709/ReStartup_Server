
import {db} from "../config/db.mjs";
import { scheduleJob } from 'node-schedule';
import { Promotion } from "../models/promotion.dao.mjs";
import { Mission } from "../models/mission.dao.mjs";

const PROMOTION_RESET_QUERY = 'UPDATE promotion SET buy_use_count = 0, '

const runDailyResetQuery =  async () => {
    try {
        const result = await Promotion.resetAllPromotions();
        console.log(`Promotion initialize task: ${result ? "Success" : "Failed"}`);
        const missionResetResult = await Mission.resetDailyMission();
        console.log(`Mission initialize task: ${missionResetResult ? "Success" : "Failed"}`);
    }catch (error) {
        console.log(`Daily initialize task Failed: ${error}`);
    }
}

const runWeeklyResetQuery =  async () => {
    try {
        const result = await Mission.resetWeeklyMission();
        console.log(`Weekly initialize task: ${result ? "Success" : "Failed"}`);
    }catch (error) {
        console.log(`Weekly initialize task Failed: ${error}`);
    }
}

export const setupDailyJob = () => {
    scheduleJob('0 20 * * *', runDailyResetQuery);
    console.log("Daily initialize task setup");
};

export const setupWeeklyJob = () => {
    scheduleJob('0 20 * * 0', runWeeklyResetQuery); // 매주 월요일 20:00 (UTC)
    console.log("Weekly initialize task setup");
};


export default setupDailyJob;