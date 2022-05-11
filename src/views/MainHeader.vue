<template>
  <div class="main-header">
    <div @click="toggleNav" v-show="showNav" class="background-modal"></div>
    <router-link class="logo" to="">
      <h1>The Bluekin</h1>
    </router-link>
    <div class="nav">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="{path: link.url}"
        class="nav-item"
      >
        <p>{{ link.name }}</p>
      </router-link>
    </div>
    <div :class="{ visible: showNav }" class="secondary-nav-wrapper">
      <div class="secondary-nav">
        <router-link
          v-for="(link, index) in links"
          :key="index"
          :to="{ path: link.url }"
          class="nav-item"
        >
          <p>{{ link.name }}</p>
        </router-link>
      </div>
      <button @click="toggleNav" :class="{ moved: showNav }" class="nav-icon">
        ➤
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["links"],

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

  div.secondary-nav-wrapper {
    bottom: 0px;
    left: 0px;
    position: fixed;
    display: none;
    align-items: center;
    transform: translateX(-50vw);
    transition: all 0.4s ease-out;
    z-index: 2;

    &.visible {
      transform: translateX(0);
    }

    div.secondary-nav {
      width: 50vw;
      background-color: black;
      opacity: 0.8;
      flex-direction: column;

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

    .nav-icon {
      display: block;
      z-index: 2;
      margin-left: 1rem;
      color: $primary-cta-light;
      font-size: 2em;
      cursor: pointer;
      background: none;
      border: none;
      transition: all 0.4s ease-in-out;
      -webkit-text-stroke: 2px $primary-cta-light;

      &.moved {
        align-self: stretch;
        transform: rotate(180deg);
        color: $primary-dark;
        -webkit-text-stroke-color: $primary-cta-light;
      }
    }
  }

  div.nav {
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

    div.nav {
      display: none;
    }

    div.secondary-nav-wrapper {
      display: flex;
    }

    .nav-icon {
      display: block;
    }
  }
}
</style>