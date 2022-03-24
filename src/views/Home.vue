<template>
  <div class="home">
    <GameBox />
    <FriendBox />
  </div>
</template>

<script>
import FriendBox from "./FriendBox.vue";
import GameBox from "./GameBox.vue";
export default {
  components: {
    FriendBox, GameBox
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

  .friend-box {
    width: max(200px, 20%);
    float: right;
    height: 100vh;
  }

  .game-box {
    flex-grow: 1;
    margin: 100px;
  }
}
</style>
