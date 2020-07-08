<template>
    <div class="videocutter__action-area">
        <SearchBar placeholder="Paste Youtube URL." id="search"></SearchBar>
        <div class="videocutter__content-area">
            <div></div>
            <div></div>
        </div>
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

.videocutter__action-area {
    padding: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 30px auto;
}

.videocutter__content-area {
    padding: 5%;
}
</style>