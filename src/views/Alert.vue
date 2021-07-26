<template>
  <div v-if="!accepted" class="alert-wrapper">
    <div class="window">
      <slot></slot>
      <button @click="accept()"> {{ buttonText }} </button>
    </div>
  </div>
</template>

<script>
 export default {
     data() {
         return {
             accepted: false
         }
     },

     props: {
         buttonText: String
     },
     
     methods: {
         accept() {
             this.accepted = true;
         }
     }
 }
</script>

<style scoped lang="scss">
 @import "./styles/_shared.scss";
 
 div.alert-wrapper {
     position: fixed;
     width: 100%;
     height: 100%;
     top: 0px;
     opacity: 0.9;
     background: linear-gradient(to top right, $primary-medium, $primary-dark);     
     display: flex;
     justify-content: center;
     align-items: center;
 }

 div.window {
     padding: 20px;
     border-radius: 20px;
     width: 40%;
     margin: auto;
     color: $primary-cta-light;
     background-color: $primary-dark;

     button {
         margin-top: 30px;
         padding: 10px;
         background: $primary-dark;
         color: $primary-cta-medium;
         border-radius: 10px;
         border: 1px solid $primary-cta-medium;
         box-shadow: none;

         &:hover {
             background: $primary-cta-medium;
             color: $primary-dark;
         }
     }
 }
</style>
