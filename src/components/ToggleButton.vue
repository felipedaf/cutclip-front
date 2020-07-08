<template>
    <div @click="toggleNow" :style="this.putSize" class="toggle__wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ToggleButton',
    props: [ 'size' ],
    data() {
        return {
            isActivated: false
        }
    },
    computed: {
        putSize() {
            return `width: ${this.size}; height: ${this.size}`
        }
    },
    methods: {
        toggleNow() {
            this.isActivated = !this.isActivated
            this.$emit('toggle', this.isActivated)
        }
    }
}
</script>

<style>

.toggle__wrapper {
    border: 2px solid #18A0FB;
    background-color: #18A0FB;
    border-radius: 5px;
}

</style>