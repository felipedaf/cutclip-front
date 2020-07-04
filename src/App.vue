<template>
  <div id="app">
    <Navbar></Navbar>
    <SearchBar placeholder="Paste your Youtube Url" id="search"></SearchBar>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    SearchBar
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

#search {
  margin: 1vh auto 1vh auto;
}
</style>
