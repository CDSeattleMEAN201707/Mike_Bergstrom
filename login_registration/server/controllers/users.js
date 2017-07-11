var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
    register: function(req,res){
        console.log ("in control register");
        console.log(req.body);
        var newUser = new User({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                birthday: req.body.birthday,
            })
        if (req.body.password != req.body.confirm){
            newUser.validate(function(err){
                if (err){
                    console.log(err, "in password mismatch")
                    res.render('register', {errors: err, passMatch: true})
                } else {
                    res.render('register', {passMatch: true, errors: ""});

                }
            })
        } else {
            console.log("in control else");
            console.log(newUser);
            newUser.save(function(err, user){
                if(err){
                    console.log("save error", err);
                    console.log(err['name'])
                    res.render('register', {errors: err, passMatch:false})
                } else {
                    console.log("register success")
                    req.session.id = user.id;
                    console.log(req.session.id)
                    res.redirect('/success')
                }
            })
        }
    },

    login: function(req,res){
        if (! req.body.email || !req.body.password){
            res.render('index', {errors:'error'})
        } else {
            User.findOne({email: req.body.email}, function(err, user){
                if (err){
                    console.log("login errors", err)
                    res.render('index', {errors:"login error"})
                } else {
                    console.log(user);
                    if (bcrypt.compareSync(req.body.password, user.password)){
                        console.log("password Match");
                        req.session.id = user.id;
                        console.log(req.session.id)
                        res.redirect('/success')
                    } else {
                        console.log("incorrect password");
                        res.render('index', {errors:"login error"})
                    }
                }
            });
        }
    },

}