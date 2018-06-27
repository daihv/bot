const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "email", password: "password"}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent", listenEvents: true});
	api.listen(function callback(err, message)
	{		
		if(message.body==="/Getid"||message.body==="/getid"||message.body==="/get id"||message.body==="/Get id"||message.body==="/Get ID") {
			console.log("FB.com/" + message.threadID + ' - Message: '+message.body);
			api.sendMessage(message.senderID, message.threadID);
                        api.sendMessage("Your ID: ", message.threadID); 			
		} 
		else if(message.body === "<3") { 
			console.log("FB.com/" + message.threadID + ' - Message: '+message.body);
			api.sendMessage("Ok đợi 1 tý nhé!", message.threadID); 
			api.sendMessage("Ị xong phải rửa tay chứ! :D", message.threadID);
			return;
		}
		//message.body = tin nhắn bạn send cho bot
		else if (message.body){
			console.log("FB.com/" + message.threadID + ' - Message: '+message.body);
			api.sendMessage("\n \n:D Đây là Đại. \n- Đại hiện đang đi ỉa nên sẽ trả lời ngay khi Đại ỉa xong \n- Nếu muốn Đại ỉa nhanh hơn vui lòng thả <3. \n- Tin nhắn của bạn: " + message.body, message.threadID);
	        return;
		}
	});
});
