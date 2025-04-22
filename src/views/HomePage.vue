<template>
    <SectionContainer title="/ARCHIVES/ASSET/INFO">
        <template #buttons>
            <BaseButton :variant="ButtonVariants.TypeWriter" :isActive="true" @click="openConnectModal">Connect
            </BaseButton>
            <BaseButton :variant="ButtonVariants.TypeWriter" @click="downloadResumeFile">Download</BaseButton>
        </template>
        <div class="w-full h-full flex ">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-3 gap-2">
                <div class="col-span-3 lg:col-span-2 flex flex-col justify-center border-t-4 border-green-hl">
                    <AssetImage imageSrc="/src/assets/images/saraan-1.png" />
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

        <!-- Connect Modal -->
        <ConnectModal v-model="isConnectModalOpen" />
    </SectionContainer>
</template>

<script lang="ts">
import AssetImage from '@/components/home/AssetImage.vue';
import ConnectModal from '@/components/shared/ConnectModal.vue';
import SectionContainer from '@/components/shared/SectionContainer.vue';
import SelectableIconItem from '@/components/shared/SelectableIconItem.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';
import { ButtonVariants, TECHNOLOGIES } from '@/utils/constants';
import { downloadResume } from '@/utils/helpers';
import BaseButton from '../components/shared/BaseButton.vue';

export default {
    name: "HomePage",
    components: {
        SectionContainer,
        AssetImage,
        SelectableIconItem,
        BaseButton,
        ConnectModal
    },
    data() {
        return {
            TECHNOLOGIES,
            ButtonVariants,
            isConnectModalOpen: false
        };
    },
    methods: {
        openConnectModal() {
            this.isConnectModalOpen = true;
        },
        downloadResumeFile() {
            downloadResume();
        },
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
