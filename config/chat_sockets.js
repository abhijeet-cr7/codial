module.exports.chatSockets = function(socketServer)
{
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket)
    {
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
    // jaise hi front end mei recieve hua data uaha aaya fir
    socket.on('join_room', function(data)
    {
    console.log('joining request recieved', data);
    
    socket.join(data.chatroom);
    // ye upar kya krega ki usi chatroom mei user jo dal dega ya fir nahi hai to naya bana dega user
    io.in(data.chatroom).emit('user_joined',data);
    // while we wanna emit in a specific chatroom we need to put in io
    });
    //  CHANGE :: detect send_message and broadcast to evryone in the room 
    socket.on('send_message', function(data){
        io.in(data.chatroom).emit('recieve_message', data);
    });
 });   
}