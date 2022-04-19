<template>
  <div class="home">
    <router-link to="/play">
      <p class="play-button">Play</p>
    </router-link>
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

div.home {
  display: flex;
  justify-content: space-between;
  background: transparent;
  height: 100vh;
  color: $primary-cta-light;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-decoration: none;

    .play-button {
      margin: auto;
      display: block;
      padding: 30px 50px;
      font-size: 3em;
      color: $primary-cta-medium;
      border: 2px dashed $primary-cta-medium;
      border-radius: 20px;
      transition: all 0.2s;

      &:hover {
        color: $primary-dark;
        border-color: $primary-dark;
      }
    }
  }
  .friend-box {
    width: max(200px, 20%);
    float: right;
    height: 100vh;
  }
}
</style>
