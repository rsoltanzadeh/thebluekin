<template>
  <div class="home">
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
  font-family: $main-font;
  background: transparent;
  height: 100vh;
  color: $primary-cta-light;

  .friend-box {
    width: max(200px, 20%);
    float: right;
    height: 100vh;
  }
}
</style>
