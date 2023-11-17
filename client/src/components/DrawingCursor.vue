<script setup>
    import CursorIcon from './icons/CursorIcon.vue';

    defineProps({
        name: String,
        posX: Number,
        posY: Number
    })

</script>

<template>
    <div :class="$attrs.class">
        <span class="cursor-label">{{ `${name} (x: ${posX}, y: ${posY})` }}</span>
        <CursorIcon />
    </div>
</template>

<style scoped>
.cursor-label {
    position: absolute;
    display: block;
    width: max-content;
    font-size: 10px;
    line-height: 10px;
    height: 10px;
    top: 0;
    left: 0;
    transform: translate(16px, -100%);
    background-color: white;
    color: #333;
}
</style>