import { createStore } from 'vuex'

export default createStore({
	state: {
		chatMessageTypes: {
			AUTHENTICATOR: 0,
			MESSAGE: 1,
			ADD_FRIEND: 2,
			ADD_FOE: 3,
			REMOVE_FRIEND: 4,
			REMOVE_FOE: 5
		},
		chatResponseTypes: {
			AUTHENTICATED: 0,
			MESSAGE: 1,
			FRIENDS: 2,
			FOES: 3,
			ONLINE_PEOPLE: 4,
			ERROR: 5
		},
		gameMessageTypes: {
			AUTHENTICATOR: 0,
			MOVE: 1
		},
		gameResponseTypes: {
			AUTHENTICATED: 0,
			PLAYERS: 1,
			ERROR: 2
		},
		username: localStorage.getItem('username'),
		chatServerConn: null,
		chatConnected: false,
		chatCloseReason: null,
		gameServerConn: null,
		gameConnected: false,
		gameCloseReason: null,
		friends: [],
		foes: [],
		onlinePeople: [],
		chatHistory: {},
		players: {}
	},
	mutations: {
		setChatCloseReason(state, text) {
			state.chatCloseReason = text;
		},

		setChatConnected(state, bool) {
			state.chatConnected = bool;
		},

		setChatServerConn(state, wsObject) {
			state.chatServerConn = wsObject;
		},
		setGameCloseReason(state, text) {
			state.gameCloseReason = text;
		},

		setGameConnected(state, bool) {
			state.gameConnected = bool;
		},

		setGameServerConn(state, wsObject) {
			state.gameServerConn = wsObject;
		},

		setFriends(state, friends) {
			state.friends = friends;
		},

		setFoes(state, foes) {
			state.foes = foes;
		},

		setOnlinePeople(state, onlinePeople) {
			state.onlinePeople = onlinePeople.sort((a, b) => a.localeCompare(b));
		},

		setPlayers(state, players) {
			state.players = players;
		},

		addMessage(state, payloadObject) {
			let singleChatHistory = state.chatHistory[payloadObject.windowName];
			if (!singleChatHistory) {
				singleChatHistory = [];
			}
			singleChatHistory.push({
				"timestamp": payloadObject.timestamp,
				"message": payloadObject.message,
				"author": payloadObject.author
			});
			state.chatHistory[payloadObject.windowName] = singleChatHistory;
		}
	},
	actions: {
		async setupChatServerConn(context) {
			if (context.state.chatServerConn) {
				context.commit('setChatConnected', true);

				setInterval(() => {
					if (context.state.chatServerConn && context.state.chatServerConn.readyState == 1) {
						context.commit('setChatConnected', true);
					} else {
						context.commit('setChatConnected', false);
					}
				}, 10000 + 1000);
				console.log("Already connected to chat server. Skipping setup.");
				return;
			}
			const response = await fetch("/api/get-chat-jwt");
			const jwt = await response.text();
			console.log(`Received JWT: ${jwt}`);
			const wsConn = new WebSocket("ws://localhost/chat");
			wsConn.onopen = function (e) {
				wsConn.send(JSON.stringify({
					"type": context.state.chatMessageTypes.AUTHENTICATOR,
					"payload": jwt
				}));
			};

			wsConn.onmessage = function (e) {
				console.log("Chat connection: onmessage: " + e.data);
				const message = JSON.parse(e.data);
				switch (message.type) {
					case context.state.chatResponseTypes.AUTHENTICATED:
						break;
					case context.state.chatResponseTypes.MESSAGE:
						let d = new Date();
						let timestamp = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0');
						context.commit('addMessage', {
							"timestamp": timestamp,
							"author": message.payload.author,
							"message": message.payload.text,
							"windowName": message.payload.windowName
						});
						break;
					case context.state.chatResponseTypes.FRIENDS:
						context.commit('setFriends', message.payload);
						break;
					case context.state.chatResponseTypes.FOES:
						context.commit('setFoes', message.payload);
						break;
					case context.state.chatResponseTypes.ONLINE_PEOPLE:
						context.commit('setOnlinePeople', message.payload);
						break;
					case context.state.chatResponseTypes.ERROR:
						console.log("Error: " + message.payload);
						break;
					default:
						wsConn.close(3001, "Received payload of invalid type: " + message.type);
				}
			};

			wsConn.onclose = function (e) {
				console.log(`Chat connection: onclose. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setChatServerConn', null);
				context.commit('setChatConnected', false);
				context.commit('setChatCloseReason', e.reason);
			};

			wsConn.onerror = function (e) {
				console.log(`Chat connection: onerror. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setChatServerConn', null);
				context.commit('setChatConnected', false);
				context.commit('setChatCloseReason', e.reason);
			};

			context.commit('setChatServerConn', wsConn);
			context.commit('setChatConnected', true);

			setInterval(() => {
				if (context.state.chatServerConn && context.state.chatServerConn.readyState == 1) {
					context.commit('setChatConnected', true);
				} else {
					context.commit('setChatConnected', false);
				}
			}, 10000 + 1000);
		},

		async setupGameServerConn(context) {
			if (context.state.gameServerConn) {
				context.commit('setGameConnected', true);

				setInterval(() => {
					if (context.state.gameServerConn && context.state.gameServerConn.readyState == 1) {
						context.commit('setGameConnected', true);
					} else {
						context.commit('setGameConnected', false);
					}
				}, 10000 + 1000);
				console.log("Already connected to game server. Skipping setup.");
				return;
			}
			const response = await fetch("/api/get-game-jwt");
			const jwt = await response.text();
			console.log(`Received JWT: ${jwt}`);
			const wsConn = new WebSocket("ws://localhost/game");
			wsConn.onopen = function (e) {
				wsConn.send(JSON.stringify({
					"type": context.state.gameMessageTypes.AUTHENTICATOR,
					"payload": jwt
				}));
			};

			wsConn.onmessage = function (e) {
				console.log("Game connection: onmessage: " + e.data);
				const message = JSON.parse(e.data);
				switch (message.type) {
					case context.state.gameResponseTypes.AUTHENTICATED:
						break;
					case context.state.gameResponseTypes.PLAYERS:
						context.commit('setPlayers', message.payload);
						break;
					case context.state.gameResponseTypes.ERROR:
						console.log("Error: " + message.payload);
						break;
					default:
						wsConn.close(3001, "Received payload of invalid type: " + message.type);
				}
			};

			wsConn.onclose = function (e) {
				console.log(`Game connection: onclose. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setGameServerConn', null);
				context.commit('setGameConnected', false);
				context.commit('setGameCloseReason', e.reason);
			};

			wsConn.onerror = function (e) {
				console.log(`Game connection onerror. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setGameServerConn', null);
				context.commit('setGameConnected', false);
				context.commit('setGameCloseReason', e.reason);
			};

			context.commit('setGameServerConn', wsConn);
			context.commit('setGameConnected', true);

			setInterval(() => {
				if (context.state.gameServerConn && context.state.gameServerConn.readyState == 1) {
					context.commit('setGameConnected', true);
				} else {
					context.commit('setGameConnected', false);
				}
			}, 10000 + 1000);
		},

		send(context, JSON) {
			if (context.state.gameServerConn) {
				context.state.gameServerConn.send(JSON);
			}
		},

		async checkAuthentication(context) {
			const response = await fetch('/api/check-auth');
			const loggedIn = await response.json();
			return loggedIn;
		}
	},
	getters: {
		onlineFriends(state) {
			return state.friends.filter(friend => state.onlinePeople.includes(friend));
		},

		offlineFriends(state) {
			return state.friends.filter(friend => !state.onlinePeople.includes(friend));
		}
	},
	modules: {
	}
})
