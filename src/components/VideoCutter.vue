<template>
    <div class="videocutter__action-area">
        <SearchBar @idChange="this.setVideoId" placeholder="Paste Youtube URL." id="search"></SearchBar>
        <div class="videocutter__content-area">
            <div class="videocutter__player-area">
                <Player
                    :videoId="this.videoId"
                />
            </div>
            <div class="videocutter__cuts-area">
                <Cuts />
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from './SearchBar'
import Player from './Player.vue'
import Cuts from './Cuts.vue'
export default {
    name: 'VideoCutter',
    components: {
        SearchBar,
        Player,
        Cuts
    },
    data: function() {
        return {
            videoId: '',
        }
    },
    mounted: function() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    methods: {
        setVideoId: function(data) {
            this.videoId = data
        },
    }

}
</script>

<style lang="scss" scoped>

.videocutter__action-area {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.videocutter__content-area {
    box-sizing: border-box;
    padding: 20px 1vw 0 1vw;
    width: 100%;
    max-width: 1600px;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
}

.videocutter__player-area {
    display: flex;
}

.videocutter__cuts-area {
    display: flex;
    justify-content: flex-end;
}
</style>
