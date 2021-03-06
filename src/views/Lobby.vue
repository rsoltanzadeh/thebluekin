<template>
  <div class="lobby">
    <main-header :links="links" />
    <div class="wrapper">
      <div class="lobby-header">
        <button @click="leaveRoom" v-if="inRoom">Leave Room</button>
        <button @click="leaveRoom" v-if="inRoom">Start Game</button>
        <button @click="createRoom" v-if="!inRoom">Create Room</button>
      </div>
      <div class="main-wrapper">
        <ul class="room-list">
          <li>
            <p>Room list:</p>
          </li>
          <li
            @click="joinRoom(room)"
            v-for="(room, index) in rooms"
            :key="index"
            class="room-list-item"
          >
            <p>{{ room }}</p>
          </li>
        </ul>
        <div v-if="inRoom" class="room">
          <div class="chat-wrapper">
            <div class="message-box">
              <input
                @keyup.enter="sendMessage($event)"
                type="text"
                placeholder="Type a message."
              />
            </div>
            <ul class="chat-history">
              <li v-for="(item, index) in room.chatHistory" :key="index">
                <p>
                  <span class="timestamp">({{ item.timestamp }})</span>
                  <span class="author"
                    >{{ item.author == "" ? "" : " " + item.author }}:
                  </span>
                  <span class="message">{{ item.text }}</span>
                </p>
              </li>
            </ul>
          </div>
          <ul class="player-list">
            <li style="text-align: center">
              <p>Players:</p>
            </li>
            <li v-for="(user, index) in room.users" :key="index" class="player">
              <p>{{ user }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="{ visible: showFriendBox }" class="friend-box-wrapper">
      <button
        @click="toggleFriendBox"
        :class="{ visible: showFriendBox }"
        class="friend-box-icon"
      >
        {{ friendBoxIconContent }}
      </button>
      <FriendBox />
    </div>
  </div>
</template>

<script>
import FriendBox from "./FriendBox.vue";
import MainHeader from "./MainHeader.vue";
export default {
  components: {
    FriendBox,
    MainHeader,
  },

  data() {
    return {
      showFriendBox: false,
      links: [
        {
          name: "Home",
          url: "/home",
        },
        {
          name: "Log out",
          url: "/logout",
        },
      ],
    };
  },

  computed: {
    friendBoxIconContent() {
      if (this.showFriendBox) {
        return "➤";
      } else {
        return "➤";
      }
    },

    inRoom() {
      return Object.keys(this.room).length > 0;
    },

    rooms() {
      return this.$store.state.lobbyRooms;
    },

    room() {
      return this.$store.state.lobbyRoom;
    },

    messageTypes() {
      return this.$store.state.lobbyMessageTypes;
    },
  },

  methods: {
    toggleFriendBox() {
      this.showFriendBox = !this.showFriendBox;
    },

    reconnect() {
      this.$store.dispatch("setupLobbyServerConn");
    },

    createRoom() {
      const obj = this;
      this.$store.dispatch(
        "sendLobbyMessage",
        JSON.stringify({
          type: obj.messageTypes.CREATE_ROOM,
        })
      );
    },

    leaveRoom() {
      const obj = this;
      this.$store.dispatch(
        "sendLobbyMessage",
        JSON.stringify({
          type: obj.messageTypes.LEAVE_ROOM,
        })
      );
    },

    joinRoom(roomId) {
      const obj = this;
      this.$store.dispatch(
        "sendLobbyMessage",
        JSON.stringify({
          type: obj.messageTypes.JOIN_ROOM,
          payload: roomId,
        })
      );
    },
    sendMessage(inputEvent) {
      const obj = this;
      this.$store.dispatch(
        "sendLobbyMessage",
        JSON.stringify({
          type: obj.messageTypes.MESSAGE,
          payload: inputEvent.target.value,
        })
      );
      inputEvent.target.value = "";
    },
  },

  beforeMount() {
    this.reconnect();
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

div.lobby {
  min-height: 100vh;
  
  div.friend-box-wrapper {
    z-index: 2;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    transform: translateX(min(25rem, 100vw));
    transition: all 0.6s ease-in-out;
    pointer-events: none;

    &.visible {
      transform: translateX(0);
    }

    .friend-box-icon {
      margin: 0;
      z-index: 1;
      cursor: pointer;
      background: none;
      border: none;
      padding: 1rem 2rem;
      font-size: 2rem;
      color: $primary-cta-light;
      align-self: flex-end;
      transition: all 0.6s linear;
      pointer-events: auto;
      transform: rotate(180deg);

      &.visible {
        transform: rotate(0deg);
      }
    }

    .friend-box {
      width: min(25rem, 100vw);
      height: 100vh;
      pointer-events: auto;
    }
  }

  div.wrapper {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 1fr 9fr;
    background: transparent;
    color: $primary-cta-light;

    div.lobby-header {
      grid-area: 1 / 1 / 2 / 3;
      padding: 1rem;
      display: flex;
      justify-content: center;

      button {
        cursor: pointer;
        padding: 1rem;
        margin: 0 1rem;
        background: $primary-dark;
        border: 1px solid $primary-cta-light;
        border-radius: 1rem;
        color: $primary-cta-light;
        transition: all 0.3s;
        white-space: nowrap;

        &:hover {
          border-color: transparent;
          color: $primary-dark;
          background: $primary-cta-light;
        }
      }
    }

    div.main-wrapper {
      grid-area: 2 / 1 / 3 / 2;
      display: flex;
      flex-direction: row;

      .room-list {
        list-style-type: none;
        margin: 0px 20px;
        width: 200px;
        text-align: center;

        li.room-list-item {
          border: 1px solid $primary-cta-medium;
          border-radius: 10px;
          margin-top: 10px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;

          &:hover {
            background-color: $primary-dark;
          }
        }
      }

      .room {
        margin: 20px 50px;
        border: 1px solid $primary-light;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        flex-grow: 1;

        div.chat-wrapper {
          height: 100%;
          width: 70%;
          display: flex;
          flex-direction: column-reverse;

          .chat-history {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            padding-left: 10px;

            flex-basis: 0;

            flex-grow: 1;

            li {
              color: white;
              text-align: left;
              word-wrap: break-word;

              span.author {
                color: $primary-cta-medium;
              }

              span.timestamp {
                font-size: 0.8em;
              }
            }
          }

          .message-box {
            margin-bottom: 10px;
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: center;

            input {
              width: 90%;
              background-color: $primary-medium;
              border: 1px solid $primary-light;
              padding: 5px;
              border-radius: 10px;
              color: white;
              outline: none;
            }
          }
        }

        .player-list {
          list-style-type: none;
          height: 100%;
          border-left: 1px solid $primary-medium;
          flex-grow: 1;

          .player {
            padding: 10px;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

@media (max-width: 40rem) {
  div.lobby {
    div.friend-box-wrapper {
      flex-direction: column;
      transform: translateY(90vh);

      &.visible {
        transform: translateY(0);
      }

      .friend-box-icon {
        padding: 1rem 2rem;
        transform: rotate(-90deg);

        &.visible {
          transform: rotate(450deg);
          color: $primary-dark;
          -webkit-text-stroke: 2px $primary-cta-light;
        }
      }

      .friend-box {
        height: 90vh;
      }
    }
  }
}
</style>
