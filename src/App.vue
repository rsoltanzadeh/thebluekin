<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" appear mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "./styles/_shared.scss";

$transition-curve: cubic-bezier(0.73, 0.19, 0.2, 0.81);
$transition-duration: 0.7s;

.slide-enter-active {
  transition: all $transition-duration;
}

.slide-leave-active {
  transition: all $transition-duration;
}

.slide-enter-from {
  transform: translateY(-30%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(30%);
  opacity: 0;
}
#app {
  /*font-family: $main-font;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  * {
    font-family: $main-font;
  }
  
  ::selection {
    background-color: $primary-light;
    color: $primary-dark;
  }

  background: linear-gradient(to top right, $primary-medium, $primary-dark);
  overflow: hidden;
}
</style>
