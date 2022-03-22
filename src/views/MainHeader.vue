<template>
  <div class="header">
    <router-link class="logo" to="/">
      <h1>The Bluekin</h1>
    </router-link>
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
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
/*
 @import "./styles/_shared.scss"; 
*/

div.header {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr repeat(4, auto) 1fr;
  justify-items: center;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid $primary-light;
  margin: 0;
  padding: 0;

  .logo {
    margin-right: auto;
    margin-left: min(10%, 200px);
    padding: 20px;
    grid-column: 1 / 2;
    display: inline-block;
    cursor: pointer;
    color: $primary-cta-light;
    text-decoration: none;
  }

  .nav-item {
    height: 100%;
    padding: 0px min(2vw, 30px);
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

    &::nth-child {
      grid-column-start: 2;
    }
  }
}
</style>