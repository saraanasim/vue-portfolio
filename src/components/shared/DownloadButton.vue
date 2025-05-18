<template>
    <BaseButton :variant="ButtonVariants.TypeWriter" @click="downloadResumeFile">Download</BaseButton>
</template>

<script lang="ts">
import BaseButton from './BaseButton.vue';
import { ButtonVariants } from '@/utils/constants';
import { downloadResume } from '@/utils/helpers';

export default {
    name: 'DownloadButton',
    components: {
        BaseButton
    },
    setup() {
        const downloadResumeFile = () => {
            downloadResume();
        };

        return {
            ButtonVariants,
            downloadResumeFile
        };
    }
};
</script>