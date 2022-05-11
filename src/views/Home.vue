<template>
  <div class="home">
    <main-header :links="links" />
    <div :class="{ visible: showFriendBox }" class="friend-box-wrapper">
      <button
        @click="toggleFriendBox"
        :class="{ visible: showFriendBox }"
        class="friend-box-icon"
      >
        {{ friendBoxIconContent }}
      </button>
      <FriendBox />
    </div>
  </div>
</template>

<script>
import FriendBox from "./FriendBox.vue";
import MainHeader from "./MainHeader.vue";
export default {
  components: {
    FriendBox, MainHeader
  },

  data() {
    return {
      showFriendBox: false,
      links: [
        {
          "name": "Play",
          "url": "/play"
        },
        {
          "name": "Log out",
          "url": "/logout"
        }
      ]
    };
  },

  computed: {
    friendBoxIconContent() {
      if (this.showFriendBox) {
        return "🗙";
      } else {
        return "🗨";
      }
    },
  },

  methods: {
    async logout() {
      try {
        let response = await fetch("/api/logout");
        const message = await response.text();
        console.log(message);
        if (message == "success") {
          this.$router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
    toggleFriendBox() {
      this.showFriendBox = !this.showFriendBox;
    },
  },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
	*/

div.home {
  background: transparent;
  min-height: 100vh;
  color: $primary-cta-light;

  a {
    text-decoration: none;
    margin: auto;
    display: block;
    padding: 2rem 3rem;
    font-size: 2em;
    color: $primary-cta-medium;
    border: 2px dashed $primary-cta-medium;
    border-radius: 2rem;
    transition: all 0.2s;

    &:hover {
      color: $primary-dark;
      border-color: $primary-dark;
    }
  }

  div.friend-box-wrapper {
    z-index: 2;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    transform: translateX(min(25rem, 100vw));
    transition: all 0.4s ease-out;
    pointer-events: none;

    &.visible {
      transform: translateX(0);
    }

    .friend-box-icon {
      margin: 0;
      z-index: 1;
      cursor: pointer;
      background: none;
      border: none;
      padding: 1rem 2rem;
      font-size: 2rem;
      color: $primary-cta-light;
      align-self: flex-end;
      transition: all 0.6s linear;
      pointer-events: auto;
    }

    .friend-box {
      width: min(25rem, 100vw);
      height: 100vh;
      pointer-events: auto;
    }
  }
}

@media (max-width: 40rem) {
  div.home {
    div.friend-box-wrapper {
      flex-direction: column;
      transform: translateY(90vh);

      &.visible {
        transform: translateY(0);
      }

      .friend-box-icon {
        padding: 0 1rem;
      }

      .friend-box {
        height: 90vh;
      }
    }
  }
}
</style>
