var users = require('../controllers/users.js')
module.exports = function(app){
    // Render the login page at root route *********************************
    app.get('/', function(req,res){
        console.log(req.session.id);
        res.render('index', {errors:""})
    })
    // Post login information for validation*******************************
    app.post('/login', function(req,res){
        users.login(req,res);
    })
    // Route to render registration page ***********************************
    app.get('/register', function(req,res){
        res.render('register', {errors:"", input:""});
    })
    // Post registration information ***************************************
    app.post('/register', function(req,res){
        users.register(req,res);
    }) 
    app.get('/success', function(req,res){
        res.render('success')
    })
}