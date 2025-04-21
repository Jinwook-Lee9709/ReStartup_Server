import jwtUtils from '../utils/jwt.utils.mjs';

export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader === undefined)
            return res.status(404).json({success: true, error : 'Header not found'});

        const token = authHeader.split(' ')[1];
        if (token === undefined)
            return res.status(404).json({success: true, error : 'Token not found'});

        const result = jwtUtils.verify(token);
        if (!result.type) {
            return res.status(401).json({success: true, error : 'Invalid token'});

        }
        req.uuid = result.uuid;
        console.log('User authenticated');
        next();
    } catch (err) {
        console.error('Error in authentication middleware:', err);
        return res.status(500);
    }
}