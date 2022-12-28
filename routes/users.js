const e = require('connect-flash');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/User');

//login
router.get('/', (req, res) => res.send('index'));

//regist
router.get('/regist', (req, res) => res.render('./Registration.html'));

//seting
router.get('/set', (req, res) => res.render('./EditProfilePage.html'));

//regist valid
router.post('/regist', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required frields
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Пожалуйста, введите все поля'})
    } 

    // check password
    if(password !== password2) {
     errors.push({ msg: 'Несовпадение пароля'})
    } 

    //check length pass
    if(password.length < 6) {
     errors.push({ msg: 'Пароль должен содержать не менее 6 символов'})
    }

    if(errors.length > 0) {
        res.render('./Registration.html', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //validation passed
        User.findOne({ email: email})
        .then(user => {
            if(user){
                //user exists
                errors.push({msg:''});
                res.render('./Registration.html', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                 
                //hash pass
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => {
                            req.flash('success_msg', 'Bы зарегистрированы и можете войти');
                          res.redirect('/');
                        })
                        .catch(err => console.log(err));
                    });
                  });
                }
              });
            }
          });



// login handle
router.post('/', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/set',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  });

//logout
router.get('/logout', (req, res) => {
   req.flash('success_msg', 'Вы вышли из системы');
   res.redirect('/');
}) 

module.exports = router;