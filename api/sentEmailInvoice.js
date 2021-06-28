
var nodemailer = require('nodemailer');

const sentEmail_ = (email, subject, messageToSent) => {
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
        html: `${messageToSent}`,
        attachments: [{
            filename: 'Barcode1.png',
            path: __dirname + '/images/Barcode1.png',
            cid: 'unique@kreata.ee'
        },{
            filename: "Invoice.pdf",
            path:__dirname+`/Invoice.pdf`,
            contentType: 'application/pdf'
        }]
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
