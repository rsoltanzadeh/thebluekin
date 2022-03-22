<template>
  <div class="wrapper">
      <h1>The Bluekin</h1>
      <h4>- a game of murder, subversion, and deception</h4>
    <p>
      The Bluekin is an advanced version of the old social deduction game known
      as <em>Werewolf</em> or <em>Mafia</em>, extended and adjusted for online
      play.

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
</template>

<script>
 import MainHeader from './MainHeader.vue';
 
 export default {
     components: {
         MainHeader
     }
 }
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
  */


div.wrapper {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  font-family: $main-font;
  color: $primary-cta-light;
  margin: auto;
  padding: 10vh 10vw;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  box-sizing: border-box;
}

p {
  margin-top: 100px;
  color: $primary-light;
}

div.router-wrapper {
  margin: auto;
  margin-top: 100px;
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  a {
    margin-left: 20px;
    margin-right: 20px;
    white-space: nowrap;
  }
}

a {
  font-size: 1.5em;
  color: $primary-cta-light;
}
</style>
