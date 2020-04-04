let {
    UserNotExistsError,
    TryError
} = require('../Error/Error');
let jwt = require('jsonwebtoken');

const USER = require('../../../models/User');

module.exports = LogoutController = async (req, res) => {
    const USER_ID = req.user._id;

    try
    {
        await USER.findOne({_id: USER_ID}).then(async(foundUser) => {
            if(foundUser)
            {
                foundUser.onLine = false;
                await foundUser.save().then(async() => {
                    return res.sendStatus(200);
                })
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