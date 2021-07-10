import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET || 'ifDotEnvDoesntExist',
    {
        expiresIn: '7d'
    });
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'ifDotEnvDoesntExist', (err, decode) => {
            if(err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                req.user = decode;
                next(); // odpakowac id usera i przekazac do upload mem
            }
        });
    } else {
        res.status(401).send({ message: "No token" });
    }
};