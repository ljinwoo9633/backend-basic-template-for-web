let {
    TryError
} = require('../Error/Error');
let jwt = require('jsonwebtoken');
let nodemailer = require('nodemailer');

const USER = require('../../../models/User');

exports.SendEmailTokenController = async (user) => {
    let emailSubject = 'Hello world!';
    let transporter = nodemailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.COMPANY_PASSWORD
            }
        }
    );

    let emailToken = jwt.sign(user.toObject(), process.env.EMAIL_SECRET_KEY, {expiresIn: '1 days'});
    let mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: user.email,
        subject: emailSubject,
        text: `${process.env.BACKEND_URL}/confirm/${emailToken}`
    }

    try
    {
        await transporter.sendMail(mailOptions, async(err, data) => {
            if(err)
            {
                await USER.findOneAndDelete({_id: user._id});

                return 0;
            }
            else
            {
                return 1;
            }
        })
    }
    catch(error)
    {   
        TryError(error ,res);
    }
}