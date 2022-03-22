<template>
  <div class="wrapper">
    <main-header />
    <p>
      404 - Page not found.
    </p>   
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
  color: $primary-cta-light;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 50px;
  text-align: center;
}

p {
  font-size: 2em;
  margin-top: 100px;
  color: $primary-light;
}

</style>
