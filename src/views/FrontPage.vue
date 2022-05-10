<template>
  <div class="front-page">
    <div class="wrapper">
      <h1>The Bluekin</h1>
      <h4>- a game of murder, subversion, and deception</h4>
      <p>
        The Bluekin is an advanced version of the old social deduction game
        known as <em>Werewolf</em> or <em>Mafia</em>, extended and adjusted for
        online play.

        <br />
        <br />
        <br />

        The people of this small but prospering colony have just been informed
        that there are agents of the Bluekin in their midst with a nefarious
        mission, stopping at nothing to achieve it. Realizing the urgency of the
        situation — as the agents are making progress with each passing night —
        the colonists decide to gather every morning in order to exchange notes
        and work out who the infiltrators among them are.

        <br />
        <br />
        <br />

        The game is played with 8-15 people.
      </p>

      <div class="router-wrapper">
        <router-link to="/password-guide">Sign up</router-link>
        <router-link to="/login">Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";

export default {
  components: {
    MainHeader,
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
  */

div.front-page {
  display: flex;
  align-items: center;
  min-height: 100vh;
  overflow-y: scroll;
}
div.wrapper {
  box-sizing: border-box;
  color: $primary-cta-light;
  margin: 5vh auto;
  text-align: center;
  width: min(90vw, 60rem);
}

h1 {
  font-size: min(5rem, 10vw);
  margin-bottom: 1rem;
  box-sizing: border-box;
}

p {
  margin-top: 10vh;
  color: $primary-light;
}

div.router-wrapper {
  margin: auto;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 1.5rem;
    white-space: nowrap;
  }
}

a {
  font-size: 1.5em;
  color: $primary-cta-light;
}
</style>
