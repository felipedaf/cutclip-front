<template>
    <transition name="enter">
        <div class="menu__body"></div>
    </transition>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style lang="scss">


.menu__body {
    width: 30vw;
    height: 100%;
    background-color: black;
}

</style>