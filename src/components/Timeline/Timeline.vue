<template>
    <div
        @mousedown="this.changeCurrentTime"
        @mouseup="this.mouseUp"
        class="timeline__container"
    >
        <div class="timeline__selector-relative">
          <Selector
            :timeline="this"
            @cutPercentages="this.sendCutPercentages"
          ></Selector>
        </div>
        <div class="timeline__current-relative">
            <div
                class="timeline__current"
                :style="'margin-left: ' + this.percentageComplete * 100 + '%;'"
            >
                <div class="timeline__current-bar">
                    <svg
                        width="12pt"
                        height="12pt"
                        viewBox="0 0 7 13"
                        fill="#18A0FB"
                    >
                        <path
                            d="M3.5 13L0.468911 0.25H6.53109L3.5 13Z"
                        />
                    </svg>
                    <svg
                        width="12pt"
                        height="12pt"
                        viewBox="0 0 7 14"
                        fill="#18A0FB"
                    >
                        <path
                            d="M3.5 0L6.53109 13.5H0.468911L3.5 0Z"
                        />
                    </svg>

                </div>
            </div>
        </div>
        <div class="timeline__pictures">
        </div>
    </div>
</template>

<script>
import Selector from "./Selector.vue"
export default {
    name: 'Timeline',
    props: ['totalSeconds', 'currentSecond', 'player'],
    data: function() {
        return {
            isMouseUp: true
        }
    },
    components: {
        Selector
    },
    computed: {
        percentageComplete: function() {
            const percentage = this.currentSecond / this.totalSeconds

            return (isNaN(percentage) || !percentage) ? 0 : percentage
        }
    },
    methods: {
        changeCurrentTime: function(event) {
            this.isMouseUp = false

            setTimeout(() => {
                if (this.isMouseUp) {
                    const currentArea = document.querySelector('.timeline__current-relative')
                    const currentAreaStart = currentArea.offsetLeft
                    const currentAreaEnd = currentAreaStart + currentArea.offsetWidth
                    const clickPosition = event.clientX

                    const percentage = (clickPosition - currentAreaStart) / (currentAreaEnd - currentAreaStart)

                    let newTime = this.totalSeconds * percentage
                    if (newTime < 0)
                      newTime = 0
                    else if (newTime > this.totalSeconds)
                      newTime = this.totalSeconds - 0.2

                    this.$emit('changeTime', newTime)

                }

            }, 90)

        },
        mouseUp: function() {
            this.isMouseUp = true
        },
        sendCutPercentages: function(percentages) {
            this.$emit("cutPercentages", percentages)
        }

    },
    mounted: function() {
        this.player.$on("changeSelectedStart", () => {
            this.$emit("changeSelectedStart", this.percentageComplete * 100)
        })

        this.player.$on("changeSelectedEnd", () => {
            this.$emit("changeSelectedEnd", this.percentageComplete * 100)
        })

        this.player.$on("cut", () => {
            this.$emit("cut", {})
        })
    }
}
</script>

<style lang="scss">

.timeline__container {
    color: white;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #171717;
    border-radius: 10px;
    padding: 0 10px;
    overflow: hidden;
}

.timeline__pictures {
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 200%;
}

.timeline__selector-relative {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 50;
}

.timeline__current-relative {
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 100%;
}

.timeline__current {
    height: 100%;
}

.timeline__current-bar {
    height: 100%;
    width: 2px;
    background-color: #18A0FB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

</style>
