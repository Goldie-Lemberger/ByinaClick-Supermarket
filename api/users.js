'use strict';
const express = require("express");
let router = express.Router();


router.use(function resetRouter(req, res, next) {
    next()
});

const sentEmail = require('./sentEmail');
const addCart = require('./cart').addCart;
const changePassword = require('./forgetPassword');
const invoicing = require('./invoicing');

var mongoose = require('mongoose');
var mongoDb = 'mongodb+srv://goldieLemberger:goldie.9912@buyinaclick.rzpgv.mongodb.net/buyinaclickstore?retryWrites=true&w=majority'
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var userPrivate = new Schema(
    {
        id: { type: String, require: true },
        lastName: { type: String },
        firstName: { type: String },
        userEmail: { type: String },
        address: { type: String },
        phoneNumber: { type: String },
        password: { type: String },
        type: { type: String }
    }
);

var userBussines = new Schema(
    {
        id: { type: String, require: true },
        companyBusiness: { type: String },
        employeesBusiness: { type: String },
        typeBusiness: { type: String },
        lastName: { type: String },
        firstName: { type: String },
        userEmail: { type: String },
        address: { type: String },
        phoneNumber: { type: String },
        password: { type: String },
        type: { type: String }
    }
);
var modelUsersP = mongoose.model('modelUsersP', userPrivate, 'Users');
var modelUsersB = mongoose.model('modelUsersB', userBussines, 'Users');

const sentEmailSucsess = async (user) => {
    const subject = `Thank you for signing up to Buy in a Click‏`;
    const messageToSent = `<h3>hi ${user.lastName} ${user.firstName}</h3>
                <br/>
                <p>Thank you for signing up for the Buy in a Click website - the door-to-door shopping experience</p>
                <p>To log in you will need to enter the following details:
                <br/>
                <b>ID: </b>${user.id}
                <br/>
                <b>UserName: </b>${user.userEmail}
                <br/>
                <b>Password: </b>${user.password}
                <br/>
                <p>Please keep them with you.</p>
                <br/>
                <br/>
                <br/>
                <p>Fun shopping! <b>Buy in a Click. </b></p>
                <br/>
                `;

    await sentEmail(user.userEmail, subject, messageToSent, [{
        filename: 'Barcode1.png',
        path: __dirname + '/images/Barcode1.png',
        cid: 'unique@kreata.ee'
    }]);

}

router.get('/:id', async (req, res) => {
    modelUsersP.find({ id: req.params.id }, (err, user) => {
        if (err) {
            modelUsersB.find({ id: req.params.id }, (err2, user2) => {
                if (err2) { return res.status(500).send(err2) }
                else { return res.status(200).send(user2); }
            })
        }
        else { return res.status(200).send(user); }
    });
});



router.post('/', async (req, res) => {
    const user = req.body
    if (user.type === "PrivateCustomer") {
        modelUsersP.findOne({ id: user.id }, async (err, user_) => {
            if (err) { return res.status(500).send(err) }
            if (!user_) {
                const newUser = new modelUsersP({
                    id: user.id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    userEmail: user.userEmail,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    type: "PrivateCustomer"
                });
                await newUser.save();

                const check = addCart({ id: user.id, totalPrice: user.totalPrice });
                if (check) {
                    await sentEmailSucsess(user);
                    return res.send(true);
                }
            }
            return res.send(false);
        });
    } else {
        modelUsersB.findOne({ id: user.id }, async (err, user_) => {
            if (err) { return res.status(500).send(err) }
            if (!user_) {
                const newUser = new modelUsersB({
                    id: user.id,
                    companyBusiness: user.id,
                    employeesBusiness: user.employeesBusiness,
                    typeBusiness: user.typeBusiness,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    userEmail: user.userEmail,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    type: "BusinessCustomer"
                });
                await newUser.save();
                const check = addCart({ id: user.id, totalPrice: user.totalPrice });
                if (check) {
                    await sentEmailSucsess(user);
                    return res.send(true);
                }
            }
            return res.send(false);
        });
    }
});

router.get('/reset/:id', async (req, res) => {

    modelUsersP.find({ id: req.params.id }, async (err, user) => {
        if (err) {
            modelUsersB.find({ id: req.params.id }, async (err2, user2) => {
                if (err2) { return res.status(500).send(0) }
                else {
                    let code_ = 0
                    await changePassword(user[0])
                        .then(async (code) => {
                            code_ = await code;
                        }).catch((err) => {
                            throw (err);
                        })
                    console.log("code:" + code_);
                    return res.sendStatus(200).send(code_);
                }
            })
        }
        else {
            let code_ = 0
            await changePassword(user[0])
                .then(async (code) => {
                    code_ = await code;
                })
            res.status(200).send((code_).toString());

        }
    });
});

router.put('/:id', async (req, res) => {
    if (req.body.type === "PrivateCustomer") {
        const doc = await modelUsersP.findOneAndUpdate({ id: req.params.id }, req.body);
        return res.send(doc);

    } else {
        const doc = await modelUsersB.findOneAndUpdate({ id: req.params.id }, req.body);
        return res.send(doc);
    }
});


module.exports = router;