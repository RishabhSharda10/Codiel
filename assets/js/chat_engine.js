class ChatEngine {

    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://100.26.53.37:5000');
   
   if (this.userEmail){this.connectionHandler();}
        }     

    connectionHandler(){

        let self = this;

        this.socket.on('connect',function(){
         console.log('Connection established using sockets....');
      
        self.socket.emit('join_room',{

            user_email: self.userEmail,
            chatroom:'codiel'
        });
      
        self.socket.on('user_joined',function(data){
            console.log('a user joined',data);  

        });

        });

        $('#send-message').click(function(){

        let msg = $('#chat-message-input').val();

            if (msg != ""){
                self.socket.emit('send_message',{

                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codiel'
            });
            }



        });

        self.socket.on('received_message',function(data){
            console.log('message receieved',data.message);  

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){

                messageType = 'self-message';
            }

           newMessage.append($('<span>',{
               'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
             }));
 
             newMessage.addClass(messageType);
             $('#chat-messages-list').append(newMessage);
 
        });

        


    }


}