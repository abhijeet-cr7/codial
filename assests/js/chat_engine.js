class ChatEngine{
    constructor(chatBoxId, userEmail)
    {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    
    this.socket = io.connect('http://localhost:5000');
    // io upar aaya hai script file se jo load kie hai socket ka home page par
    // ye upar connect ka request bhj raha hai chat_sockets mei ja se connection recieve ho raha hai aur niche firse usko connect kar rahe
    if( this.userEmail)    
    {
        this.connectionHandler();
    }
    }
  
   connectionHandler()
   {
   let self = this;
   this.socket.on('connect', function(){
       console.log('connection established using sockets...!');
       self.socket.emit('join_room', {
           user_email : self.userEmail,
           chatroom : 'codeial'
       });
    //    ye jaise hi emit hua upar fir ye chat socket mei recieve hua
       self.socket.on('user_joined', function(data)
       {
           console.log('a user joined!', data);
       })
    });
    //    CHANGE send a message on clicking the send message button
    $('#send-message').click(function(){
        let msg = $('#chat-message-input').val();
        if(msg != '')
        {
        self.socket.emit('send_message', {
            message : msg,
            user_email : self.userEmail,
            chatroom : 'codeial'
        });
        }
    });
    self.socket.on('recieve_message', function(data){
        console.log('message recieved', data.message);

        let newMessage = $('<li>');
        let messageType = 'other-message';
        // ye upar bas ye batane ke lie hai ki konsa message hai mera ya kisi aur ka
        if(data.user_email == self.userEmail)
        {
            messageType = 'self-message';
        }
        newMessage.append($('<span>', {
            'html' : data.message
        }));
        newMessage.append($('<sub>', {
            'html' : data.user_email
        }));
        newMessage.addClass(messageType);
        $('#chat-messages-list').append(newMessage);
      })

     }
 }
