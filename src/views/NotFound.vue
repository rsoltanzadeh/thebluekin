<template>
  <div class="not-found">
    <main-header :links="links" />
    <p>404 - Page not found.</p>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";
export default {
  components: {
    MainHeader,
  },
  data() {
    return {
      links: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Password Guide",
          url: "/password-guide",
        },
        {
          name: "Log in",
          url: "/login",
        },
        {
          name: "Register",
          url: "/register",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
  */
::selection {
  background-color: $primary-light;
  color: $primary-dark;
}

div.not-found {
  min-height: 100vh;
  color: $primary-cta-light;
  text-align: center;
}

p {
  font-size: 2em;
  margin-top: 5rem;
  color: $primary-light;
}
</style>
