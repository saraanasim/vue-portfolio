<template>
  <LayoutHeader />
  <main>
    <slot></slot>
  </main>
  <LayoutFooter />
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