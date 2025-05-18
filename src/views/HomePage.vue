<template>
    <SectionContainer title="/ARCHIVES/ASSET/INFO">
        <template #buttons>
            <ConnectButton />
            <DownloadButton />
        </template>
        <div class="w-full h-full flex ">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-3 gap-2">
                <div
                    class="col-span-3 lg:col-span-2 flex flex-col justify-center border-t-4 border-green-hl relative overflow-hidden">
                    <AssetImage :imageSrc="myImage" />
                    <div class="cyber-scanline"></div>
                </div>
                <div class="col-span-3 lg:col-span-1 overflow-y-auto max-h-screen lg:max-h-full">
                    <div class="grid grid-cols-2 gap-2">
                        <SelectableIconItem v-for="tech in TECHNOLOGIES" :key="tech.heading" :rating="tech.rating"
                            :heading="tech.heading" :subHeading="tech.subHeading" :imageUrl="tech.imageUrl"
                            @click="navigateToProjectsWithTech(tech.heading)" />
                    </div>
                </div>
            </div>
            <div class="h-full w-4 border-y-2 border-r-2 border-dimmest-text"></div>
        </div>
    </SectionContainer>
</template>

<script lang="ts">
import AssetImage from '@/components/home/AssetImage.vue';
import ConnectButton from '@/components/shared/ConnectButton.vue';
import DownloadButton from '@/components/shared/DownloadButton.vue';
import SectionContainer from '@/components/shared/SectionContainer.vue';
import SelectableIconItem from '@/components/shared/SelectableIconItem.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';
import { TECHNOLOGIES } from '@/utils/constants';
import myImage from '@/assets/images/saraan-1.png';

export default {
    name: "HomePage",
    components: {
        SectionContainer,
        AssetImage,
        SelectableIconItem,
        ConnectButton,
        DownloadButton
    },
    data() {
        return {
            TECHNOLOGIES,
            myImage
        };
    },
    methods: {
        navigateToProjectsWithTech(technology: string) {
            this.$router.push({
                name: 'projects',
                query: { tech: technology }
            });
        }
    },
    mixins: [lifecycleLoggerMixin],
};
</script>

<style scoped>
.cyber-scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 229, 255, 0.5);
    opacity: 0;
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.8);
    z-index: 2;
    animation: scan 1.5s linear infinite;
}

.col-span-3:hover .cyber-scanline {
    opacity: 1;
}

@keyframes scan {
    0% {
        top: 0;
    }

    100% {
        top: 100%;
    }
}
</style>
