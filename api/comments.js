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
var comment = new Schema(
    {
        name: { type: String },
        response: { type: String },
        rating: { type: Number },
        time: { type: Date },
    }
);
var comment = mongoose.model('comment', comment, 'Comments');


router.get('/', async (req, res) => {
    comment.find({}, (err, comments) => {
        if (err) {
            return res.status(500).send(err)
        }
        else { return res.status(200).send(comments); }
    });
});


router.post('/' ,async (req,res)=>{
    const newComment = new comment({
        name:req.body.name,
        response:req.body.response,
        rating: req.body.rating,
        time: new Date(),
    })
    await newComment.save();
    res.send(true)
});


module.exports = router;
