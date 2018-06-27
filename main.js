const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
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
		//Ví dụ nếu mình set message.body = /Jarvis thì bot sẽ print api.sendMessage = Send bobs n vegena... 
		else if(message.body === "/Jarvis"||message.body==="/jarvis") { 
			console.log("FB.com/" + message.threadID + ' - Message: '+message.body);
			api.sendMessage("Send bobs n vegena. \nEnter /NotFemale if u dont have bobs n vegena", message.threadID); 
			api.sendMessage("Please read the following sentence to activate Jarvis", message.threadID);
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
