<template>
    <div
        class="button__container"
    >
        <slot
            name="unactivated"
            v-if="!this.activated"
        />
        <slot
            name="activated"
            v-else
        />
    </div>
</template>
<script>
export default {
    name: 'Button',
    props: ['activated']
}
</script>
<style>

.button__container {
    width: min-content;
    height: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    min-height: 20px;
    min-width: 20px;
}

</style>
