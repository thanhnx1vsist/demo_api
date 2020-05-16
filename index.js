const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user')
const db = 'mongodb://localhost/test_egg';
const body_parser = require('body-parser');


mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }, () =>{console.log('Mongodb is connected!')});
app.use(body_parser());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/user', async(req, res) =>{
    var user = await new User({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password
    })

    var users = await user.save();
    res.json(users);
});


app.get('/user', async (req, res) =>{
    var user = await User.find();
    res.json(user);
});

app.get('/user/:username', async(req, res)=>{
    var user = await User.find({username : req.params.username});
    res.json(user);
})


app.listen(3000, ()=>{console.log('Server is running in port 3000')});