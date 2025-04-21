import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import jwtUtils from '../utils/jwt.utils.mjs';

import { Login, Register, Delete } from '../models/auth.dao.mjs';


import jwt from "jsonwebtoken";
import {json} from "express";

export const jwtAuth = {
    sign: async(req, res) =>{
        const uuid = req.body.uuid;
        const result = jwtUtils.sign(uuid);
        return res.status(200).json({success : true, data: result});
    },
    verify: async(req, res) =>{
        const token = req.query.token;
        const result = jwtUtils.verify(token);
        return res.status(200).json({success : true, data : result.type});
    },
    refresh: async(req, res) =>{
        const token = req.query.token;
        const verifyResult = jwtUtils.refreshVerify(token);
        if(!verifyResult.type)
            return res.status(401).json({success : false, error: 'Invalid Token'});

        const uuid = verifyResult.uuid;
        const newToken = jwtUtils.sign(uuid);
        return res.status(200).json({success : true, data : newToken});
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
            return res.status(200).json({success: true, data : userData.providerId});
        }catch (err)
        {
            console.log(`Register Request Failed with : ${err}`);
            return res.status(500).json( {success: false, data: null});
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
            return res.status(200).json({success:true, data: {token: token, refreshToken: refreshToken}});
        }
        catch(error)
        {
            return res.status(500).json({success : false, error: 'Internal Server Error'});
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
            return res.status(500).json({success: false, error: 'Internal Server Error'});
        }
        return res.status(200).json({success: true, data: true});
    }
}

export const deleteUser = {
    delete: async(req, res) =>{
        try
        {
            const uuid = req.uuid;
            const result = await Delete.deleteUser(uuid);
            return res.status(200).json({success:result.affectedRows > 0, data : result.affectedRows > 0});
        }catch (err)
        {
            console.log(`Delete Request Failed with : ${err}`);
            return res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    }
}

export default { jwtAuth, register, login, deleteUser };