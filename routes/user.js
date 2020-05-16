const User = require('../model/user');
const express = require('express');
const app = express();

app.post('/user', async(req, res) =>{
    var user = await new User({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password
    })

    var users = await user.save();
    res.json(users);
})

