let {
    TryError,
    NotSamePasswordError,
    NotLongPasswordError,
    AlreadyUserExistsError,
    FailToBcryptPassword,
    FailToSendEmailError
} = require('../Error/Error');
let bcrypt = require('bcryptjs');
let { SendEmailTokenController } = require('../Marketing/Email');

const USER = require('../../../models/User');

module.exports = RegisterController = async (req, res) => {
    let {
        email,
        password,
        confirmPassword,
        name,
        gender,
        birthDate
    } = req.body;


    SplitedBirthDate = SplitBithDate(birthDate);
    let birthDateYear = parseInt(SplitedBirthDate[0]);
    let birthDateMonth = parseInt(SplitedBirthDate[1]);
    let birthDateDay = parseInt(SplitedBirthDate[2]);
    
    CheckSamePasswordWithConfirmPassword(password, confirmPassword, res);
    CheckLongPassword(password, res);
    CreateNewUser(email, password, name, gender, birthDateYear, birthDateMonth, birthDateDay, res);

}

let CheckSamePasswordWithConfirmPassword = (password, confirmPassword, res) => {
    if(password !== confirmPassword)
    {
        NotSamePasswordError(res);
    }
}

let CheckLongPassword = (password, res) => {
    if(password.length < 9)
    {
        NotLongPasswordError(res);
    }
}

let CreateNewUser = async (email, password, name, gender, birthDateYear, birthDateMonth, birthDateDay, res) => {
    try
    {
        await USER.findOne({email: email}).then(async(foundUser) => {
            if(foundUser)
            {
                AlreadyUserExistsError(res);
            }
            else
            {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err)
                    {
                        FailToBcryptPassword(res);
                    }
                    else
                    {
                        bcrypt.hash(password, salt, async (err, hash) => {
                            if(err)
                            {
                                FailToBcryptPassword(res);
                            }
                            else
                            {
                                const NEW_USER = new USER(
                                    {
                                        email,
                                        password: hash,
                                        name,
                                        gender,
                                        birthDateYear,
                                        birthDateMonth,
                                        birthDateDay
                                    }
                                );

                                
                                await NEW_USER.save().then(async(savedUser) => {
                                    let result = SendEmailTokenController(savedUser);
                                    if(result === 0)
                                    {
                                        FailToSendEmailError(res);
                                    }
                                    else
                                    {
                                        return res.sendStatus(200)
                                    }
                                })
                            }
                        })
                    }
                });
            }
        })
    }
    catch(error)
    {
        TryError(error, res);
    }
}

let SplitBithDate = (birthDate) => {
    let result = birthDate.split('-');
    return result;
}