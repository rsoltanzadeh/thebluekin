import { createStore } from 'vuex'

//const websocket_url = "wss://thebluekin.com";
const websocket_url = "ws://localhost";

export default createStore({
	state: {
		chatMessageTypes: {
			AUTHENTICATOR: 0,
			MESSAGE: 1,
			ADD_FRIEND: 2,
			ADD_FOE: 3,
			REMOVE_FRIEND: 4,
			REMOVE_FOE: 5,
			DISMISS_FRIEND_REQUEST: 6
		},
		chatResponseTypes: {
			AUTHENTICATED: 0,
			MESSAGE: 1,
			FRIENDS: 2,
			FOES: 3,
			ONLINE_PEOPLE: 4,
			ERROR: 5,
			FRIEND_REQUESTS: 6
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
		lobbyMessageTypes: {
			AUTHENTICATOR: 0,
			MESSAGE: 1,
			LEAVE_ROOM: 2,
			CREATE_ROOM: 3,
			JOIN_ROOM: 4
		},
		lobbyResponseTypes: {
			AUTHENTICATED: 0,
			ERROR: 1,
			MESSAGE: 2,
			ROOM: 3,
			ROOMS: 4
		},

		username: localStorage.getItem('username'),
		chatServerConn: null,
		chatConnected: false,
		chatCloseReason: null,
		gameServerConn: null,
		gameConnected: false,
		gameCloseReason: null,
		lobbyServerConn: null,
		lobbyConnected: false,
		lobbyCloseReason: null,

		friendRequests: [],
		friends: [],
		foes: [],
		onlinePeople: [],
		chatHistory: {},
		unreadChats: new Set(),
		players: {},
		lobbyRoom: {},
		lobbyRooms: []
	},
	mutations: {
		addChatMessage(state, payloadObject) {
			let singleChatHistory = state.chatHistory[payloadObject.windowName];
			if (!singleChatHistory) {
				singleChatHistory = [];
			}
			singleChatHistory.push({
				"timestamp": payloadObject.timestamp,
				"message": payloadObject.message,
				"author": payloadObject.author,
				"read": payloadObject.read
			});
			state.chatHistory[payloadObject.windowName] = singleChatHistory;
			state.unreadChats.add(payloadObject.windowName);
		},

		setFriendRequests(state, array) {
			state.friendRequests = array;
		},

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

		setLobbyServerConn(state, wsObject) {
			state.lobbyServerConn = wsObject;
		},

		setLobbyConnected(state, bool) {
			state.lobbyConnected = bool;
		},

		setLobbyCloseReason(state, text) {
			state.lobbyCloseReason = text;
		},

		setLobbyRoom(state, room) {
			state.lobbyRoom = room;
		},

		setLobbyRooms(state, rooms) {
			state.lobbyRooms = rooms;
		},

		unreadMessagesCount(state, friendName) {
			let count = 0;
			state.chatHistory[friendName].forEach((message) => {
				if(!message.read) {
					count++;
				}
			});
			return count;
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
			const wsConn = new WebSocket(`${websocket_url}/chat`);
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
						context.commit('addChatMessage', {
							"timestamp": timestamp,
							"author": message.payload.author,
							"message": message.payload.text,
							"windowName": message.payload.windowName,
							"read": false
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
					case context.state.chatResponseTypes.FRIEND_REQUESTS:
						context.commit('setFriendRequests', message.payload);
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
			const wsConn = new WebSocket(`${websocket_url}/game`);
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
		async setupLobbyServerConn(context) {
			if (context.state.lobbyServerConn) {
				context.commit('setLobbyConnected', true);

				setInterval(() => {
					if (context.state.lobbyServerConn && context.state.lobbyServerConn.readyState == 1) {
						context.commit('setLobbyConnected', true);
					} else {
						context.commit('setLobbyConnected', false);
					}
				}, 10000 + 1000);
				console.log("Already connected to lobby server. Skipping setup.");
				return;
			}
			const response = await fetch("/api/get-lobby-jwt");
			const jwt = await response.text();
			console.log(`Received JWT: ${jwt}`);
			const wsConn = new WebSocket(`${websocket_url}/lobby`);
			wsConn.onopen = function (e) {
				wsConn.send(JSON.stringify({
					"type": context.state.lobbyMessageTypes.AUTHENTICATOR,
					"payload": jwt
				}));
			};

			wsConn.onmessage = function (e) {
				console.log("Lobby connection: onmessage: " + e.data);
				const message = JSON.parse(e.data);
				switch (message.type) {
					case context.state.lobbyResponseTypes.AUTHENTICATED:
						break;
					case context.state.lobbyResponseTypes.ROOMS:
						context.commit('setLobbyRooms', message.payload);
						break;
					case context.state.lobbyResponseTypes.ROOM:
						context.commit('setLobbyRoom', message.payload);
						break;
					case context.state.lobbyResponseTypes.ERROR:
						console.log("Error: " + message.payload);
						break;
					default:
						console.log("Received payload of invalid type: " + message.type);
				}
			};

			wsConn.onclose = function (e) {
				console.log(`Lobby connection: onclose. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setLobbyServerConn', null);
				context.commit('setLobbyConnected', false);
				context.commit('setLobbyCloseReason', e.reason);
			};

			wsConn.onerror = function (e) {
				console.log(`Lobby connection: onerror. Reason: ${e.reason} | Data: ${e.data}`);
				context.commit('setLobbyServerConn', null);
				context.commit('setLobbyConnected', false);
				context.commit('setLobbyCloseReason', e.reason);
			};

			context.commit('setLobbyServerConn', wsConn);
			context.commit('setLobbyConnected', true);

			setInterval(() => {
				if (context.state.lobbyServerConn && context.state.lobbyServerConn.readyState == 1) {
					context.commit('setLobbyConnected', true);
				} else {
					context.commit('setLobbyConnected', false);
				}
			}, 10000 + 1000);
		},

		sendLobbyMessage(context, JSON) {
			if (context.state.lobbyServerConn) {
				context.state.lobbyServerConn.send(JSON);
			}
		},

		sendGameMessage(context, JSON) {
			if (context.state.gameServerConn) {
				context.state.gameServerConn.send(JSON);
			}
		},

		sendChatMessage(context, JSON) {
			if (context.state.chatServerConn) {
				context.state.chatServerConn.send(JSON);
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
