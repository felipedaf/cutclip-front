<template>
    <div class="volume__wrapper" @mousemove="this.mouseMove">
        <div @mouseover="this.showBar" class="volume__container">
            <svg
                width="12pt"
                height="12pt"
                viewBox="0 0 486.547 486.547"
                fill="#18A0FB"
            >
                <path d="M251.568,68.851c-6.199,0-11.56,2.264-16.083,6.787l-118.991,76.164H22.871c-6.2,0-11.561,2.265-16.083,6.787    C2.258,163.117,0,168.472,0,174.665v137.217c0,6.199,2.264,11.561,6.787,16.083c4.522,4.529,9.884,6.787,16.083,6.787h93.624    l118.998,76.157c4.522,4.529,9.883,6.787,16.083,6.787c6.193,0,11.549-2.265,16.078-6.787c4.521-4.522,6.787-9.884,6.787-16.083    V91.721c0-6.193-2.266-11.555-6.787-16.083C263.117,71.121,257.762,68.851,251.568,68.851z"/>
                <path
                    v-if="['loud', 'medium'].includes(this.noiseLevel)"
                    d="M379.881,293.84c10.123-15.6,15.184-32.454,15.184-50.563c0-18.103-5.061-35.019-15.184-50.741    c-10.129-15.722-23.525-26.8-40.203-33.232c-2.387-1.187-5.361-1.787-8.934-1.787c-6.201,0-11.555,2.203-16.078,6.609    c-4.529,4.413-6.787,9.829-6.787,16.261c0,5,1.432,9.235,4.291,12.687c2.857,3.458,6.309,6.432,10.359,8.935    c4.047,2.503,8.098,5.245,12.148,8.219c4.047,2.98,7.504,7.209,10.361,12.687c2.859,5.484,4.291,12.271,4.291,20.367    c0,8.104-1.432,14.891-4.291,20.368c-2.857,5.483-6.314,9.712-10.361,12.687c-4.051,2.98-8.102,5.716-12.148,8.219    c-4.051,2.503-7.502,5.483-10.359,8.936c-2.859,3.458-4.291,7.681-4.291,12.687c0,6.433,2.264,11.854,6.787,16.261    c4.523,4.413,9.883,6.609,16.076,6.609c3.574,0,6.549-0.594,8.936-1.787C356.355,320.584,369.752,309.446,379.881,293.84z"/>
                <path
                    v-if="this.noiseLevel === 'loud'"
                    d="M375.773,74.97c-3.096-1.187-6.199-1.787-9.289-1.787c-6.199,0-11.561,2.265-16.084,6.787    c-4.529,4.529-6.787,9.89-6.787,16.083c0,9.29,4.645,16.322,13.936,21.083c13.342,6.916,22.387,12.148,27.16,15.722    c17.625,12.864,31.383,29.003,41.273,48.421c9.885,19.419,14.828,40.08,14.828,61.996c0,21.922-4.943,42.583-14.828,62.002    c-9.891,19.419-23.646,35.557-41.273,48.421c-4.768,3.574-13.818,8.813-27.16,15.723c-9.291,4.768-13.936,11.793-13.936,21.083    c0,6.2,2.266,11.562,6.787,16.084c4.523,4.528,10.006,6.787,16.439,6.787c2.857,0,5.832-0.594,8.934-1.787    c33.348-14.052,60.148-36.506,80.398-67.356c20.246-30.852,30.375-64.499,30.375-100.95c0-36.45-10.129-70.092-30.375-100.949    C435.922,111.476,409.121,89.028,375.773,74.97z"/>
            </svg>
        </div>
        <div v-if="!this.isHidden" class="volume__mouseup-trigger">

        </div>
        <div class="relative">
            <transition name="fadeScale">
                <div
                    tabindex="0"
                    @blur="this.hideBar"
                    @mousedown="this.allowChangeVolume"
                    @mouseup="this.mouseUp"
                    class="volume__bar"
                    v-if="!this.isHidden"
                >
                    <div
                        :style="'height: ' + this.volumePercentage + '%;'"
                        class="volume__percentage"
                    >

                    </div>
                </div>

            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VolumeBar',
    data: function() {
        return {
            volumePercentage: 100,
            isHidden: true,
            mousePosition: null,
            editVolume: false,
            interval: 0
        }
    },
    props: ['player', 'playerReady'],
    watch: {
        playerReady: function(newPlayerReady) {
            if (newPlayerReady)
                this.volumePercentage = this.player.getVolume()

        }
    },
    computed: {
        noiseLevel: function() {
            if (this.volumePercentage <= 100 && this.volumePercentage >= 60)
                return 'loud'
            else if (this.volumePercentage === 0)
                return 'none'
            else
                return 'medium'
        }
    },
    methods: {
        allowChangeVolume: function() {
            this.cancelInterval()
            this.editVolume = true
            const relativeDiv = document.querySelector('.relative')
            const volumeBar = document.querySelector('.volume__bar')

            if(!relativeDiv || !volumeBar)
                return

            const volumeBarStart = relativeDiv.offsetTop
            const volumeBarEnd = volumeBarStart + volumeBar.offsetHeight
            const clickHeight = event.pageY
            const percentage =  Math.round((1 - (clickHeight - volumeBarStart) / (volumeBarEnd - volumeBarStart)) * 100)

            this.volumePercentage = percentage
            this.player.setVolume(percentage)

        },
        mouseUp: function() {
            this.cancelInterval()
            this.hideBar(1000)
        },
        mouseMove: function(event) {
            if (this.editVolume) {
                const relativeDiv = document.querySelector('.relative')
                const volumeBar = document.querySelector('.volume__bar')

                if(!relativeDiv || !volumeBar)
                    return

                const volumeBarStart = relativeDiv.offsetTop
                const volumeBarEnd = volumeBarStart + volumeBar.offsetHeight
                const clickHeight = event.pageY
                let percentage =  Math.round((1 - (clickHeight - volumeBarStart) / (volumeBarEnd - volumeBarStart)) * 100)

                if (percentage < 0)
                    percentage = 0
                else if (percentage >  100)
                    percentage = 100


                this.volumePercentage = percentage
                this.player.setVolume(percentage)
            }

        },
        showBar: function() {
            this.cancelInterval()
            this.isHidden = false
            setTimeout(() => {
                const volumeBar = document.querySelector(".volume__bar")
                volumeBar.focus()
            }, 0)
            this.hideBar(2000)
        },
        hideBar: function(milliseconds) {
            this.cancelInterval()
            this.interval = setTimeout(() => {
                this.isHidden = true
                this.editVolume = false
            }, milliseconds)
        },
        cancelInterval: function() {
            clearInterval(this.interval)
        }
    },
    mounted: function() {
        const body = document.getElementsByTagName("body")[0]
        const percentageDiv = document.querySelector(".volume__percentage")
        body.addEventListener('mouseup', event => {

            if (event.srcElement !== percentageDiv) {
                this.editVolume = false
                this.cancelInterval()
                this.hideBar(1000)
            }
        })
    }
}

</script>
<style lang="scss" scoped>

.fadeScale-enter-active, .fadeScale-leave-active {
  transition: opacity .15s, transform .15s;
  transform-origin: center bottom;
}
.fadeScale-enter, .fadeScale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.volume__wrapper {
    display: flex;
}

.volume__container {
    width: 12pt;
    height: 12pt;
    margin: 0 30px;
}

.relative {
    position: relative;
    width: 0;
    height: 0;
    right: calc(12pt + 40px);
    bottom: 110px;
}

.volume__bar {
    width: calc(12pt + 20px);
    height: 100px;
    background-color: #171717;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0px rgba(0,0,0,.25);
    overflow: hidden;
    display: flex;
    border: 1px solid #18A0FB;
    flex-direction: column-reverse;
    outline: none;
}

.volume__percentage {
    width: 110%;
    background-color: #18A0FB;
}

.volume__mouseup-trigger {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
