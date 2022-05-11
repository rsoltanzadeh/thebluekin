<template>
  <div class="friend-box">
    <div v-if="!connected" class="disconnect-wrapper">
      <p>
        Connection closed:<br /><span>{{ closeReason }}</span>
      </p>
      <!-- <Roller /> -->
      <button @click="reconnect">Reconnect</button>
    </div>

    <div v-if="connected" class="wrapper">
      <ul class="friend-list">
        <li class="online-title"><p>Online</p></li>
        <li
          @click="openChat(onlineFriend)"
          v-for="(onlineFriend, index) in onlineFriends"
          class="online"
          :key="index"
        >
          <div class="friend-name">
            <span
              :class="{ unread: $store.state.unreadChats.has(onlineFriend) }"
              class="unread-message-icon"
            >
              🖄
            </span>
            <p>{{ onlineFriend }}</p>
          </div>
          <button class="friend-menu">⋮</button>
        </li>
        <li class="offline-title"><p>Offline</p></li>
        <li
          @click="openChat(offlineFriend)"
          v-for="(offlineFriend, index) in offlineFriends"
          class="offline"
          :key="index"
        >
          <div class="friend-name">
            <span
              :class="{ unread: $store.state.unreadChats.has(offlineFriend) }"
              class="unread-message-icon"
            >
              🖄
            </span>
            <p>{{ offlineFriend }}</p>
          </div>
          <button class="friend-menu">⋮</button>
        </li>
      </ul>

      <div v-if="notificationsOpened" class="notification-window">
        <ul class="notifications">
          <li
            v-for="(friendRequest, index) in friendRequests"
            :key="index"
            class="friend-request"
          >
            <p>
              Friend request from <span>"{{ friendRequest }}"</span>
            </p>
            <div class="button-wrapper">
              <button @click="addFriend(friendRequest)" class="accept">
                ✓
              </button>
              <button
                @click="dismissFriendRequest(friendRequest)"
                class="decline"
              >
                ✕
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="currentChatFriend && !notificationsOpened" class="chat-window">
        <div class="chat-window-header">
          <button style="visibility: hidden">✕</button>
          <span class="friend-name">{{ currentChatFriend }}</span>
          <button @click="closeChat">✕</button>
        </div>
        <div class="messages-wrapper">
          <ul class="messages">
            <li
              v-for="(item, index) in currentChatHistory"
              :key="index"
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
        </div>
        <hr />
        <div class="message-box">
          <input
            @keyup.enter="sendMessage(currentChatFriend, $event)"
            type="text"
            placeholder="Type a message."
          />
        </div>
      </div>

      <div class="footer">
        <button
          style="visibility: hidden"
          :data-badge="friendRequests.length"
          class="notification-button"
        >
          🔔
        </button>
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
        <div class="notification-button-wrapper">
          <button
            :data-badge="friendRequests.length"
            class="notification-button"
            @click="notificationsOpened = !notificationsOpened"
          >
            🔔
          </button>
        </div>
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
      currentChatFriend: null,
      notificationsOpened: false,
    };
  },

  computed: {
    friendRequests() {
      return this.$store.state.friendRequests;
    },

    onlineFriends() {
      return this.$store.getters.onlineFriends;
    },

    offlineFriends() {
      return this.$store.getters.offlineFriends;
    },

    messageTypes() {
      return this.$store.state.chatMessageTypes;
    },

    currentChatHistory() {
      return this.$store.state.chatHistory[this.currentChatFriend];
    },

    lastCurrentChatMessage() {
      if (!this.currentChatHistory) return;
      return this.currentChatHistory[this.currentChatHistory.length - 1];
    },

    connected() {
      return this.$store.state.chatConnected;
    },

    closeReason() {
      return this.$store.state.chatCloseReason;
    },
  },

  watch: {
    lastCurrentChatMessage() {
      this.$store.state.unreadChats.delete(this.currentChatFriend);
      console.log("Deleted notification.");
    },
  },

  methods: {
    reconnect() {
      this.$store.dispatch("setupChatServerConn");
    },

    openChat(friendName) {
      this.currentChatFriend = friendName;
    },

    closeChat() {
      this.currentChatFriend = null;
    },

    addFriend(friendName) {
      const obj = this;
      this.$store.dispatch(
        "sendChatMessage",
        JSON.stringify({
          type: obj.messageTypes.ADD_FRIEND,
          payload: friendName,
        })
      );
    },

    dismissFriendRequest(name) {
      const obj = this;
      this.$store.dispatch(
        "sendChatMessage",
        JSON.stringify({
          type: obj.messageTypes.DISMISS_FRIEND_REQUEST,
          payload: name,
        })
      );
    },

    addFoe(foeName) {
      const obj = this;
      this.$store.dispatch(
        "sendChatMessage",
        JSON.stringify({
          type: obj.messageTypes.ADD_FOE,
          payload: foeName,
        })
      );
    },

    sendMessage(recipient, inputEvent) {
      const obj = this;
      this.$store.dispatch(
        "sendChatMessage",
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
    this.reconnect();
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

div.friend-box {
  padding-top: 1rem;
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

    span {
      color: $primary-medium;
    }
  }

  button {
    padding: 0.7rem 1rem;
    margin-top: 2rem;
    background-color: $primary-cta-medium;
    border: 1px solid $primary-cta-medium;
    color: $primary-dark;
    border-radius: 2rem;
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
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}

ul.friend-list {
  font-size: 0.8em;
  background-color: $primary-dark;
  flex-grow: 1;
  flex-basis: 0;
  overflow-y: auto;
  overflow-x: hidden;

  hr {
    margin: 1rem 0;
  }

  li.online-title,
  li.offline-title {
    text-align: center;
  }

  li.online-title {
    color: $primary-cta-medium;
  }

  li.offline-title {
    border-top: 1px solid $primary-medium;
    padding-top: 1rem;
    margin-top: 1rem;
    color: gray;
  }

  li.online,
  li.offline {
    width: 100%;
    padding: 0 1rem;
    cursor: pointer;
    border-left: 3px solid $primary-dark;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      border-color: $primary-medium;
      transition: background-color 0.5s;
    }

    div.friend-name {
      display: flex;
      align-items: center;

      span {
        padding-top: 0.5rem;
        color: $primary-light;
        margin-right: 3rem;
      }

      p {
        padding: 0;
        display: inline;
      }

      span.unread-message-icon {
        margin: 0;
        padding: 0;
        visibility: hidden;

        &.unread {
          visibility: initial;
        }
      }
    }

    button.friend-menu {
      background: none;
      border: none;
      color: $primary-light;
      font-size: 1.2em;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 1rem;
      padding: 0.5rem;

      &:hover {
        border-color: $primary-light;
      }
    }
  }

  li.online {
    color: white;
  }

  li.offline {
    color: gray;
  }
}

div.notification-window {
  display: flex;
  flex-direction: column;
  background-color: $primary-dark;
  border: 1px solid $primary-medium;
  border-radius: 1rem 1rem 0 0;
  height: 40%;
  width: 100%;
  margin: auto;

  li {
    padding: 0px 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    p > span {
      color: $primary-light;
    }

    div.button-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        cursor: pointer;
        background: transparent;
        border: none;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        padding: 10px;
        transition: all 0.3s;

        &:hover {
          border-bottom-color: $primary-cta-medium;
        }

        &.accept {
          color: $primary-cta-medium;
        }

        &.decline {
          color: red;
        }
      }
    }
  }
}

div.chat-window {
  display: flex;
  flex-direction: column;
  background-color: $primary-dark;
  height: 40%;

  div.chat-window-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted $primary-light;

    span.friend-name {
      display: inline-block;
      text-align: center;
      margin: auto;
    }

    button {
      cursor: pointer;
      background: transparent;
      border: none;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      padding: 0.5rem;
      margin-right: 1rem;
      transition: all 0.3s;
      color: red;

      &:hover {
        border-bottom-color: $primary-cta-medium;
      }
    }
  }
  div.messages-wrapper {
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;

    ul.messages {
      display: flex;
      flex-direction: column;

      flex-basis: 0;

      flex-grow: 1;

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
  }
  div.message-box {
    margin: 0.5em auto;
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      width: 15rem;
      max-width: 100%;
      background-color: $primary-medium;
      border: 1px solid $primary-dark;
      padding: 0.3rem;
      border-radius: 1rem;
      color: $primary-dark;
      outline: none;

      &:focus {
        outline: 2px solid $primary-cta-light;
        border-color: transparent;
      }
    }
  }
}

div.footer {
  font-size: 0.75em;
  padding: 0.5em 2em;
  width: 100%;
  border-top: 1px solid $primary-medium;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.friend-buttons {
    display: flex;
    align-items: center;
    background-color: $primary-dark;

    & button {
      font-size: 0.9em;
      cursor: pointer;
      padding: 0.7em;
      margin: 0 1em;
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

  button.notification-button {
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: 1em;
    text-align: center;
    position: relative;

    &:after {
      position: absolute;
      right: -1em;
      top: -1em;
      min-width: 1em;
      min-height: 1em;
      line-height: 1em;
      padding: 0.2em;
      color: $primary-cta-light;
      background-color: #bf1f1f;
      font-size: 0.8em;
      border-radius: 50%;
      content: attr(data-badge);
      border: solid 1px #c93a3a;
    }
  }
}
</style>
