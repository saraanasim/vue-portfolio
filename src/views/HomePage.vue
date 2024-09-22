<template>
    <SectionContainer title="/ARCHIVES/ASSET/INFO">
        <div class="w-full h-full flex">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-3 gap-2">
                <div class="col-span-3 lg:col-span-2 flex flex-col border-t-4 border-maroon-hl">
                    <div>Icon</div>
                    <AssetImage imageSrc="/src/assets/images/saraan-1.png" />

                </div>
                <div class="col-span-3 lg:col-span-1 ">Right Stats saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </div>
            </div>
            <div class="h-full w-4 border-y-2 border-r-2 border-dimmest-text"></div>
        </div>

    </SectionContainer>
</template>

<script lang="ts">
import AssetImage from '@/components/home/AssetImage.vue';
import SectionContainer from '@/components/shared/SectionContainer.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';

export default {
    name: "HomePage",
    components: {
        SectionContainer,
        AssetImage
    },
    mixins: [lifecycleLoggerMixin],
}
</script>