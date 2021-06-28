'use strict';

const express = require("express");
let router = express.Router();

router.use(function resetRouter(req, res, next) {
  next()
});

var mongoose = require('mongoose');
var mongoDb = 'mongodb+srv://goldieLemberger:goldie.9912@buyinaclick.rzpgv.mongodb.net/buyinaclickstore?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var product = new Schema(
  {
    id: { type: String, require: true },
    imageItem: { type: String },
    nameItem: { type: String },
    informationItem: { type: String },
    priceItem: { type: Number },
    category: { type: String },

  }
);

var modelProducts = mongoose.model('Products', product, 'Products');


router.get('/:category', async (req, res) => {
  modelProducts.find({category:req.params.category},(err, people) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(people);
  });
});

router.get('/product/:id', async (req, res) => {
  modelProducts.find({id:req.params.id},(err, people) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(people);
  });
});



module.exports = router;