<template>
  <div id="app">
    <Navbar @toggle="toggle" id="navbar"/>
    <div id="app__action-space">
      <transition name="slide">
        <Menu v-if="isMenuOpened"/>
      </transition>
      <VideoCutter id="cutter"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import VideoCutter from './components/VideoCutter'
import Menu from './components/Menu'
export default {
  name: 'App',
  data() {
    return {
      isMenuOpened: false
    }
  },
  components: {
    Navbar,
    VideoCutter,
    Menu
  },
  methods: {
    toggle(toggleBool) {
      this.isMenuOpened = toggleBool
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

* {
  margin: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: width .5s;
}
.slide-enter, .slide-leave-to {
  width: 0;
}

#app__action-space {
  display: flex;
  height: 100%;
}

body {
    width: 100vw;
    height: 100vh;
    background: #292929;
    font-family: 'Roboto', sans-serif;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#navbar {
  height: 50px;
}

#cutter {
    flex-grow: 1;
    max-height: calc(100vh - 50px);
}
</style>
