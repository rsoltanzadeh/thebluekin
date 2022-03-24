<template>
  <div class="wrapper">
    <main-header />
    <div class="form">
      <p class="input-label">Username:</p>
      <input
        autofocus
        v-model="formInputs.username"
        type="text"
        name="username"
        class="input"
        autocomplete="off"
        readonly
        onfocus="this.removeAttribute('readonly');"
      />
      <br />
      <p class="input-label">Password:</p>
      <input
        @keyup.enter="login"
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
      <button @click="login" class="submit">Log in</button>
      <div class="remember-wrapper">
        <span>Remember me</span><input type="checkbox" value="Remember me" />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "./MainHeader.vue";

export default {
  components: { MainHeader },
  data() {
    return {
      formInputs: {
        email: "",
        username: "",
        password: "",
      },
      token: "",
    };
  },

  methods: {
    async login() {
      try {
        let response = await fetch("/api/get-token");
        const token = await response.text();
        console.log(token);
        response = await fetch("/api/login", {
          credentials: "same-origin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": token,
          },
          body: JSON.stringify({
            username: this.formInputs.username,
            password: this.formInputs.password,
          }),
        });

        const message = await response.text();
        console.log(message);
        if (message == "success") {
          localStorage.setItem('username', this.formInputs.username);
          this.$router.push("/home");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {},
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
  height: 100vh;
  padding: min(10%, 50px);
  color: $primary-cta-light;
}

.form {
  margin-top: min(10%, 100px);
  font-size: 1em;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.input-label {
  color: $primary-light;
  text-shadow: 0px 0px 0px $primary-dark;
  font-size: 1.5em;
  margin: 24px;

  &::selection {
    background-color: $primary-medium;
    color: $primary-dark;
  }
}

.input {
  outline: none;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid $primary-medium;
  font-size: 1.5em;
  user-select: initial;
  color: $primary-dark;
  padding: 10px;
  width: min(80%, 300px);
  margin-bottom: 20px;

  &::selection {
    background-color: $primary-medium;
    color: $primary-dark;
  }
}

.submit {
  margin-top: 30px;
  font-family: $main-font;
  cursor: pointer;
  border-radius: 25px;
  padding: 10px;
  font-size: 1.5em;
  color: $primary-medium;
  background-color: $primary-dark;
  border: 1px solid $primary-dark;
  transition: all 0.3s;

  &:hover {
    color: $primary-cta-medium;
    border-color: $primary-cta-medium;
  }
}

.remember-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 10px;
  }
}
</style>
