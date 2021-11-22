import { createStore } from 'vuex'

export default createStore({
    state: {
	NORMAL_MESSAGE: {
	    GET_ROOMS : "get-rooms",
	    CREATE_ROOM : "create-room",
	    JOIN_ROOM : "join-room",
	    LEAVE_ROOM : "leave-room",
	    ADD_ROLE : "add-role",
	    REMOVE_ROLE : "remove-role",
	    START_GAME : "start-game",
	    MESSAGE : "message",
	    AUTHENTICATOR : "authenticator"
	},

	NORMAL_RESPONSE: {
	    JOINED_ROOM : "joined-room",
	    LEFT_ROOM : "left-room",
	    USER_JOINED_ROOM : "user-joined-room",
	    USER_LEFT_ROOM : "user-left-room",
	    ROOMS : "rooms",
	    CHOSEN_ROLES : "chosen-roles",
	    ROLES : "roles",
	    AUTHENTICATED : "authenticated",
	    MESSAGE : "message",
	    HOST : "host",
	    GAME_TOKEN : "game-token"
	},

	chatServerConn: {},

	chatWindows: []
    },
    mutations: {
	setChatServerConn(state, wsObject) {
	    state.chatServerConn = wsObject;
	},

	addMessage(state, payloadObject) {
	    let chatWindow = {
		"name": payloadObject.author,
		"messages": []
	    };
	    
	    state.chatWindows.forEach(function(element, index) {
		if(element.name == payloadObject.author) {
		    chatWindow = element;
		    state.chatWindows.splice(index, 1);
		}
	    });

	    chatWindow.push({
		"timestamp": payloadObject.timestamp,
		"message": payloadObject.message
	    });
	    state.chatWindows.push(chatWindow);
	}
    },
    actions: {
	async setupChatServerConn(context) {
	    try {
		let response = await fetch("/api/get_auth.php");
		const credentials = await JSON.parse(response.text());
		wsConn = new WebSocket("wss://thebluekin.com:8443/chat-server/chat");
		wsConn.onopen = function(e) {
		    wsConn.send(context.state.NORMAL_MESSAGE.AUTHENTICATOR + ":" + credentials.username);
		};
		wsconn.onmessage = function(e) {
		    console.log("onmessage: " + e.data);
		    let d = new Date();
		    let timestamp = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
		    if(e.data.startsWith(context.state.NORMAL_RESPONSE.MESSAGE)) {
			let payload = e.data.substring(context.state.NORMAL_RESPONSE.MESSAGE.length + 1);
			let author = payload.substring(0, payload.indexOf(':'));
			let message = payload.substring(payload.indexOf(':') + 1);
			context.commit('addMessage', {
				"timestamp": timestamp,
				"author": author,
				"message": message
			});
		    }
		};
		
		wsConn.onclose = function(e) {		
		    console.log("OnClose: " + e.reason);
		};

		wsConn.onerror = function(e) {
		    console.log("OnError: " + e.reason);
		};

		context.commit('setChatServerConn', wsConn);
	    } catch(e) {
		console.log(e);
	    }
	}
    },
    modules: {
    }
})
