<template>
    <div class="cuts__container">
        <div class="cuts__title-area">
            <span class="cuts__title">CUTS</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Cuts"
}

</script>
<style lang="scss">
.cuts__container {
    height: 36vw;
    width: 22vw;
    padding: 10px;
    background-color: #171717;
    max-height: 540px;
    max-width: 500px;
    border-radius: 10px;

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
</style>
