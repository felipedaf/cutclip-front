<template>
    <div class="container">
        <SearchBar placeholder="Paste youtube url" id="search"></SearchBar>
    </div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
    name: 'VideoCutter',
    components: {
        SearchBar
    }

}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: calc(100vh - 52px);
    padding: 10px;
    box-sizing: border-box;
}
</style>