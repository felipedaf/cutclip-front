<template>
    <form @submit="this.prevent" class="search__bar">
        <input :placeholder="this.placeholder" type="text" class="search__bar-input--text">
        <input @click="this.emitVideoId" value="SELECT" type="button" class="search__bar-input--button">
        <div class="tooltip__container-searchbar">
            <Tooltip
                message="This is not a youtube link!"
                :appear="this.showLinkMessage"
            />
        </div>
    </form>
</template>

<script>
import Tooltip from './Tooltip.vue'
export default {
    name: 'SearchBar',
    components: {
        Tooltip
    },
    props: {
        placeholder: String
    },
    data: function() {
        return {
            showLinkMessage: false
        }
    },
    methods: {
        emitVideoId: function() {
            const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;

            const input = document.querySelector('.search__bar-input--text').value;

            if(input.match(regex)) {
                const videoId = input.split('v=')[1].split('&')[0];
                this.$emit('idChange', videoId);
            } else {
                this.showLinkMessage = true;

                setTimeout(() => {
                    this.showLinkMessage = false;
                }, 3000);

            }

        },
        prevent: function(event) {
            event.preventDefault();

            this.emitVideoId();
        }
    }
}
</script>

<style lang='scss' scoped>
    .search__bar {
        height: 30px;
        width: calc(40vw + 100px);
        margin: auto;
    }

    .search__bar-input--text {
        background-color: #171717;
        border-radius: 20px;
        border: none;
        height: 100%;
        width: 40vw;
        color: white;
        padding: 0 90px 0 10px;
        font-weight: 300;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
        outline: none;
    }

    .search__bar-input--button {
        width: 90px;
        height: 100%;
        position: relative;
        bottom: 100%;
        border: none;
        border-radius: 20px;
        left: calc(40vw + 10px);
        background-color: #18A0FB;
        box-shadow: 0 0 1px 0 #18A0FB inset, 0 0 1px 0 #18A0FB;
        padding: 0 2vw 0 2vw;
        transition: background-color .2s, color .2s;
        outline: none;
    }

    .search__bar-input--button:hover {
        background-color: #171717;
        color: #18A0FB;
    }

    .tooltip__container-searchbar {
        position: relative;
        top: -10px;

    }

    @media (min-width: 769px) {
        .search__bar {
            width: 420px;
        }

        .search__bar-input--text {
            width: 300px;
            padding: 0 110px 0 10px;
        }

        .search__bar-input--button {
            width: 110px;
            padding: 0 10px 0 10px;
            left: 310px;
        }
    }


</style>
