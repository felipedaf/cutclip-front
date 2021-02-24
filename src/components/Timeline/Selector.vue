<template>
    <div
        class="selector--wrapper"
        @mousemove="this.moveSelector"
    >
        <div
            class="selector--resizable-box"
            :style="'margin-left:' + this.marginLeftSize"
        >
        </div>
        <div
            class="selector--resize"
            @mousedown="this.allowMoveStart"
        >
            <div class="selector--resize-sphere">
            </div>
            <div class="selector--resize-sphere">
            </div>
        </div>
        <div
            @mousedown="this.allowMoveSelector"
            class="selector--selected-area"
            :style="'width:' + this.selectorWidth"
        >
        </div>
        <div
            class="selector--resize"
            @mousedown="this.allowMoveEnd"
        >
            <div class="selector--resize-sphere">
            </div>
            <div class="selector--resize-sphere">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Selector",
    props: ["timeline"],
    data: function() {
        return {
            startPercentage: 10,
            endPercentage: 40,
            selectorSize: 0,
            offsetLeft: 0,
            movingSelector: false,
            movingStart: false,
            movingEnd: false,
            mouseStartPosition: 0,
            startPosition: 10,
            endPosition: 40
        }
    },
    computed: {
        marginLeftSize: function() {
            return this.startPercentage + "%"
        },
        selectorWidth: function() {
            return (this.endPercentage - this.startPercentage) + "%"
        }
    },
    methods: {
        moveSelector: function(event) {
            const currentMousePosition = event.clientX - this.offsetLeft
            const positionDifference = currentMousePosition - this.mouseStartPosition
            let displacementPercentage = (positionDifference / this.selectorSize) * 100
            if (this.movingSelector) {
                const limitDecrease = 0 - this.startPosition
                const limitIncrease = 100 - this.endPosition

                if (displacementPercentage < limitDecrease)
                    displacementPercentage = limitDecrease
                else if (displacementPercentage > limitIncrease)
                    displacementPercentage = limitIncrease

                this.startPercentage = this.startPosition + displacementPercentage
                this.endPercentage = this.endPosition + displacementPercentage
            }
            else if (this.movingStart) {
                const limitIncrease = this.endPosition - this.startPosition - 1
                const limitDecrease = -this.startPosition

                if (displacementPercentage > limitIncrease)
                    displacementPercentage = limitIncrease
                else if (displacementPercentage < limitDecrease)
                    displacementPercentage = limitDecrease

                this.startPercentage = this.startPosition + displacementPercentage

            }
            else if (this.movingEnd) {
                const limitIncrease = 100 - this.endPosition
                const limitDecrease = -(this.endPosition - this.startPosition - 1)

                if (displacementPercentage > limitIncrease)
                    displacementPercentage = limitIncrease
                else if (displacementPercentage < limitDecrease)
                    displacementPercentage = limitDecrease

                this.endPercentage = this.endPosition + displacementPercentage
            }
        },
        allowMoveSelector: function(event) {
            this.movingSelector = true
            this.mouseStartPosition = event.clientX - this.offsetLeft
        },
        allowMoveStart: function() {
            this.movingStart = true
            this.mouseStartPosition = event.clientX - this.offsetLeft
        },
        allowMoveEnd: function() {
            this.movingEnd = true
            this.mouseStartPosition = event.clientX - this.offsetLeft
        }
    },
    mounted: function() {
        const timelineSelector = document.querySelector(".timeline__selector-relative")
        this.offsetLeft = timelineSelector.offsetLeft
        this.selectorSize = timelineSelector.clientWidth

        const body = document.getElementsByTagName("body")[0]

        body.addEventListener("mouseup", () => {
            this.movingSelector = false
            this.movingStart = false
            this.movingEnd = false
            this.startPosition = this.startPercentage
            this.endPosition = this.endPercentage
        })

        window.addEventListener("resize", () => {
            this.selectorSize = timelineSelector.clientWidth
        })

        this.timeline.$on("changeSelectedStart", percentage => {

            if (percentage >= this.endPosition)
                return

            this.startPercentage = percentage
            this.startPosition = percentage
        })

        this.timeline.$on("changeSelectedEnd", percentage => {

            if (percentage <= this.startPosition)
                return

            this.endPercentage = percentage
            this.endPosition = percentage
        })

        this.timeline.$on("cut", () => {
            this.$emit("cutPercentages", {
                startPosition: this.startPosition,
                endPosition: this.endPosition
            });

        })
    },
    destroyed: function() {
        window.removeEventListener("resize", () => {})
    }

}
</script>
<style lang="scss">
.selector--wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.selector--resize {
    height: 100%;
    width: 3px;
    background-color: #18A0FB;
    opacity: 1;
    cursor: col-resize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.selector--selected-area {
    height: 100%;
    width: 50%;
    background-color: #18A0FB;
    opacity: .2;
}

.selector--resize-sphere {
    height: 9px;
    width: 9px;
    border-radius: 50%;
    background-color: #18A0FB;

}

.selector--resizable-box {
    height: 100%;
    display: flex;
}
</style>
