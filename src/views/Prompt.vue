<template>
  <div @keydown.esc="dismiss" tabindex="0" class="prompt">
    <!--
    <Transition :appear="startTransition" name="slide-right">
      <div v-show="isActive" class="background-left"></div>
    </Transition>
    -->
    <Transition :appear="startTransition" name="slide-left">
      <div v-show="isActive" class="background-right"></div>
    </Transition>
    <Transition :appear="startTransition" name="slide-down">
      <div v-show="isActive" class="window-wrapper">
        <div class="window">
          <slot></slot>
          <input
            ref="input"
            v-model="textInput"
            @keyup.enter="proceed"
            v-if="hasTextInput"
            type="text"
          />
          <button @click="proceed">{{ buttonText }}</button>
        </div>
      </div>
    </Transition>
  </div>
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
      type: Boolean,
    },
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
      setTimeout(() => this.$refs.input.focus(), 100); // give the browser time to change visibility so focus works; ugly hack
    },
  }
};
</script>

<style scoped lang="scss">
/* @import "./styles/_shared.scss"; */

$transition-curve: cubic-bezier(0.71, 0.27, 0.32, 0.99);
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

div.background-left,
div.background-right {
  background: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  pointer-events: auto;
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

div.window-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

div.window {
  z-index: 2;
  border: 1px solid white;
  padding: min(1.5rem, 5%);
  opacity: 1;
  border-radius: max(2rem, 2vw);
  font-size: min(2.4vh, 1.2rem);
  width: min(80%, 800px);
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
