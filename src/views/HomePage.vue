<template>
    <div class="text-primary">
        Home Page
    </div>
</template>

<script lang="ts">
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';

export default {
    name: "HomePage",
    mixins: [lifecycleLoggerMixin],
}
</script>