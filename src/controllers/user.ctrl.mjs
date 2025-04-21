import { User } from '../models/user.dao.mjs';
import {handleRequest} from "../utils/template.mjs";
import {SaveStatus} from "../models/stage_status.dao.mjs";


export const process = {
    register: async (req, res) => {
        const uuid = req.params.uuid;
        const name = req.body.name;
        const gold = req.body.gold;
        res.sendStatus(200).json({success: true, data: true});
    },
    getInfo: async (req, res) =>{
        try
        {
            if(req.uuid === undefined)
                return res.status(401).json({success: false, message: "Unauthorized"});
            const uuid = req.uuid;
            const result = await User.getUser(uuid);
            if(result === null)
            {
                return res.status(404).json({success: false, message: "Database error"});
            }
            return res.status(200).json({success: true, data: result});
        }
        catch(err)
        {
            if(err){
                console.error("Error fetching user:", err);
                return res.status(500).json({success: false, message: "Database error"});
            }
        }

    }
}

export default { process };

