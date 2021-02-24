<template>
    <div class="cuts__container">
        <div class="cuts__title-area">
            <span class="cuts__title">CUTS</span>
        </div>
        <div class="cuts__fixes-area">
            <div class="cuts__icon-area">
                <template v-for="meta in this.cutsMeta">
                    <Cut :meta="meta" :key="meta.hash"/>
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
    data: function() {
        return {
            cutsMeta: []
        }
    },
    created: function() {
        const cuts = localStorage.cuts
        this.cutsMeta = JSON.parse(cuts)
        console.log(this.cutsMeta)
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
    height: max-content;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
}

.cuts__fixes-area {
    overflow: auto;
    height: 100%;
}
</style>
