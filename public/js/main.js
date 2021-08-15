const socket = io('http://localhost:8080/')

// socket.on('server-send-fail', () => {
//     alert('Username has already existed !')
// })

// socket.on('server-send-all-user', (data) => {
//     console.log(data);

//     $('#userOnline').html('');


//     data.forEach(element => {
//         $('#userOnline').append(`<li id="user">${element}</li>`);
//     });
// })

// socket.on('someone-is-typing', (data) => {
//     $('#notify').html(data);
// })

// socket.on('dont-have-any-typing', () => {
//     $('#notify').html('');
// })

// socket.on('server-send-msg', (data) => {
//     $('#listMsg').append(`<div class="msg">${data.username} - ${data.msg}</div>`)
// })
// socket.on('server-send-success', (data) => {
//     console.log(data);
//     $('#currentUser').html(data);
//     $('#loginForm').hide(2000);
//     $('#chatForm').show(1000);
// })



// 
socket.on('server-send-rooms', (rooms) => {
    $('#listRooms').html('')
    rooms.map( r => {
        
        $('#listRooms').append(`<li class="roomItem">${r[0]}</li>`)
    })
    console.log(rooms);
})

socket.on('server-send-socket-room', (socketRoom) => {
    $('#currentRoom').html(socketRoom)
})



socket.on('server-chat', (msg) => {
    console.log(msg);
    $('#listMsg').append(`<div class="msg">${msg}</div>`)
})

$(document).ready(() => {
    // $('#loginForm').hide();
    // $('#chatForm').hide();


    // $('#btnRegister').click(function () {
    //     socket.emit('client-send-username', $('#txtUsername').val())
    // });

    // $('#btnLogout').click(function () {
    //     socket.emit('client-send-logout')
       
    //     $('#chatForm').hide(2000);
    //     $('#loginForm').show(1000);
    //     $('#txtUsername').val('')
    // });

    // $('#btnSend').click(function (e) { 
    //     e.preventDefault();
    //     console.log($('#txtMsg').val());
    //     socket.emit('user-send-msg', $('#txtMsg').val())
    //     $('#txtMsg').val('')
    // });

    // $('#txtMsg').focusin( () => {
    //     socket.emit('typing-text')
    // })

    // $('#txtMsg').focusout( () => {
    //     socket.emit('stop-typing-text')
    // })


    // Create room
    $('#btnRoom').click(function () { 
        socket.emit('create-room', $('#txtRoom').val() )
        
    });

    $('#btnSend').click(function () { 
        socket.emit('user-chat-in-room', $('#txtMsg').val() )
        
    });


    // chat


})