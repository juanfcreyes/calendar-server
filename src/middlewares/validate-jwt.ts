import express from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token was not sent'
        });
    }
    try {
        const payload: any = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.body.uid = payload.uid;
        req.body.name = payload.name;
    } catch (error) {
        return  res.status(401).json({
            ok: false,
            msg: 'invalid token',
            error
        });
    }
    next();
}