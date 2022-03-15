<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-up" appear mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "./styles/_shared.scss";

.slide-up-enter-active {
  transition: all 0.8s
}

.slide-up-leave-active {
  transition: all 0.8s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-30%);
  opacity: 0;
}
#app {
  /*font-family: $main-font;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: linear-gradient(to top right, $primary-medium, $primary-dark);
}
</style>
