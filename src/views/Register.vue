<template>
  <div class="wrapper">
    <main-header :links="links"/>
    <p class="message">{{ message }}</p>
    <div class="form">
      <p class="input-label">Enter e-mail address:</p>
      <input
        v-model="formInputs.email"
        autofocus
        type="text"
        name="email"
        class="input"
        autocomplete="off"
        readonly
        onfocus="this.removeAttribute('readonly');"
      />
      <br />
      <p class="input-label">Choose username:</p>
      <input
        v-model="formInputs.username"
        type="text"
        name="username"
        class="input"
        autocomplete="off"
        readonly
        onfocus="this.removeAttribute('readonly');"
      />
      <br />
      <p class="input-label">Create password:</p>
      <input
        @keyup.enter="register"
        v-model="formInputs.password"
        type="password"
        name="password"
        class="input"
      />
      <br />
      <input
        :value="token"
        type="hidden"
        name="anti-csrf-token"
        class="input"
      />
      <button @click="register" class="submit">Sign up</button>
    </div>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";
export default {
  data() {
    return {
      formInputs: {
        email: "",
        username: "",
        password: "",
      },
      token: "",
      message: "",
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

  methods: {
    async register() {
      try {
        let response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.formInputs.username,
            password: this.formInputs.password,
            email: this.formInputs.email,
          }),
        });
        const message = await response.text();
        console.log(message);
        if (message == "success") {
          this.$router.push("/login");
        } else {
          this.message = message;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  beforeCreate() {
    fetch("/api/logout");
  },

  created() {},
  components: { MainHeader },
};
</script>

<style scoped lang="scss">
/*
    @import "./styles/_shared.scss";
  */
* {
  user-select: none;
}

div.wrapper {
  min-height: 100vh;
  text-align: center;
  color: $primary-cta-light;
}

p.message {
  font-size: min(calc(1.2vh + 2vw), 1.2rem);
  color: $primary-cta-medium;
  text-align: center;
  margin: 8vh;
}

.form {
  margin-top: min(5%, 50px);
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-label {
  color: $primary-light;
  text-shadow: 0px 0px 0px $primary-dark;
  font-size: min(calc(1.5vh + 2.4vw), 1.5rem);
  margin-bottom: 1rem;

  &::selection {
    background-color: $primary-medium;
    color: $primary-dark;
  }
}

.input {
  outline: none;
  background-color: $primary-medium;
  border-radius: 5vh;
  border: 2px solid $primary-light;
  font-size: min(calc(1.5vh + 2vw), 1.5rem);
  user-select: initial;
  color: $primary-dark;
  padding: 0.5rem;
  width: min(60vw, 18rem);
  margin-bottom: 2rem;

  &::selection {
    background-color: $primary-medium;
    color: $primary-dark;
  }

  &:focus {
    outline: 2px solid $primary-cta-light;
    border-color: transparent;
  }
}

.submit {
  margin-top: 2rem;
  cursor: pointer;
  border-radius: 2rem;
  padding: 0.8rem;
  font-size: min(calc(1.5vh + 2.3vw), 1.5rem);
  color: $primary-medium;
  background-color: $primary-dark;
  border: 2px solid $primary-dark;
  transition: all 0.3s;

  &:hover {
    color: $primary-cta-medium;
    border-color: $primary-cta-medium;
  }
}
</style>
