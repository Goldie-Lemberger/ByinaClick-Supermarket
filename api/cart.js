'use strict';
const express = require("express");
let router = express.Router();

router.use(function resetRouter(req, res, next) {
   
    next()
})




var mongoose = require('mongoose');
var mongoDb = 'mongodb+srv://goldieLemberger:goldie.9912@buyinaclick.rzpgv.mongodb.net/buyinaclickstore?retryWrites=true&w=majority'
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;





var cart = new Schema(
    {
        id: { type: String, require: true },
        cart: { type: Array },
        totalPrice: { type: Number }
    }
);
var cartModel = mongoose.model('Cart', cart, 'Cart');


router.get('/:id', async (req, res) => {
    cartModel.find({ id: req.params.id }, (err, user) => {
        if (err) { return res.status(500).send(err) }
        else { return res.status(200).send(user); }
    });
})

router.put('/:id', async (req, res) => {
    const doc = await cartModel.findOneAndUpdate({ id: req.params.id }, req.body);
    res.send(doc);
})

const addCart = async (details) => {
    console.log("in add Cart")
    const newCart = new cartModel({
        id: details.id,
        cart: [],
        totalPrice: details.totalPrice
    });
    newCart.save()
    return true
}


module.exports = router 
module.exports.addCart = addCart
