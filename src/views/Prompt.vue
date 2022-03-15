<template>
  <Transition :appear="startTransition" name="slide-left">
    <div v-if="isActive" class="background"></div>
  </Transition>
  <Transition :appear="startTransition" name="slide-right">
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

.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

div.background {
  position: fixed;
  top: 0px;
  left: 0px;
  background: linear-gradient(to top right, $primary-medium, $primary-dark);
  opacity: 0.8;
  width: 100vw;
  height: 100vh;
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
  padding: 20px;
  opacity: 1;
  border-radius: 20px;
  width: 40%;
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

    &:hover {
      background: $primary-cta-medium;
      color: $primary-dark;
    }
  }
}
</style>
