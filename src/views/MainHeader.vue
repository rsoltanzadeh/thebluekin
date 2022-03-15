<template>
  <div class="header">
    <router-link to="/">
      <h1>The Bluekin</h1>
      <h4>- a game of murder, subversion, and deception</h4>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
/*
 @import "./styles/_shared.scss"; 
*/

div.header a {
  cursor: pointer;
  color: $primary-cta-light;
  text-decoration: none;
}
</style>