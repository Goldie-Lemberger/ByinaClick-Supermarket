'use strict';
const express = require("express");
let router = express.Router();


router.use(function resetRouter(req, res, next) {
    next()
});

const sentEmail = require('./sentEmailInvoice');
const invoicing = require('./invoicing');

var mongoose = require('mongoose');
var mongoDb = 'mongodb+srv://goldieLemberger:goldie.9912@buyinaclick.rzpgv.mongodb.net/buyinaclickstore?retryWrites=true&w=majority'
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


router.put('/', async (req, res) => {
    const ig = new invoicing(req.body);
    await ig.generate();
    await sentEmail(req.body.email,'invoce',`
    <h2>hello ${req.body.lastName} ${req.body.firstName}</h2>
    <p>Thank you for buying from us</p> 
    <p>An invoice is attached to this email</p>
    <img style="width:200px;" src='cid:unique@kreata.ee'>
    `)
    return res.send(true);
});

module.exports = router;
