<template>
    <div :class="this.containerClass">
        <div :class="this.triangleTopClass">
        </div>
        {{ this.show() }}
    </div>

</template>
<script>
export default {
    name: "Tooltip",
    props: ['content', 'message', 'appear'],
    data: () => {
        return {
            isMounted: false,
            showContent: false
        }
    },
    computed: {
        containerClass: function() {
            return this.isMounted
                ? "tooltip__container"
                : "tooltip__container--hide"
        },

        triangleTopClass: function() {
            return this.isMounted
                ? "tooltip__triangle-top"
                : "tooltip__triangle-top--hide"
        }

    },
    methods: {
        show: function() {
            if (this.showContent) {
                return this.content || this.message
            }
        }
    },
    watch: {
        appear: function(newAppear) {
            if(!newAppear) {
                setTimeout(() => {
                    this.isMounted = false
                    this.showContent = false
                }, 0);
            } else {
                setTimeout(() => {
                    this.isMounted = true
                    this.showContent = true
                }, 0);

            }
        }
    },
    mounted: function() {
    }

}
</script>
<style land="scss">

    .tooltip__container {
        display: flex;
        justify-content: center;
        color: #171717;
        padding: 20px;
        border-radius: 10px;
        position: absolute;
        background-color: #18A0FB;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
        opacity: 100%;
        transform: scale(1);
        transition: width .2s, opacity .2s, transform .3s, padding .3s;

    }

    .tooltip__container--hide {
        display: flex;
        justify-content: center;
        color: #171717;
        padding: 0px;
        border-radius: 10px;
        background-color: #18A0FB;
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        transform: scale(0);
        transition: height .2s, width .2s, opacity .2s, transform .3s, padding .3s;

    }

    .tooltip__triangle-top {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid #18A0FB;
        position: absolute;
        top: -10px;
        left: 5px;
        opacity: 100%;
        transform: scale(1);
        transform-origin: center bottom;
        transition: opacity .1s, transform .2s;
        transition-delay: .2s;
    }

    .tooltip__triangle-top--hide {
        position: absolute;
        top: -10px;
        left: 5px;
        opacity: 0;
        transform: scale(0);
        transform-origin: center bottom;
        transition: opacity .1s, transform .2s;
    }

</style>
