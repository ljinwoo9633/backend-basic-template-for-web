require('dotenv').config();

let jwt = require('jsonwebtoken');

exports.VerifyEmailTokenMiddleware = (req, res, next) => {
    let emailToken = req.params.id;

    if(emailToken == null)
    {
        return res.sendStatus(401);
    }
    else
    {
        jwt.verify(emailToken, process.env.EMAIL_SECRET_KEY, (err, user) => {
            if(err)
            {
                console.log(err);
                return res.sendStatus(401);
            }
            else
            {
                req.user = user;
                next();
            }
        })
    }
}

exports.VerifyAccessTokenMiddleware = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if(token == null)
    {
        return res.sendStatus(401);
    }
    else
    {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if(err)
            {
                console.log(err);
                return res.sendStatus(401);
            }
            else
            {
                req.user = user;
                next();
            }
        })
    }
}