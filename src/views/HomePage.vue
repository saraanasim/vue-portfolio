<template>
    <SectionContainer title="/ARCHIVES/ASSET/INFO">
        Home Page Content
    </SectionContainer>
</template>

<script lang="ts">
import SectionContainer from '@/components/shared/SectionContainer.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';

export default {
    name: "HomePage",
    components: {
        SectionContainer
    },
    mixins: [lifecycleLoggerMixin],
}
</script>