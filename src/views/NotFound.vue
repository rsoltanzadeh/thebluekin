<template>
  <div class="wrapper">
    <main-header />
    <p>
      404 - Page not found.
    </p>   
    
    <div class="router-wrapper">
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
 import MainHeader from './MainHeader.vue'
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
  font-size: 2em;
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
