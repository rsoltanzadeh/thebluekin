<template>
  <div class="game-box">
    <div
      v-for="(coordinates, player, index) in players"
      :key="index"
      class="player"
      :style="{
        'grid-row-start': coordinates[1] + 1,
        'grid-row-end': coordinates[1] + 2,
        'grid-column-start': coordinates[0] + 1,
        'grid-column-end': coordinates[0] + 2,
      }"
      :class="{ self: $store.state.username == player }"
    >
      <p>{{ player }}</p>
    </div>
  </div>
</template>

<script>
import Roller from "./Roller.vue";
export default {
  components: {
    Roller,
  },

  computed: {
    players() {
      console.log("Players: " + JSON.stringify(this.$store.state.players));
      return this.$store.state.players;
    },

    messageTypes() {
      return this.$store.state.gameMessageTypes;
    },
  },

  methods: {
    reconnect() {
      this.$store.dispatch("setupGameServerConn");
    },

    move(event) {
      let direction;
      switch (event.which) {
        case 37:
          direction = "LEFT";
          break;
        case 38:
          direction = "UP";
          break;
        case 39:
          direction = "RIGHT";
          break;
        case 40:
          direction = "DOWN";
          break;
        default:
          return;
      }
      const obj = this;
      this.$store.dispatch(
        "send",
        JSON.stringify({
          type: obj.messageTypes.MOVE,
          payload: direction,
        })
      );
    },
  },

  beforeMount() {
    console.log("Username: " + this.$store.state.username);
    this.reconnect();
    window.addEventListener("keyup", this.move);
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

div.game-box {
  display: grid;
  grid-template-rows: repeat(21, minmax(0, 1fr));
  grid-template-columns: repeat(21, minmax(0, 1fr));
  padding: 1%;
  background-color: $primary-dark;
  border: 2px solid $primary-light;
  border-radius: 30px;
}

div.player {
  text-align: center;
  border-bottom: 2px solid $primary-cta-medium;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;

  p {
    display: inline-block;
  }
}
div.player.self {
  color: $primary-light;
  border-color: $primary-light;
}
</style>