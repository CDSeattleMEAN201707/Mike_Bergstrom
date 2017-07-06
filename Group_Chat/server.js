// require express and path
var express  =  require( "express");
var path  =  require( "path");

// create the express app
var app  =  express();

// static content 
app. use(express.static(path. join(__dirname  +  "./static")));

// setting up ejs and our views folder
app.set( 'views', path. join(__dirname,  './views'));
app.set( 'view engine',  'ejs');
// root route to render the index.ejs view
app.get( '/', function(req, res) {
 res. render( "index");
})

// tell the express app to listen on port 8000
var server = app. listen(8000, function() {
 console. log( "listening on port 8000");
});

var io = require('socket.io').listen(server);
var chats = [];
io.sockets.on('connection', function(socket){
    console.log('We are using sockets!');
    console.log(socket.id);

    socket. on('new_user', function(data){
        console.log("new user");
        console.log(data.name);
        socket. emit('server_response', {chats: chats});
    });

    socket. on('new_message', function(data){
        console.log(data.name);
        console.log(data.chat);
        chats.push({name:data.name, message:data.chat})
        io. emit('chat_update', {chats: chats});
    });
})