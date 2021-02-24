<template>
    <div class="player__wrapper">
        <div class="player__container">
            <div class="player__black-screen" id="player">
            </div>
            <div class="player__info">
                <div class="player__info-content">
                    <PlayerTime :time="this.currentTime"/>
                    <VolumeBar :playerReady="this.playerReady" :player="this.player"/>
                </div>
                <div class="player__info-content">
                    <div class="player__content-actions">
                        <Button
                            @click.native="setSelectedStart"
                            :activated="true"
                        >
                            <template v-slot:activated>
                                <svg
                                    width="12pt"
                                    height="12pt"
                                    viewBox="0 0 8 24"
                                    fill="#18A0FB"
                                >
                                    <g>
                                        <rect id="Rectangle 13" x="2" y="5" width="4" height="15"/>
                                        <circle id="Ellipse 7" cx="4" cy="4" r="4"/>
                                        <circle id="Ellipse 8" cx="4" cy="20" r="4"/>
                                    </g>
                                </svg>
                            </template>
                        </Button>
                        <Button
                            @click.native="playAndPause"
                            :activated="this.playPauseActivated"
                        >
                            <template v-slot:activated>
                                <svg
                                    height="12pt"
                                    width="12pt"
                                    viewBox="-40 0 327 327"
                                    fill="#18A0FB"
                                >
                                    <path
                                        d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
                                    />
                                    <path
                                        d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
                                    />
                                </svg>
                            </template>
                            <template v-slot:unactivated>
                                <svg
                                    height="12pt"
                                    width="12pt"
                                    viewBox="0 0 320.001 320.001"
                                    fill="#18A0FB"
                                >
                                    <path
                                        d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288  c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144  c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"
                                    />
                                </svg>
                            </template>
                        </Button>
                        <Button
                            @click.native="setSelectedEnd"
                            :activated="true"
                        >
                            <template v-slot:activated>
                                <svg
                                    width="12pt"
                                    height="12pt"
                                    viewBox="0 0 8 24"
                                    fill="#18A0FB"
                                >
                                    <g>
                                        <rect id="Rectangle 13" x="2" y="5" width="4" height="15"/>
                                        <circle id="Ellipse 7" cx="4" cy="4" r="4"/>
                                        <circle id="Ellipse 8" cx="4" cy="20" r="4"/>
                                    </g>
                                </svg>
                            </template>
                        </Button>
                    </div>
                </div>
                <div class="player__info-content justify-end">
                    <div
                        v-if="this.showCutName"
                        class="player__video-name--container"
                    >
                        <Form @confirm="this.makeACut">
                            <template v-slot:input>
                                <div
                                    class="form__input-area"
                                >
                                    <input
                                        type="text"
                                        class="form__input-text"
                                        placeholder="Type cut name"
                                        maxlength="20"
                                    />
                                </div>
                            </template>
                            <template v-slot:button>
                                <div
                                    class="form__submit-area"
                                >
                                    <input
                                        value="CUT"
                                        type="submit"
                                        class="form__submit-button"
                                    />

                                </div>
                            </template>
                        </Form>
                    </div>
                    <Button
                        :activated="true"
                        @click.native="confirmCut"
                    >
                        <template v-slot:activated>
                            <div class="player__cut-button">
                              <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2785 1.69717L6.4912 8.80684L8.22995 10.4665L24.396 2.34817L21.2785 1.69717Z" fill="white"/>
<path d="M21.2166 11.8658L5.50297 6.83548L6.97176 4.95713L24.203 10.7986L21.2166 11.8658Z" fill="white"/>
<path d="M8.80523 10.7062C8.93872 11.0541 8.89411 11.5297 8.51895 12.0628C8.14555 12.5933 7.48736 13.1013 6.61037 13.4019C5.73338 13.7026 4.88376 13.7115 4.23736 13.5306C3.58793 13.3488 3.23113 13.0108 3.09764 12.6629C2.96414 12.3149 3.00876 11.8393 3.38392 11.3063C3.75732 10.7757 4.4155 10.2678 5.2925 9.96712C6.16949 9.66647 7.01911 9.65749 7.66551 9.83843C8.31494 10.0202 8.67174 10.3583 8.80523 10.7062Z" stroke="white" stroke-width="2"/>
<path d="M7.65707 4.77576C7.53475 5.12592 7.18928 5.4735 6.54526 5.67315C5.9044 5.87182 5.05434 5.88616 4.16791 5.60949C3.28148 5.33281 2.60759 4.84282 2.2179 4.32249C1.82629 3.7996 1.7677 3.32591 1.89002 2.97574C2.01234 2.62558 2.35782 2.278 3.00183 2.07835C3.64269 1.87968 4.49275 1.86534 5.37918 2.14201C6.26561 2.41868 6.9395 2.90868 7.32919 3.42901C7.72081 3.9519 7.7794 4.42559 7.65707 4.77576Z" stroke="white" stroke-width="2"/>
</svg>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </div>
        <div class="player__timeline-container">
            <Timeline
                :totalSeconds="this.totalTime"
                :currentSecond="this.timeInSeconds"
                :player="this"
                @cutPercentages="this.saveCutData"
                @changeTime="this.changeTime"
            />
        </div>
    </div>
</template>

<script>
import APIStarter from '../services/api.js'
import Form from './Form.vue'
import PlayerTime from './PlayerTime.vue'
import Button from './Button.vue'
import Timeline from './Timeline/Timeline.vue'
import VolumeBar from './VolumeBar.vue'
export default {
    name: 'Player',
    components: {
        PlayerTime,
        Button,
        Timeline,
        VolumeBar,
        Form

    },
    props: {
        videoId: String
    },
    data: function() {
        return {
            showCutName: false,
            player: {},
            timerInterval: 0,
            timeInSeconds: 0,
            playPauseActivated: false,
            totalTime: 0,
            playerReady: false,
            cutData: {}
        }
    },
    watch: {
        videoId: function(newId) {
            this.player.loadVideoById(newId);
        }
    },
    computed: {
        currentTime: function() {

            return this.formatTime(this.timeInSeconds)
        }
    },
    mounted: function() {

        window.onYouTubeIframeAPIReady = () => {


            this.player = new window.YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: this.videoId,
                playerVars: {
                    fs: '0',
                    controls: '0',
                    enablejsapi: '1',
                    showinfo: '0',
                    loop: '1',
                    modestbranding: '1',
                    rel: '0'
                },
                events: {
                    'onReady': window.onPlayerReady,
                    'onStateChange': window.onStateChange
                }
            });

        }

        window.onStateChange = state => {
            clearInterval(this.timerInterval)

            if(state.data === 1) {
                this.totalTime = this.player.getDuration()
                this.playPauseActivated = true
                this.timerInterval = setInterval(() => {
                    if(this.player.getCurrentTime)
                        this.timeInSeconds = this.player.getCurrentTime()
                }, 50);
            }
            else if (state.data === 2 || state.data === 0) {
                this.playPauseActivated = false
            }
        }

        window.onPlayerReady = () => {
            this.playerReady = true
        }

        const cuts = localStorage.cuts

        if (!cuts)
            localStorage.cuts = JSON.stringify([])

    },
    methods: {
        playAndPause: function() {
            if(!this.player.playVideo)
                return

            if(this.playPauseActivated)
                this.player.pauseVideo()
            else
                this.player.playVideo()

            this.playPauseActivated = !this.playPauseActivated

        },
        changeTime: function(newTime) {
            clearInterval(this.timerInterval)
            this.timeInSeconds = newTime
            this.player.seekTo(newTime)
        },
        setSelectedStart: function() {
            this.$emit('changeSelectedStart', {})
        },
        setSelectedEnd: function() {
            this.$emit('changeSelectedEnd', {})
        },
        confirmCut: function() {
            this.$emit('cut', {})
        },
        formatTime: function(time) {
            const seconds = Math.floor(time % 60)
            const minutes = Math.floor((time / 60) % 60)
            const hours = Math.floor(time / (60 * 60))
            const finalTime = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
            const invalid = isNaN(seconds) || isNaN(minutes) || isNaN(hours)

            if(invalid)
                return '00:00:00'

            return finalTime
        },
        saveCutData: function(percentages) {

            if(!this.videoId)
                return

            let startTime = this.totalTime * percentages.startPosition / 100;

            if (startTime >= 0.5)
                startTime = startTime - 0.5

            let endTime = this.totalTime * percentages.endPosition / 100

            if (endTime <= this.totalTime - 0.5)
                endTime = endTime + 0.5

            startTime = this.formatTime(startTime)
            endTime = this.formatTime(endTime)

            const cutProps = {
                videoName: "Default",
                youtubeId: this.videoId,
                startTime,
                endTime,
                format: "mp4",
                quality: "1080p"
            }

            this.cutData = cutProps

            this.showCutName = true
        },
        makeACut: async function() {
            const api = APIStarter()
            const cutName = document.querySelector(".form__input-text").value

            const cutMeta = {
                ...this.cutData,
                videoName: cutName
            }

            this.showCutName = false
            const response = await api.makeACut(cutMeta)

            if (response.status === 201) {
                const cutList = JSON.parse(localStorage.cuts)

                cutList.push({ ...response.data })

                localStorage.cuts = JSON.stringify(cutList)
            }

        }
    }
}
</script>

<style lang="scss">
.player__container {
    background-color: #171717;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    height: 36vw;
    width: 64vw;
    max-height: 540px;
    max-width: 960px;
}

.player__info {
    width: 100%;
    padding-top: 10px;
    display: flex;
}

.player__controls {
    color: white;
    justify-self: center;
    align-self: center;
}

.player__info-content {
    width: 100%;
    display: flex;
    align-items: center;
}

.player__content-actions {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.player__black-screen {
    background-color: black;
    width: 100%;
    height: 100%;
}

.player__timeline-container {
    margin-top: 10px;
    width: 100%;
    height: 10vh;
}

.justify-end {
    justify-content: flex-end;
}

.player__cut-button {
    height: 25px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #18A0FB;
    border-radius: 50%;
}

.player__video-name--container {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 100;
}

.form__input-area {
    width: 100%;
    margin-bottom: 10px;
}

.form__input-text {
    box-sizing: border-box;
    background-color: black;
    border: none;
    padding: 10px;
    width: 100%;
    color: #18A0FB;
    outline: none;
    border-radius: 20px;
    text-align: center;
}

.form__submit-area {
    width: 100%;
}

.form__submit-button {
    box-sizing: border-box;
    width: 100%;
    border: solid 1px transparent;
    border-radius: 10px;
    background-color: #18A0FB;
    padding: 10px;
    color: black;
    font-weight: bolder;
    transition: background-color .15s, color .15s;

    &:hover {
        background-color: black;
        color: #18A0FB;
        border: solid 1px #18A0FB;
    }
}
</style>
