<template>
  <div class="w-full h-screen flex flex-col">
    <LayoutHeader />
    <main class="w-full h-full max-w-screen-2xl mx-auto overflow-y-auto">
      <slot></slot>
    </main>
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import LayoutFooter from '@/components/shared/Footer.vue';
import LayoutHeader from '@/components/shared/Header.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "DefaultLayout",
  mixins: [lifecycleLoggerMixin],
  components: {
    LayoutHeader,
    LayoutFooter
  }
})


</script>

<style scoped>
/* Default layout styles */
</style>