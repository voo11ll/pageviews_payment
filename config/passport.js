const LocalStrategy = require('passport-local').Strategy;
const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

// model user
const User = require('../models/User');
const { is } = require('express/lib/request');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) =>{
            //match user
            User.findOne({ email: email})
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Этот email не зарегистрирован' });
                  }

                 //match pass
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                     if(err) throw err;
                     if(isMatch){
                         return done(null, user);
                     }else{
                        return done (null, false, {message: 'Неверный пароль'}) 
                     }
                 });

            })
            .catch(err => console.log(err));
        })
    );
    
    //passport
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
          done(err, user);
        });
      });
}
