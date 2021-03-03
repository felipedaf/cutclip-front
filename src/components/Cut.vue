<template>
    <div
        class="cut__container"
        @click="this.showDownloader"
        @blur="this.hideDownloader"
        tabindex="0"
    >
        <CutDownloader
            v-if="this.withDownloader"
            @download="this.downloadCut"
            :percentage="this.percentage"
            :error="this.error"
        />
        <svg
            viewBox="-21 -117 682.66672 682"
            class="cut__svg"
        >
            <path fill="#18A0FB" d="m626.8125 64.035156c-7.375-27.417968-28.992188-49.03125-56.40625-56.414062-50.082031-13.703125-250.414062-13.703125-250.414062-13.703125s-200.324219 0-250.40625 13.183593c-26.886719 7.375-49.03125 29.519532-56.40625 56.933594-13.179688 50.078125-13.179688 153.933594-13.179688 153.933594s0 104.378906 13.179688 153.933594c7.382812 27.414062 28.992187 49.027344 56.410156 56.410156 50.605468 13.707031 250.410156 13.707031 250.410156 13.707031s200.324219 0 250.40625-13.183593c27.417969-7.378907 49.03125-28.992188 56.414062-56.40625 13.175782-50.082032 13.175782-153.933594 13.175782-153.933594s.527344-104.382813-13.183594-154.460938zm-370.601562 249.878906v-191.890624l166.585937 95.945312zm0 0"/>
        </svg>
        <span>{{ this.meta.name }}</span>
    </div>
</template>
<script>
import APIStarter from "../services/api.js"
import CutDownloader from "./CutDownloader.vue"
import io from "socket.io-client"
export default {
    name: "Cut",
    props: {
        meta: Object
    },
    data: function() {
        return {
            withDownloader: false,
            percentage: 0,
            error: false
        }
    },
    components: {
        CutDownloader
    },
    methods: {
        downloadCut: async function() {
            const api = APIStarter()

            const response = await api.getACut(this.meta.hash)
            const blob = new Blob([response.data], { type: "video/mp4" })
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `${this.meta.name}.mp4`)
            document.body.appendChild(link)
            link.click()
        },
        showDownloader: function() {
            this.withDownloader = true
            this.$el.focus()
        },
        hideDownloader: function(event) {
            if(!event.relatedTarget) {
                this.withDownloader = false
                return
            }

            const isButton = event.relatedTarget.nodeName === "BUTTON"

            if(!isButton) {
                this.withDownloader = false
            }
        }

    },
    created: function() {
        const socket = io("http://localhost:8000")
        socket.emit(`processing`, { hash: this.meta.hash })
        socket.on("newPercentage", data => {
            const percentage = data.percentage

            if (percentage === "error")
                this.error = true


            const formatedPercentage = percentage.split(".")[0]

            this.percentage = Number(formatedPercentage)

            if (percentage === 99.9) {
                this.percentage = 100
            }
        })

    }
}
</script>
<style lang="scss" scoped>

.cut__container {
    box-sizing: border-box;
    width: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    height: 130px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    font-weight: 100;
    flex-direction: column;
    word-wrap: break-word;
    text-align: center;
    transition: background-color .15s;
    outline: none;

    &:hover {
        background-color: rgba(24, 160, 251, .2);
    }

}

.cut__svg {
    width: 80px;
}
</style>
