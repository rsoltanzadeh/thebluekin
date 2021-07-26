<template>
  <div class="wrapper">
    <h1>The Bluekin</h1>
    <h4>- a game of murder, subversion, and deception</h4>
    <p>
      The Bluekin is an advanced version of the old social deduction game known as <em>Werewolf</em> or <em>Mafia</em>, extended and adjusted for online play.

      <br>
      <br>
      <br>
      
      The people of this small but prospering colony have just been informed that there are agents of the Bluekin in their midst with a nefarious mission, stopping at nothing to achieve it. Realizing the urgency of the situation — as the agents are making progress with each passing night — the colonists decide to gather every morning in order to exchange notes and work out who the infiltrators among them are.

      <br>
      <br>
      <br>

      The game is played with 8-15 people.
    </p>

    <div class="router-wrapper">
      <router-link to="/password-guide">Register</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
 @import "./styles/_shared.scss";

 ::selection {
     background-color: $primary-light;
     color: $primary-dark;
 }
 
 div.wrapper {
     height: 100vh;
     font-family: $main-font;
     color: $primary-cta-light;
     background: linear-gradient(to top right, $primary-medium, $primary-dark);
     margin: auto;
     padding-left: 15%;
     padding-right: 15%;
     padding-top: 50px;
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
 }
 
 a {
     font-size: 1.5em;
     color: $primary-cta-light;
 }
</style>
