<template>
    <div class="cut-downloader__wrapper">
        <div class="cut-downloader__warn-wrapper">
            <div class="cut-downloader__blue-circle">
                <span class="cut-downloader__percentage">
                    {{ !this.error && this.percentage }}%
                </span>
                <span class="cut-downloader__status-message">
                    {{ this.error ? "error" : this.status }}
                </span>
                <div class="cut-downloader__grey-circle">
                    <svg
                        width="100%"
                        height="100%"
                    >
                        <circle
                            class="cut-downloader__loading-circle"
                            :stroke="this.error ? 'red' : '#18A0FB'"
                            :stroke-dasharray="`${this.circumference} ${this.circumference}`"
                            stroke-width="1"
                            fill="transparent"
                            r="80"
                            cx="50%"
                            cy="50%"
                        >
                        </circle>
                    </svg>
                </div>
            </div>
        </div>
        <div class="cut-downloader__button-wrapper">
            <button
                :style="this.error || this.status === 'processing' && 'background-color: #292929'"
                @click="this.emitDownload"
                class="cut-downloader__download"
            >
                DOWNLOAD
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "CutDownloader",
    props: {
        percentage: Number,
        error: Boolean
    },
    data: function() {
        return {
            circumference: "0",
            circle: null
        }
    },
    computed: {
        status: function() {
            if(this.error)
                return "error"

            return this.percentage === 100 ? "complete" : "processing"
        }
    },
    watch: {
        percentage: function(newPercentage) {
            const radius = this.circle.r.baseVal.value
            this.circumference = radius * 2 * Math.PI
            this.setProgress(newPercentage)
        }
    },
    methods: {
        emitDownload: function() {
            if (this.error || this.status === "processing")
                return

            this.$emit("download")
        },
        setProgress: function(percent) {
            const offset = Number(this.circumference) - (percent / 100 * Number(this.circumference))

            this.circle.style.strokeDashoffset = `${offset}`
        }

    },
    mounted: function() {
        this.circle = this.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]

        const radius = this.circle.r.baseVal.value
        this.circumference = radius * 2 * Math.PI
        this.setProgress(this.percentage)
    }


}
</script>
<style lang="scss" scoped>

@keyframes onMount {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.cut-downloader__wrapper {
    position: absolute;
    width: 200px;
    height: 260px;
    background-color: #171717;
    margin-top: 50px;
    margin-right: 150px;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: onMount .2s;
    transform-origin: right top;
}

.cut-downloader__warn-wrapper {
    background-color: #171717;
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cut-downloader__button-wrapper {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cut-downloader__blue-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cut-downloader__grey-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}

.cut-downloader__percentage {
    color: #18A0FB;
    font-size: 40px;
    position: absolute;
    margin-bottom: 28px;
}

.cut-downloader__status-message {
    color: #18A0FB;
    position: absolute;
    margin-top: 28px;
}

.cut-downloader__download {
    height: min-content;
    padding: 10px 20px;
    font-size: 15px;
    background-color: #18A0FB;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    color: #171717;
    outline: none;
}

.cut-downloader__loading-circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>

