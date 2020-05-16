const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user')
const body_parser = require('body-parser');

// Connect to DB
const db = 'mongodb+srv://all:eggPassword@egg-web-bhj5p.gcp.mongodb.net/egg_demo?retryWrites=true&w=majority';
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }, () =>{console.log('Mongodb is connected!')});

// Middlewares
app.use(body_parser());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// API to create new user
app.post('/user/new', async(req, res) =>{
    var user = await new User({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password
    })
    var users = await user.save();
    res.send("Success!!!")
});


// API to get all user in DB
app.get('/user', async (req, res) =>{
    var user = await User.find();
    res.json(user);
});

// API to get user with username = <:username>
app.get('/user/:username', async(req, res)=>{
    var user = await User.find({username : req.params.username});
    res.json(user);
})

// Route to load the home page
app.get("/", (req,res)=>{
    res.render("index.html")
})

app.listen(3000, ()=>{console.log('Server is running in port 3000')});