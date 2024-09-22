<template>
  <AppLoader v-if="showLoader" />
  <component v-else :is="$route.meta.layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppLoader from './components/shared/AppLoader.vue';
import { shouldShowAppLoader, setShowAppLoader } from './utils/helpers';
import { APP_LOADER_DURATION } from './utils/constants';
const showLoader = ref(false);

// Function to handle the display of the loader
const handleLoaderDisplay = () => {
  if (shouldShowAppLoader()) {
    showLoader.value = true;

    // Hide the loader after a delay
    setTimeout(() => {
      showLoader.value = false;
      setShowAppLoader(new Date().getTime()); // Update last shown time
    }, APP_LOADER_DURATION); // Adjust the duration based on actual use case
  }
};

// On mount, check if the loader should be displayed
onMounted(() => {
  handleLoaderDisplay();
});
</script>

<style scoped>
/* Add your styles here */
</style>
