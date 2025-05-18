<template>
    <div class="app-loader">
        <div class="loader-container">
            <Loader class="loader" :size="LoaderSizes.LARGE" />
        </div>
    </div>
</template>

<script lang="ts">
import { LoaderSizes } from '@/utils/constants';
import { defineComponent } from 'vue';
import Loader from './Loader.vue';

export default defineComponent({
    name: 'AppLoader',
    components: {
        Loader
    },
    data() {
        return {
            LoaderSizes
        };
    },
});
</script>

<style scoped>
.app-loader {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #021114;
    overflow: hidden;
    /* Ensure grid doesn't overflow the container */
}

.loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    width: fit-content;
    height: fit-content;
    background-color: #021114;
}
</style>
