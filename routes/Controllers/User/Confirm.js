let {
    TryError,
    UserNotExistsError
} = require('../Error/Error');

const USER = require('../../../models/User');

module.exports = ConfirmController = async (req, res) => {
    const REQ_USER = req.user;

    try
    {
        await USER.findOne({_id: REQ_USER._id}).then(async(foundUser) => {
            if(foundUser)
            {
                foundUser.emailVerification = true;
                
                await foundUser.save().then(() => {
                    return res.redirect(`${process.env.FRONTEND_URL}/login`);
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