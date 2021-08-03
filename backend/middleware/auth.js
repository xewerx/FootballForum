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
        const isCustomAuth = token.length < 500; //if more than 500 is google auth

        if(isCustomAuth) {
            jwt.verify(token, process.env.JWT_SECRET || 'ifDotEnvDoesntExist', (err, decode) => {
                if(err) {
                    res.status(401).send({ message: "Invalid token" });
                } else {
                    req.user = decode;
                }
            });
        } else {
            req.user = jwt.decode(token); // google user id
        }
        next(); // odpakowac id usera i przekazac do upload mem
    } else {
        res.status(401).send({ message: "No token" });
    }
};

export const isAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: "Permission denied" });
    }
};