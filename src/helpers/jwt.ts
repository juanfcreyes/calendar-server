import jwt from 'jsonwebtoken';

export const generateJWT = (uid: String, name: String) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
}