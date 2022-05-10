<template>
  <div class="main-header">    
    <button style="visibility:hidden" class="burger"> <!-- invisible center-helper -->
      ☰
    </button>
    <router-link class="logo" to="/">
      <h1>The Bluekin</h1>
    </router-link>
    <button @click="toggleNav" :class="{ rotated: showNav }" class="burger">
      ☰
    </button>
    <div class="nav-wrapper">
      <router-link class="nav-item" to="/">
        <p>Home</p>
      </router-link>
      <router-link class="nav-item" to="/password-guide">
        <p>Password Guide</p>
      </router-link>
      <router-link class="nav-item" to="/login">
        <p>Log in</p>
      </router-link>
      <router-link class="nav-item" to="/register">
        <p>Register</p>
      </router-link>
    </div>
    <div :class="{ visible: showNav }" class="secondary-nav-wrapper">
      <router-link class="nav-item" to="/">
        <p>Home</p>
      </router-link>
      <router-link class="nav-item" to="/password-guide">
        <p>Password Guide</p>
      </router-link>
      <router-link class="nav-item" to="/login">
        <p>Log in</p>
      </router-link>
      <router-link class="nav-item" to="/register">
        <p>Register</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },

  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style scoped lang="scss">
/*
 @import "./styles/_shared.scss"; 
*/

div.main-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid $primary-light;
  margin: 0;
  padding: 0;

  a {
    cursor: pointer;
    color: $primary-cta-light;
    text-decoration: none;
  }

  .logo {
    margin-right: auto;
    margin-left: min(3vw, 5rem);
    padding: min(3vh, 2rem);
    grid-column: 1 / 2;
    display: inline-block;
    cursor: pointer;
    color: $primary-cta-light;
    text-decoration: none;
  }

  .burger {
    display: none;
    cursor: pointer;
    font-size: 2rem;
    color: $primary-cta-light;
    background: none;
    border: none;
    transition: all 0.3s ease-out;

    &.rotated {
      transform: rotate(90deg);
    }
  }

  div.secondary-nav-wrapper {
    display: none;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 1;
    background-color: black;
    opacity: 0.8;
    flex-direction: column;
    transform: translateY(-100%);
    transition: all 0.3s ease-out;

    &.visible {
      transform: translateY(0);
    }

    .nav-item {
      padding: 1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: $primary-cta-light;
      text-decoration: none;
      transition: all 0.4s;

      &:hover {
        background-color: $primary-cta-light;
        color: $primary-dark;
      }
    }
  }

  div.nav-wrapper {
    display: flex;
    grid-column: 2 / 3;

    .nav-item {
      height: 100%;
      padding: 0rem min(2vw, 3rem);
      display: flex;
      align-items: center;
      cursor: pointer;
      color: $primary-cta-light;
      text-decoration: none;
      transition: all 0.4s;

      &:hover {
        background-color: $primary-cta-light;
        color: $primary-dark;
      }
    }
  }
}

@media (max-width: 40rem) {
  div.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 2rem;
    
    .logo {
      margin: 0;
    }

    div.nav-wrapper {
      display: none;
    }

    div.secondary-nav-wrapper {
      display: flex;
    }
    .burger {
      display: block;
    }
  }
}
</style>