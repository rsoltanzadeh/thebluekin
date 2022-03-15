<template>
  <div class="wrapper">
    <FriendBox />
  </div>
</template>

<script>
import FriendBox from "./FriendBox.vue";
export default {
  components: {
    FriendBox,
  },

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

div.wrapper {
  font-family: $main-font;
  background: linear-gradient(to top right, $primary-medium, $primary-dark);
  height: 100vh;
  color: $primary-cta-light;
}

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
