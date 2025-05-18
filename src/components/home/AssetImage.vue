<template>
    <div class="relative w-full h-fit uppercase overflow-hidden">
        <img :src="imageSrc" alt="Asset Image" class="object-cover w-full h-full max-h-[480px]" />
        <div class="absolute inset-0 flex bg-black bg-opacity-50">
            <div class="w-full mx-4 my-2 border-2 border-dimmest-text grid grid-cols-2 text-white-text font-bold">
                <div class="col-span-1 flex flex-col justify-start items-start pt-2 pl-2 ">
                    <p class="text-xs sm:text-sm md:text-base text-lt-blue-hl">/FULL_STACK_DEV</p>
                </div>
                <div class="col-span-1 flex justify-end pt-2 pr-2">
                    <div class="flex flex-col items-end gap-2">
                        <p class="text-xs sm:text-sm md:text-base">V:1 (V1.1)</p>
                        <!-- <div
                            class="flex flex-col bg-gray-bg border-2 border-t-black-bg border-l-black-bg border-r-dim-text border-b-dim-text py-2 px-4">
                            <p>Rerouting</p>
                            <p>Source to</p>
                            <p>External Monitor</p>
                        </div> -->
                    </div>
                </div>
                <div class="col-span-1 flex justify-start items-end pb-2 pl-2">
                    <p class="text-xs sm:text-sm md:text-base">DS455DXGFV75454DFFD</p>
                </div>
                <div class="col-span-1 flex justify-end items-end pb-2 pr-2">
                    <div class="flex gap-2 md:gap-4 flex-wrap justify-end">
                        <p class="text-xs sm:text-sm md:text-base">EXT_CODE_003_TEST_RAW</p>
                        <p class="text-xs sm:text-sm md:text-base">ATC 14:33:28:10</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AssetImage',
    props: {
        imageSrc: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
/* No additional styles needed for now */
</style>