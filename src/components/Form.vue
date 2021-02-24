<template>
    <form
        @submit.prevent="sendInput"
        class="form__wrapper"
    >
        <div class="form__container">
            <slot ref="inputs" name="input">
            </slot>
            <slot name="button">
            </slot>
        </div>
    </form>
</template>

<script>
export default {
    name: "Form",
    methods: {
        sendInput: function() {
            this.$emit("confirm")
        }
    }
}
</script>

<style lang="scss">
.form__wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade .5s;
}

.form__container {
    width: 200px;
    background-color: #171717;
    margin-bottom: 25vh;
    padding: 10px;
    border-radius: 10px;
    animation: appear .5s;
}

@keyframes fade {
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    100% {
        background-color: rgba(0, 0, 0, .9);
    }
}

@keyframes appear {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}


</style>
