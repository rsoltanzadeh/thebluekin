<template>
  <div class="friends">
    <ul class="friend-list">
      <li v-for="onlineFriend in onlineFriends" class="online">
        <p>{{ onlineFriend }}</p>
      </li>
      <li v-for="offlineFriend in offlineFriends" class="offline">
        <p>{{ offlineFriend }}</p>
      </li>
    </ul>

    <div v-if="currentChatFriend" class="chat-window">
      <div class="history-box">
        <p>{{ currentChatFriend }}</p>
        <ul class="messages">
          <li v-for="item in chatHistory[currentChatFriend]">
            <p>
              <span> {{ item.timestamp }} </span>
              {{ item.message }}
            </p>
          </li>
        </ul>
      </div>
      <div class="message-box">
        <input
          @keyup.enter="sendMessage(author, $event)"
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
        startTransition
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
</template>

<script>
import Prompt from "./Prompt.vue";
export default {
  components: {
    Prompt,
  },

  data() {
    return {
      addFriendVisible: false,
      addFoeVisible: false,
      currentChatFriend: null,
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
  },

  methods: {
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

div.friends {
  width: 20%;
  float: right;
  height: 100vh;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
}
ul.friend-list {
  background-color: yellow;
  flex-grow: 1;
  overflow-y: scroll;
}

ul.chat-window {
  background-color: red;
  height: 30%;
}

div.friend-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 5%;
  background-color: blue;

  & button {
    cursor: pointer;
    width: 35%;
    height: 70%;
  }
}
</style>
