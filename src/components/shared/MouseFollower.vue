<template>
    <div class="glow-area" :style="{ top: `${mouseY}px`, left: `${mouseX}px` }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    name: 'MouseFollower',
    setup() {
        const mouseX = ref(0);
        const mouseY = ref(0);

        const updateMousePosition = (event: MouseEvent) => {
            mouseX.value = event.clientX;
            mouseY.value = event.clientY;
        };

        onMounted(() => {
            window.addEventListener('mousemove', updateMousePosition);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('mousemove', updateMousePosition);
        });

        return { mouseX, mouseY };
    },
});
</script>

<style scoped>
.glow-area {
    position: fixed;
    width: 150px;
    /* Adjust size */
    height: 150px;
    /* Adjust size */
    background-color: rgba(66, 184, 255, 0.5);
    /* More opaque */
    border-radius: 50%;
    /* Keep it circular */
    pointer-events: none;
    /* Ignore mouse events */
    transform: translate(-50%, -50%);
    /* Center the glow */
    box-shadow:
        0 0 60px rgba(66, 184, 255, 0.6),
        /* Main glow */
        0 0 100px rgba(66, 184, 255, 0.4);
    /* Soft outer glow */
    transition: background-color 0.2s ease;
    filter: blur(60px);
    /* Smooth transition */
}
</style>
