
var nodemailer = require('nodemailer');

const sentEmail_ = (email, subject, messageToSent,object) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: 'buyinaclick12@gmail.com',
            pass: '212369060'
        }
    });

    var mailOptions = {
        from: 'buyinaclick12@gmail.com',
        to: email,
        subject: subject,
        html: `${messageToSent} <img style="width:200px;" src='cid:unique@kreata.ee'>`,
        attachments: object
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}

module.exports = sentEmail_
