<template>
    <span class="player__time noselect">{{ this.time || '00:00:00' }}</span>
</template>
<script>
export default {
    name: 'PlayerTime',
    props: ['time']
}
</script>
<style lang="scss">

.player__time {
    color: #18A0FB;
    font-size: 18px;
    cursor: default;
    font-weight: 100;
}

.noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

}

</style>
