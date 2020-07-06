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
        width: calc(40vw + 100px);
        margin: auto;
    }

    .search__bar-input--text {
        background-color: #171717;
        border-radius: 20px;
        border: none;
        height: 100%;
        width: 40vw;
        color: white;
        padding: 0 90px 0 10px;
        font-weight: 300;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
    }

    .search__bar-input--button {
        width: 90px;
        height: 100%;
        position: relative;
        bottom: 100%;
        border: none;
        border-radius: 20px;
        left: calc(40vw + 10px);
        background-color: #18A0FB;
        box-shadow: 0 0 1px 0 #18A0FB inset, 0 0 1px 0 #18A0FB;
        padding: 0 2vw 0 2vw;
    }

    @media (min-width: 769px) {
        .search__bar {
            width: 420px;
        }

        .search__bar-input--text {
            width: 300px;
            padding: 0 110px 0 10px;
        }

        .search__bar-input--button {
            width: 110px;
            padding: 0 10px 0 10px;
            left: 310px;
        }
    }
    

</style>