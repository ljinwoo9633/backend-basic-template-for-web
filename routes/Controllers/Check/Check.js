let {
    TryError
} = require('../Error/Error');

const USER = require('../../../models/User');

exports.CheckUserAuthorizationController = async (req, res) => {
    const USER_ID = req.params.id;

    try
    {
        await USER.findOne({_id: USER_ID}).then(async(foundUser) => {
            if(foundUser)
            {
                return res.status(200).send(
                    {
                        result: true
                    }
                )
            }
            else
            {
                return res.status(200).send(
                    {
                        result: false
                    }
                )
            }
        })
    }
    catch(error)
    {
        return res.status(200).send(
            {
                result: false
            }
        )
    }
}