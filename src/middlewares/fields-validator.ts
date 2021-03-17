import express from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidator = (req = express.request, res = express.response, next: any) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() 
        });
    }
    next();
}