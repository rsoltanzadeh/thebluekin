<template>
  <div class="main-header">
    <div @click="toggleNav" v-show="showNav" class="background-modal"></div>
    <router-link class="logo" to="/">
      <h1>The Bluekin</h1>
    </router-link>
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
    <button @click="toggleNav" :class="{ moved: showNav }" class="nav-icon">
      ☝
    </button>
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

  div.background-modal {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }

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

  .nav-icon {
    display: none;
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    color: $primary-cta-light;
    font-size: 3em;
    cursor: pointer;
    background: none;
    border: none;
    transition: all 0.6s ease-out;

    &.moved {
      transform: translateY(calc(-100vh + 4rem + 100%)) rotate(180deg);
      color: $primary-dark;
    }
  }

  div.secondary-nav-wrapper {
    width: 100vw;
    display: none;
    bottom: 0px;
    left: 0px;
    position: fixed;
    z-index: 2;
    background-color: black;
    opacity: 0.8;
    flex-direction: column;
    transform: translateY(100%);
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
    justify-content: center;
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
      display: none;
    }
    .nav-icon {
      display: block;
    }
  }
}
</style>