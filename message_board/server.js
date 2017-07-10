// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
 name: {type:String, required: true, minlength: 4},
 message: {type:String, required:true},
 comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})
mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'User'
var Message = mongoose.model('Message') // We are retrieving this Schema from our Models, named 'User'
var commentSchema = new mongoose.Schema({
    name: {type:String, required: true},
    text:{type:String, required:true},
    _message: {type:Schema.Types.ObjectId, ref:'Message'}
},{timestamps:true});
mongoose.model('Comment', commentSchema);
var Comment = mongoose.model('Comment');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
errors=""
app.get('/', function(req, res) {
    Message.find({})
    .populate('comments')
    .exec(function(err,messages){
        console.log(messages);
        res.render('index', {messages:messages, errors:errors})
    })
});
// Add User Request 
app.post('/message', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var message = new Message({name: req.body.name, message: req.body.message});
    message.save(function(err){
        if(err){
            console.log('something went wrong');
            errors = err;
            res.redirect('/')
        } else {
            errors = "";
            console.log('successfully added a message');
            res.redirect('/');
        }
    });
});
app.post('/comment', function(req, res){
    Message.findOne({_id: req.body.id}, function (err, message){
        var comment = new Comment({name:req.body.name, text:req.body.comment});
        comment._message = message._id;
        message.comments.push(comment);
        comment.save(function(err){
            if(err){
                console.log('comment errors', err);
                errors = err;
                res.redirect('/');
            } else {
                errors = "";
            message.save(function(err){
                if(err){
                    console.log('errors', err);
                } else {
                    res.redirect('/')
                }
            })
            }
        })
    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
