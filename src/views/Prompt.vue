<template>
  <Transition :appear="startTransition" name="slide-right">
    <div v-if="isActive" class="background-left"></div>
  </Transition>
  <Transition :appear="startTransition" name="slide-left">
    <div v-if="isActive" class="background-right"></div>
  </Transition>
  <Transition :appear="startTransition" name="slide-down">
    <div v-if="isActive" class="wrapper">
      <div class="window">
        <slot></slot>
        <input
          v-model="textInput"
          @keyup.enter="proceed"
          v-if="hasTextInput"
          type="text"
        />
        <button @click="proceed">{{ buttonText }}</button>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      textInput: "",
      isActive: this.active,
    };
  },

  props: {
    buttonText: {
      type: String,
      required: true,
    },
    hasTextInput: {
      type: Boolean,
    },
    callback: {
      type: Function,
      default: () => {},
    },
    active: {
      type: Boolean,
    },
    startTransition: {
      type: Boolean
    }
  },

  methods: {
    proceed() {
      this.callback(this.textInput); // no error thrown even if default parameterless callback used; javascript magic!
      this.dismiss();
    },

    dismiss() {
      this.dismissed = true;
      this.textInput = "";
      this.isActive = false;
    },

    activate() {
      this.isActive = true;
    },
  },
};
</script>

<style scoped lang="scss">
/* @import "./styles/_shared.scss"; */

$transition-curve: cubic-bezier(.71,.27,.32,.99);
$transition-duration: 0.7s;
$transition-delay: 0.3s;

.slide-left-enter-active {
  transition: all $transition-duration $transition-curve;
}

.slide-left-leave-active {
  transition: all $transition-duration $transition-curve;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-active {
  transition: all $transition-duration $transition-curve;
}

.slide-right-leave-active {
  transition: all $transition-duration $transition-curve;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-up-enter-active {
  transition: all $transition-duration $transition-curve;
}

.slide-up-leave-active {
  transition: all $transition-duration $transition-curve;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-down-enter-active {
  transition: all $transition-duration $transition-curve;
  transition-delay: $transition-delay;
}

.slide-down-leave-active {
  transition: all $transition-duration $transition-curve;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}

div.background-left, div.background-right {
  background: black;
  opacity: 0.3;
  width: 50vw;
  height: 100vh;
}

div.background-left {
  position: fixed;
  left: 0px;
  top: 0px;
}

div.background-right {
  position: fixed;
  right: 0px;
  top: 0px;
}

div.wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.window {
  border: 1px solid white;
  padding: min(5%, 20px);
  opacity: 1;
  border-radius: 20px;
  width: min(90%, 800px);
  color: $primary-cta-light;
  background-color: $primary-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    display: flex;
    align-self: center;
    margin-top: 30px;
    background: $primary-medium;
    color: $primary-dark;
    border-radius: 10px;
    border: 0px;
    font-size: 1.2em;
  }
  
  button {
    cursor: pointer;
    display: flex;
    align-self: center;
    margin-top: 30px;
    padding: 10px;
    background: $primary-dark;
    color: $primary-cta-medium;
    border-radius: 10px;
    border: 1px solid $primary-cta-medium;
    box-shadow: none;
    transition: all 0.3s;

    &:hover {
      background: $primary-cta-medium;
      color: $primary-dark;
    }
  }
}
</style>
