import express from 'express';
import bcrypt from 'bcryptjs';
import User  from '../models/UserModel';
import { generateJWT } from '../helpers/jwt';

export const createUser = async (req = express.request, res = express.response) => {
    const {name, email, password} = req.body;    
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'An user with this email already exists',
            });    
        }
        const salt = bcrypt.genSaltSync();
        const encryptPassword = bcrypt.hashSync(password, salt);
        user = new User({... req.body, password: encryptPassword});
        await user.save();

        const token = await generateJWT(user.id, user.name);
        return res.status(201).json({
            ok: true,
            msg: 'created',
            user: {
                name,
                uid: user._id
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error at create user',
            error
        });
    }
};

export const login = async (req = express.request, res = express.response) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'There is no an user with this email',
            });    
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect',
            });    
        }

        const token = await generateJWT(user.id, user.name);
        return res.status(200).json({
            ok: true,
            msg: 'Login correct',
            user: {
                name: user.name,
                uid: user._id
            },
            token
        });    
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to login',
            error
        });
    }
};

export const renew = async (req: express.Request, res = express.response) => {
    const {uid, name} = req.body;
    const token = await generateJWT(uid, name);
    res.json({
        ok: true,
        msg: 'renew',
        token
    });
};