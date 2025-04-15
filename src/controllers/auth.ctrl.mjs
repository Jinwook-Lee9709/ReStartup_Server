import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import jwtUtils from '../utils/jwt.utils.mjs';

import { Login, Register } from '../models/auth.dao.mjs';


import jwt from "jsonwebtoken";

export const jwtAuth = {
    sign: async(req, res) =>{
        const uuid = req.body.uuid;
        const result = jwtUtils.sign(uuid);
        return res.status(200).json(result);
    },
    verify: async(req, res) =>{
        const token = req.query.token;
        const result = jwtUtils.verify(token);
        return res.status(200).json(result.type);
    },
    refresh: async(req, res) =>{
        const token = req.query.token;
        const verifyResult = jwtUtils.refreshVerify(token);
        if(!verifyResult.type)
            return res.status(401).json({error: 'Invalid Token'});

        const uuid = verifyResult.uuid;
        const newToken = jwtUtils.sign(uuid);
        return res.status(200).json(newToken);
    }
}
export const register = {
    guest: async(req, res) =>{
        try
        {
            const userData =
                {
                    uuid: uuidv4(),
                    providerId: uuidv4(),
                    loginSource: 'Guest',
                }
            const result = await Register.getUser(userData);
            console.log(result);
            return res.status(200).json(userData.providerId);
        }catch (err)
        {
            console.log(`Register Request Failed with : ${err}`);
            return res.status(500);
        }

    }
}

export const login ={
    guest: async(req, res) =>{
        if(req.query.uuid === undefined)
            return res.status(400).json({error: 'uuid is required'});
        try
        {
            const uuid = req.query.uuid;
            const userInfo = await Login.getUserByProviderId(uuid)
            const token = jwtUtils.sign(userInfo.uuid);
            const refreshToken = jwtUtils.refresh(userInfo.uuid);
            return res.status(200).json({token, refreshToken});
        }
        catch(error)
        {
            return res.status(500).json({error: 'Internal Server Error'});
        }

    },
    googleAuthenticate: async(req, res) =>{
        const { AuthCode } = req.body;
        console.log('Request Body:', req.body);
        console.log(`code: ${AuthCode}`)
        let resp = null;
        try
        {
                resp = await axios.post(process.env.GOOGLE_TOKEN_URL, {
                code: AuthCode,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            });
        }catch (err)
        {
            console.log(`google Auth Request Failed with : ${err}`);
            return res.status(500);
        }
        return res.status(200);
    }
}

export default { jwtAuth, register, login  };