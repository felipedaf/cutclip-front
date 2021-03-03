<template>
    <div class="videocutter__action-area">
        <SearchBar
            @idChange="this.setVideoId"
            placeholder="Paste Youtube URL."
            id="search"
        >
        </SearchBar>
        <div class="videocutter__content-area">
            <div class="videocutter__player-area">
                <Player
                    :videoId="this.videoId"
                    @newCut="refreshCutList"
                />
            </div>
            <div class="videocutter__cuts-area">
                <Cuts :cutList="this.currentCutList"/>
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
            currentCutList: []
        }
    },
    methods: {
        setVideoId: function(data) {
            this.videoId = data
        },
        refreshCutList: function(cutList) {
            const FIVE_MINUTES = 1000 * 60 * 5

            const diff = cutList.filter(cut => {
                return !this.containsCut(this.currentCutList, cut)
            })

            diff.forEach(cuts => {
                setTimeout(() => {
                    const newList = this.currentCutList.filter(() => {
                        this.containsCut(this.currentCutList, cuts)
                    })

                    this.currentCutList = newList

                    localStorage.cuts = JSON.stringify(newList)

                }, FIVE_MINUTES)

            })

            this.currentCutList = cutList
        },
        containsCut: function(cuts, cut) {
            for (const element of cuts) {
                if (element.hash === cut.hash)
                    return true
            }

            return false
        }

    },
    mounted: function() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    beforeMount: function() {
        const FIVE_MINUTES = 1000 * 60 * 5
        const currentTime = new Date(Date.now()).getTime()

        const refreshedCuts = this.currentCutList.filter(cut => {
            const cutCreateTime = new Date(cut.createdAt).getTime()
            const timeDiff = currentTime - cutCreateTime

            return FIVE_MINUTES - timeDiff > 0
        })

        this.currentCutList = refreshedCuts
        localStorage.cuts = JSON.stringify(refreshedCuts)

        this.currentCutList.forEach((cut , index) => {
            const cutCreateTime = new Date(cut.createdAt).getTime()
            const timeDiff = currentTime - cutCreateTime

            setTimeout(() => {
                this.currentCutList.splice(index, 1)
                localStorage.cuts = JSON.stringify(this.currentCutList)
            }, FIVE_MINUTES - timeDiff)
        })
    },
    created: function() {
        this.currentCutList = JSON.parse(localStorage.cuts) || []
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
