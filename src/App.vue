<template>
  <div id="app">
    <Navbar id="navbar"></Navbar>
    <VideoCutter id="cutter"></VideoCutter>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import VideoCutter from './components/VideoCutter'
export default {
  name: 'App',
  components: {
    Navbar,
    VideoCutter
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

* {
  margin: 0;
}

body {
  width: 100vw;
  height: 100vh;
  background: #292929;
  font-family: 'Roboto', sans-serif;
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
