import jwt from 'jsonwebtoken';

export const jwtUtils = {
    sign: (uuid) =>{
        const payload = {
            uuid: uuid
        };
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
            algorithm: 'HS256'
        });
    },
    verify: (token) => {
        let decoded = null;
        try{
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256'
            });
            return {
                type: true,
                uuid: decoded.uuid,
            }
        } catch(err){
            return {
                type: false,
                message : err.message
            }
        }
    },
    refresh: (uuid) => {
        const payload = {
            uuid: uuid
        };
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '14d',
            algorithm: 'HS256'
        })
    },
    refreshVerify: (token) => {
        let decoded = null;
        try{
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: 'HS256'
            });
            return {
                uuid: decoded.uuid,
                type: true,
            }
        } catch(err){
            return {
                type: false,
                message : err.message
            }
        }
    }
}

export default jwtUtils;