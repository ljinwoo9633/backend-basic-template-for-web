let {
    TryError,
    UserNotExistsError,
    NotSamePasswordError,
    NotVerifiedEmailError
} = require('../Error/Error');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

const USER = require('../../../models/User');

module.exports = LoginController = async (req, res) => {
    let {
        email,
        password
    } = req.body;

    try
    {
        await USER.findOne({email: email}).then(async(foundUser) => {
            if(foundUser)
            {
                if(foundUser.emailVerification)
                {
                    bcrypt.compare(password, foundUser.password, async (err, isMatch) => {
                        if(err)
                        {
                            NotSamePasswordError(res);
                        }
                        else
                        {
                            if(isMatch)
                            {
                                foundUser.onLine = true;
                                await foundUser.save().then(async(savedUser) => {
                                    let accessToken = jwt.sign(savedUser.toObject(), process.env.ACCESS_SECRET_KEY, {expiresIn: '1 days'});
                                    return res.status(200).send(
                                        {
                                            accessToken
                                        }
                                    )
                                })
                            }
                            else
                            {
                                NotSamePasswordError(res);
                            }
                        }
                    })
                }
                else
                {
                    NotVerifiedEmailError(res);
                }
            }
            else
            {
                UserNotExistsError(res);
            }
        })
    }
    catch(error)
    {
        TryError(error, res);
    }
}