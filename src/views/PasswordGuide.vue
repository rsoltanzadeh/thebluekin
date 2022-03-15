<template>
  <div class="wrapper">
    <prompt button-text="Understood" active>
      <p>
        This page is a short guide on how to create strong passwords. It is
        recommended to read through it before continuing to register an account.
      </p>
    </prompt>
    <h1>Password Security</h1>
    <div class="box">
      <p>A password should be:</p>
      <ul>
        <li>
          <p class="list-title">Unique</p>
          <p class="list-text">
            If your password is similar to a password you have elsewhere, it
            will be easy to guess as soon as the other password becomes
            compromised.
          </p>
        </li>
        <li>
          <p class="list-title">Strong</p>
          <p class="list-text">
            Similarly, if your password is too short it will also be easy to
            guess.
          </p>
        </li>
        <li>
          <p class="list-title">Stored/Remembered</p>
          <p class="list-text">
            If you have no password management and the password is too
            complicated to remember, you will lose your password.
          </p>
        </li>
      </ul>
      <br />
      <p>This can be achieved with:</p>
      <ul>
        <li>
          <p class="list-title">Password Management (recommended)</p>
          <p class="list-text">
            A good password manager generates strong and unique passwords and
            stores them in a secure and easily accessible database. We recommend
            <a href="https://keepassxc.org/" target="_blank">KeePassXC</a> which
            is both
            <a
              href="https://en.wikipedia.org/wiki/Free_software"
              target="_blank"
              >libre</a
            >
            and widely popular.
          </p>
        </li>
        <li>
          <p class="list-title">Mnemonics</p>
          <p class="list-text">
            Numbers and special characters make passwords far harder to remember
            and are contrary to popular belief not necessary for strength. A
            password is strong as long as it is not too short. In order to
            create a mnemonic password, simply combine a handful of arbitrary
            (ideally random) words (e.g.
            <a
              href="https://imgs.xkcd.com/comics/password_strength.png"
              target="_blank"
              >CorrectHorseBatteryStaple</a
            >).
          </p>
        </li>
      </ul>
      <div class="router-wrapper">
        <router-link class="router" to="/register">Continue</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Prompt from "./Prompt.vue";
export default {
  components: {
    Prompt,
  },
  data() {
    return {
    };
  }
}
</script>

<style scoped lang="scss">
/*
 @import "./styles/_shared.scss"; 
*/

div.wrapper {
  font-family: $secondary-font;
  font-size: 1.4em;
  padding-top: 30px;
  background: linear-gradient(to top right, $primary-medium, $primary-dark);
  height: 100vh;
  text-align: center;
}

h1 {
  color: $primary-cta-light;
  // text-shadow: 2px 2px 40px $primary-cta-light;
}

div.box {
  text-align: initial;
  margin: auto;
  margin-top: 40px;
  display: inline-block;
  padding: 40px;
  border-radius: 20px;
  max-width: 60%;
  background-color: $primary-dark;
  color: $primary-medium;

  div.router-wrapper {
    text-align: center;

    a.router {
      display: inline-block;
      color: $primary-cta-light;
      margin-top: 20px;
      border: 2px solid $primary-cta-light;
      padding: 15px;
      border-radius: 10px;
      text-decoration: none;

      &:hover {
        background-color: $primary-cta-light;
        color: $primary-dark;
      }
    }
  }

  a {
    color: $primary-cta-medium;
  }

  ul {
    color: $primary-light;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 50px;
    li {
      margin-top: 15px;
    }

    li::marker {
      color: $primary-cta-medium;
    }

    p.list-text {
      font-size: 0.9em;
      color: $primary-medium;
    }
  }
}
</style>
