var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {
    show: function(req,res){
        Person.find({}, function(err, people){
            console.log(people);
            res.json(people);
        })
    },

    add: function(req,res){
        console.log(req);
        console.log(req.params.name);
        var person = new Person({name:req.params.name});
        console.log(person);
        person.save();
        res.redirect('/');
    },

    remove: function(req,res){
        console.log("in remove controller")
        console.log(req.params.name);
        Person.remove({name: new RegExp('^'+req.params.name+'$', "i")}, function(err){
            res.redirect('/');    
        });
    },

    showOne: function(req,res){
        console.log(req.params.name);
        Person.find({name: new RegExp('^'+req.params.name+'$', "i")}, function(err, person){
            console.log(person)
            res.json(person);
        })
    }


}