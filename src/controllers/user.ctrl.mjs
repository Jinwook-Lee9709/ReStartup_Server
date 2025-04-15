import { User } from '../models/user.dao.mjs';


export const process = {
    register: async (req, res) => {
        const uuid = req.params.uuid;
        const name = req.body.name;
        const gold = req.body.gold;
        res.sendStatus(200);
    },
    getInfo: async (req, res) =>{
        try
        {
            if(req.uuid === undefined)
                return res.status(401).json({message: "Unauthorized"});
            const uuid = req.uuid;
            const result = await User.getUser(uuid);
            if(result === null)
            {
                return res.status(404).json({message: "Database error"});
            }
            return res.status(200).json(result);
        }
        catch(err)
        {
            if(err){
                console.error("Error fetching user:", err);
                return res.status(500).json({message: "Database error"});
            }
        }

    }
}

export default { process };

