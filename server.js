const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

const db = require('./models/user.js');
require('./config/passport.js')(passport)

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize())
app.use(session({
    secret: 'rasengan',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))

app.get("/sign-up", function (req,res) {
    res.send("Sign up here")
});

app.post('/sign-up', function(req,res){
    db.findOne({email: req.body.Email}, function(err,user){
        if(err) return done(err)
        if(!user) {
            console.log(req.body.username)
            member = new db({
                name: req.body.username,
                email: req.body.Email,
                age: req.body.age,
                password: req.body.password,
            })

            member.save().then(res.redirect('/'))
        }
        if(user){
            console.log(user.name)
            res.redirect('/sign-up')
        }
    })
})

app.post('/sign-in',passport.authenticate('local',
{failureRedirect: '/failed'}
),
function(req,res){
        res.redirect('/')
    }
)

app.get('/', function(req,res){
    res.send("Success!");
})
    
app.get('/failed', function(req,res){
    res.send("Failed!");
})

app.listen(3000 | process.env.PORT,() => console.log('Server is running...'))