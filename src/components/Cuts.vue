<template>
    <div class="cuts__container">
        <div class="cuts__title-area">
            <span class="cuts__title">CUTS</span>
        </div>
        <div class="cuts__fixes-area">
            <div class="cuts__icon-area">
                <template v-for="cut in this.cutList">
                    <Cut :meta="cut" :key="cut.hash"/>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Cut from "./Cut.vue"
export default {
    name: "Cuts",
    components: {
        Cut
    },
    props: {
        cutList: Array
    }

}

</script>
<style lang="scss" scoped>
.cuts__container {
    height: 36vw;
    width: 22vw;
    padding: 10px;
    background-color: #171717;
    max-height: 540px;
    max-width: 500px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

}

.cuts__title-area {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px 0;
}

.cuts__title {
    font-size: 40px;
    font-weight: 900;
    color: #292929;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
}

.cuts__icon-area {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
}

.cuts__fixes-area {
    overflow: auto;
    scrollbar-width: thin;
    height: 100%;

}
</style>
