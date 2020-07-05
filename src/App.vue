<template>
  <div id="app">
    <Navbar></Navbar>
    <VideoCutter></VideoCutter>
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
</style>
