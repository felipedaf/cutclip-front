<template>
  <form class="search__bar">
      <input :placeholder="this.placeholder" type="text" class="search__bar-input--text">
      <input value="SELECT" type="button" class="search__bar-input--button">
  </form>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        placeholder: String
    }
}
</script>

<style lang='scss' scoped>
    .search__bar {
        height: 30px;
        width: 25vw;
        margin: auto;
    }

    .search__bar-input--text {
        background-color: #171717;
        border-radius: 20px;
        border: none;
        height: 100%;
        width: 18vw;
        color: white;
        padding: 0 6vw 0 1vw;
        font-weight: 300;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
    }

    .search__bar-input--button {
        min-width: 6vw;
        height: 100%;
        position: relative;
        bottom: 100%;
        left: 19vw;
        border: none;
        border-radius: 20px;
        background-color: #18A0FB;
        box-shadow: 0 0 1px 0 #18A0FB inset, 0 0 1px 0 #18A0FB;
    }
</style>