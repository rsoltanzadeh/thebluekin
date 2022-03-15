import { createStore } from 'vuex'

export default createStore({
	state: {
		messageTypes: {
			AUTHENTICATOR: 0,
			MESSAGE: 1,
			ADD_FRIEND: 2,
			ADD_FOE: 3,
			REMOVE_FRIEND: 4,
			REMOVE_FOE: 5
		},
		responseTypes: {
			AUTHENTICATED: 0,
			MESSAGE: 1,
			FRIENDS: 2,
			FOES: 3,
			ONLINE_PEOPLE: 4,
			CHAT_HISTORY: 5,
			ERROR: 6
		},
		chatServerConn: null,
		friends: [],
		foes: [],
		onlinePeople: [],
		chatHistory: {}
	},
	mutations: {
		setChatServerConn(state, wsObject) {
			state.chatServerConn = wsObject;
		},

		setFriends(state, friends) {
			state.friends = friends;
		},

		setFoes(state, foes) {
			state.foes = foes;
		},

		setChatHistory(state, chatHistory) {
			state.chatHistory = chatHistory;
		},

		setOnlinePeople(state, onlinePeople) {
			state.onlinePeople = onlinePeople.sort((a, b) => a.localeCompare(b));
		},

		addMessage(state, payloadObject) {
			let singleChatHistory = state.chatHistory[payloadObject.author];
			if(!singleChatHistory) {
				singleChatHistory = [];
			}
			singleChatHistory.push({
				"timestamp": payloadObject.timestamp,
				"message": payloadObject.message
			});
			state.chatHistory[payloadObject.author] = singleChatHistory;
		}
	},
	actions: {
		async setupChatServerConn(context) {
			if(context.state.chatServerConn) {
				console.log("Already connected. Skipping setup.");
				return;
			}

			try {
				const jwt = await fetch("/api/get-chat-jwt");
				const wsConn = new WebSocket("wss://thebluekin.com/chat");
				wsConn.onopen = function (e) {
					wsConn.send(JSON.stringify({
						"type": context.state.messageTypes.AUTHENTICATOR,
						"payload": jwt
					}));
				};
				wsConn.onmessage = function (e) {
					console.log("onmessage: " + e.data);
					const message = JSON.parse(e.data);
					switch (message.type) {
						case responseTypes.AUTHENTICATED:
							break;
						case responseTypes.MESSAGE:
							let d = new Date();
							let timestamp = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
							context.commit('addMessage', {
								"timestamp": timestamp,
								"author": message.payload.author,
								"message": message.payload.text
							});
							break;
						case responseTypes.FRIENDS:
							context.commit('setFriends', message.payload);
							break;
						case responseTypes.FOES:
							context.commit('setFoes', message.payload);
							break;
						case responseTypes.CHAT_HISTORY:
							context.commit('setChatHistory', message.payload);
							break;
						case responseTypes.ONLINE_PEOPLE:
							context.commit('setOnlinePeople', message.payload);
							break;
						case responseTypes.ERROR:
							console.log("Error: " + message.payload);
							break;
						default:
							wsConn.close(1008, "Received payload of invalid type: " + message.type);
					}
				};

				wsConn.onclose = function (e) {
					console.log(`OnClose. Reason: ${e.reason} | Data: ${e.data}`);
					context.commit('setChatServerConn', null);
				};

				wsConn.onerror = function (e) {
					console.log(`OnError. Reason: ${e.reason} | Data: ${e.data}`);
					context.commit('setChatServerConn', null);
				};

				context.commit('setChatServerConn', wsConn);
			} catch (e) {
				console.log(e);
			}
		}, 

		send(context, JSON) {
			if(context.state.chatServerConn) {
				context.state.chatServerConn.send(JSON);
			}
		}
	},
	getters: {
		onlineFriends(state) {
			return state.friends.filter(friend => onlinePeople.includes(friend));
		},

		offlineFriends(state) {
			return state.friends.filter(friend => !onlinePeople.includes(friend));
		}
	},
	modules: {
	}
})
