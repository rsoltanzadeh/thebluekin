<template>
    <div class="wrapper">
	<div class="header">
	    <router-link to="/">
		<h1>The Bluekin</h1>
		<h4>- a game of murder, subversion, and deception</h4>
	    </router-link>
	</div>
	<div class="form">
	    <p class="input-label">Enter e-mail address:</p>
	    <input v-model="formInputs.email" type="text" name="email" class="input" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" />
	    <br>
	    <p class="input-label">Choose username:</p>
	    <input v-model="formInputs.username" type="text" name="username" class="input" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" />
	    <br>
	    <p class="input-label">Create password:</p>
	    <input v-model="formInputs.password" type="password" name="password" class="input" />
	    <br>
	    <input :value="token" type="hidden" name="anti-csrf-token" class="input" />
	    <button @click="register" class="submit">Sign up</button>
	</div>
    </div>
</template>

<script>
 export default {
     data() {
         return {
             formInputs: {
                 email: "",
                 username: "",
                 password: ""
             },
             token: ""
         }
     },
     
     methods: {
         async register() {
             try {
                 let response = await fetch("/api/register", {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         username: this.formInputs.username,
                         password: this.formInputs.password,
                         email: this.formInputs.email
                     })
                 });
                 const message = await response.text();
                 console.log(message);
                 if(message == "success") {
                     this.$router.push("/");
                 }
             } catch(e) {
                 console.log(e);
             }
         }
     },
     
     created() {
         
     }
 }
</script>

<style scoped lang="scss">
 /*
    @import "./styles/_shared.scss";
  */
 * {
     user-select: none;
 }

 div.wrapper {
     font-family: $main-font;
     background: linear-gradient(to top right, $primary-medium, $primary-dark);
     height: 100vh;
     padding-top: 50px;
     text-align: center;
     color: $primary-cta-light;
 }

 div.header {
     a {
	 cursor: pointer;
	 color: $primary-cta-light;
	 text-decoration: none;
     }
 }
 
 .form {
     margin-top: 100px;
     font-size: 1em;
     display: flex;
     flex: 1;
     flex-direction: column;
     justify-content: center;
     align-items: center;
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
     width: 300px;
     margin-bottom: 20px;
     
     &::selection {
         background-color: $primary-medium;
         color: $primary-dark;
     }
     
 }

 .submit {
     margin-top: 50px;
     font-family: $main-font;
     cursor: pointer;
     border-radius: 15px;
     padding: 10px;
     font-size: 1.5em;
     color: $primary-cta-light;
     background-color: transparent;
     border: 1px solid $primary-cta-light;
     
     &:hover {
         color: $primary-dark;
         background-color: $primary-cta-medium;
         border-color: $primary-cta-medium;
     }
 }

</style>
