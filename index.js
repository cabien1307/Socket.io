const express = require('express');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static('./public'));


var server = require('http').Server(app)
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.render('home')
})

var users = []



io.on('connection', (socket) => {
    console.log('Socket is connected !', socket.id);


    // // Register
    // socket.on('client-send-username', (data) => {

    //     console.log(data);
    //     if (users.indexOf(data) >= 0) {
    //         // failure
    //         socket.emit('server-send-fail')
    //     } else {
    //         // success
    //         users.push(data)
    //         socket.username = data
    //         socket.emit('server-send-success', data)
    //         io.sockets.emit('server-send-all-user', users)
    //     }
    //     // console.log('socket ID : ' + socket.id + ', Data: ' + data);

    //     // Server emit all client
    //     // io.sockets.emit('Server-send-data', data + socket.id)

    //     // server emit data only yourself
    //     // socket.emit('Server-send-data', data + socket.id)

    //     // server emit data all user(- yourself)
    //     // socket.broadcast.emit('Server-send-data', data + socket.id)

    // })

    // // Log out
    // socket.on('client-send-logout', () => {
    //     users.splice(
    //         users.indexOf(socket.username), 1
    //     )
    //     socket.broadcast.emit('server-send-all-user', users)
    // })

    // // Chat
    // socket.on('user-send-msg', (data) => {
    //     io.sockets.emit('server-send-msg', {
    //         username: socket.username,
    //         msg: data
    //     })
    // })

    // // Typing
    // socket.on('typing-text', () => {
    //     var s = socket.username + ' is typing';
    //     io.sockets.emit('someone-is-typing', s)
    // })

    // // Untyping
    // socket.on('stop-typing-text', () => {
    //     console.log(socket.username + ' is stopped type');
    //     io.sockets.emit('dont-have-any-typing')
    // })

    // Rooms
    socket.on('create-room', (room) => {
        socket.join(room);
        socket.Name = room;

        var rooms = [];

        // console.log(socket.adapter.rooms);

        for( var room of socket.adapter.rooms ){
            rooms.push(room)
        }

        io.sockets.emit('server-send-rooms', rooms)
        socket.emit('server-send-socket-room', room)
    })

    socket.on('user-chat-in-room', (msg) => {
        io.sockets.in(socket.Name).emit('server-chat', msg)
    })

   
    
    // disconnect
    socket.on('disconnect', () => {
        console.log('Socket is disconneted', socket.id);
    })
})


server.listen(8080, () => {
    console.log('App listen at port http://localhost:8080 !');
})