<template>
    <div class="container">
        <SearchBar placeholder="Paste Youtube URL." id="search"></SearchBar>
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
    padding: 10px;
    box-sizing: border-box;
}
</style>