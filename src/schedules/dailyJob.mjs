
import {db} from "../config/db.mjs";
import { scheduleJob } from 'node-schedule';


const PROMOTION_RESET_QUERY = 'UPDATE promotion SET buy_use_count = 0, '

const runQuery =  async () => {
    try {
        const result = await db.query("UPDATE ");
        console.log(`Daily initialize task: ${result > 0 ? "Success" : "Failed"}`);
    }catch (error) {
        console.log(`Daily initialize task Failed: ${error}`);
    }
}

const setupDailyJob = () => {
    scheduleJob('0 5 * * *', runQuery);
    console.log("Daily initialize task setup");
};

export default setupDailyJob;