const LocalStrategy = require('passport-local').Strategy;

const db = require('../models/user.js');

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username,password,done){
            db.findOne({email: username}, function(err,user){
                if(err) {return done(err)}
                if(!user) {return done(null,false, {message: "Wrong username or password"})}
                if(user.password !== password) {return done(null,false, {message: "Wrong username or password"})}
                return done(null,user)
            })
        }
    ))

passport.serializeUser(function(user, done){
    done(null,user)
})

passport.deserializeUser(function(user, done){
    done(null,user)
})
}
