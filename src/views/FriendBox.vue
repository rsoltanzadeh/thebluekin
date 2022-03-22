<template>
  <div class="friend-box">
    <div v-if="!connected" class="disconnect-wrapper">
      <p>Connection closed:<br><span>{{ closeReason }}</span></p>
      <!-- <Roller /> -->
      <button @click="reconnect">Reconnect</button>
    </div>
    <div v-if="connected" class="wrapper">
      <ul class="friend-list">
        <li class="online-title"><p>Online</p></li>
        <li
          @click="openChat(onlineFriend)"
          v-for="onlineFriend in onlineFriends"
          class="online"
        >
          <p>{{ onlineFriend }}</p>
          <button class="friend-menu"></button>
        </li>
        <hr />
        <li class="offline-title"><p>Offline</p></li>
        <li v-for="offlineFriend in offlineFriends" class="offline">
          <p>{{ offlineFriend }}</p>
        </li>
      </ul>

      <div v-if="currentChatFriend" class="chat-window">
        <p class="friend-name">{{ currentChatFriend }}</p>
        <hr />
        <ul class="messages">
          <li
            v-for="item in chatHistory[currentChatFriend]"
            class="chat-message"
          >
            <p>
              <span class="timestamp">({{ item.timestamp }})</span>
              <span class="author"
                >{{ item.author == "" ? "" : " " + item.author }}:
              </span>
              <span class="message">{{ item.message }}</span>
            </p>
          </li>
        </ul>
        <hr />
        <div class="message-box">
          <input
            @keyup.enter="sendMessage(currentChatFriend, $event)"
            type="text"
            placeholder="Type a message."
          />
        </div>
      </div>
      <div class="friend-buttons">
        <prompt
          startTransition
          ref="friendPrompt"
          button-text="Add friend"
          hasTextInput
          :callback="addFriend"
        >
          <p>Enter the name of the user to add as friend.</p>
        </prompt>

        <prompt
          ref="foePrompt"
          button-text="Add foe"
          hasTextInput
          :callback="addFoe"
        >
          <p>Enter the name of the user to add as foe.</p>
        </prompt>
        <button @click="$refs.friendPrompt.activate">Add friend</button>
        <button @click="$refs.foePrompt.activate">Add foe</button>
      </div>
    </div>
  </div>
</template>

<script>
import Prompt from "./Prompt.vue";
import Roller from "./Roller.vue";
export default {
  components: {
    Prompt,
    Roller,
  },

  data() {
    return {
      addFriendVisible: false,
      addFoeVisible: false,
      currentChatFriend: null
    };
  },

  computed: {
    onlineFriends() {
      return this.$store.getters.onlineFriends;
    },

    offlineFriends() {
      return this.$store.getters.offlineFriends;
    },

    messageTypes() {
      return this.$store.state.messageTypes;
    },

    chatHistory() {
      return this.$store.state.chatHistory;
    },

    connected() {
      return this.$store.state.chatConnected;
    },

    closeReason() {
      return this.$store.state.chatCloseReason;
    }
  },

  methods: {
    reconnect() {
      this.$store.dispatch("setupChatServerConn");
    },

    openChat(friendName) {
      this.currentChatFriend = friendName;
    },

    addFriend(friendName) {
      const obj = this;
      this.$store.dispatch(
        "send",
        JSON.stringify({
          type: obj.messageTypes.ADD_FRIEND,
          payload: friendName,
        })
      );
    },

    addFoe(foeName) {
      const obj = this;
      this.$store.dispatch(
        "send",
        JSON.stringify({
          type: obj.messageTypes.ADD_FOE,
          payload: foeName,
        })
      );
    },

    sendMessage(recipient, inputEvent) {
      const obj = this;
      this.$store.dispatch(
        "send",
        JSON.stringify({
          type: obj.messageTypes.MESSAGE,
          payload: {
            text: inputEvent.target.value,
            recipient: recipient,
          },
        })
      );
      inputEvent.target.value = "";
    },
  },

  beforeMount() {
    this.$store.dispatch("setupChatServerConn");
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

ul {
  list-style-type: none;
}

div.friend-box {
  display: flex;
  background-color: $primary-dark;
}

div.disconnect-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  margin: auto;

  p {
    text-align: center;
    margin: 40px;
    
    span {
      color: $primary-medium;
    }
  }

  button {
    padding: 13px 20px;
    margin-top: 20px;
    background-color: $primary-cta-medium;
    border: 1px solid $primary-cta-medium;
    color: $primary-dark;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: transparent;
      color: $primary-cta-medium;
    }
  }
}

div.wrapper {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}

ul.friend-list {
  background-color: $primary-dark;
  flex-grow: 1;
  flex-basis: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid white;

  hr {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  li.online-title,
  li.offline-title {
    text-align: center;
  }

  li.online-title {
    color: $primary-cta-medium;
  }

  li.offline-title {
    color: gray;
  }

  li.online,
  li.offline {
    width: 100%;
    margin-left: 10px;
    padding: 10px;
    cursor: pointer;
    border-left: 3px solid $primary-dark;

    &:hover {
      border-color: $primary-medium;
      transition: background-color 0.5s;
    }
  }

  li.online {
    color: white;
  }

  li.offline {
    color: gray;
  }
}

div.chat-window {
  display: flex;
  flex-direction: column;
  background-color: $primary-dark;
  height: 40%;
  border: 1px solid white;

  p.friend-name {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  ul.messages {
    display: flex;
    flex-direction: column;
    padding-left: 10px;

    flex-basis: 0;

    flex-grow: 1;
    overflow-y: scroll;

    li.chat-message {
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

  div.message-box {
    margin-bottom: 10px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      width: 90%;
      background-color: $primary-medium;
      border: 1px solid $primary-dark;
      padding: 5px;
      border-radius: 10px;
      color: white;
      outline: none;
    }
  }
}

div.friend-buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-self: flex-end;
  height: max(50px, 5%);
  background-color: $primary-dark;

  & button {
    cursor: pointer;
    width: 35%;
    height: 70%;
    background: $primary-dark;
    border: 1px solid $primary-cta-light;
    border-radius: 15px;
    color: $primary-cta-light;
    transition: all 0.3s;

    &:hover {
      border-color: transparent;
      color: $primary-dark;
      background: $primary-cta-light;
    }
  }
}
</style>
