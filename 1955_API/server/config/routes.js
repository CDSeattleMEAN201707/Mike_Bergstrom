var people = require('../controllers/people.js')
module.exports = function(app){
    app.get('/', function(req,res){
        people.show(req,res);
    })

    app.get('/new/:name/', function(req,res){
        people.add(req,res);
    })

    app.get('/remove/:name', function(req,res){
        console.log("in remove route");
        people.remove(req,res);
    })

    app.get('/:name', function(req,res){
        people.showOne(req,res);
    })
}