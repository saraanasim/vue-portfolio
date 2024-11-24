<template>
    <div class="col-span-2 md:col-span-1 lg:col-span-2 w-full flex gap-4 relative p-4 bg-gray-bg hover:bg-blue-hl">
        <div class="relative h-fit">
            <!-- Image with corner borders -->
            <img :src="imageUrl" alt="Asset Image" class="object-fit h-full max-h-[72px]" />

            <!-- Corner borders using Tailwind -->
            <div class="absolute top-0 left-0 w-[15px] h-[15px] border-t-2 border-l-2 border-lt-blue-hl"></div>
            <div class="absolute top-0 right-0 w-[15px] h-[15px] border-t-2 border-r-2 border-lt-blue-hl"></div>
            <div class="absolute bottom-0 left-0 w-[15px] h-[15px] border-b-2 border-l-2 border-lt-blue-hl"></div>
            <div class="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-2 border-r-2 border-lt-blue-hl"></div>
        </div>

        <div class="flex flex-col gap-2">
            <div>
                <p class="text-[10px]">{{ subHeading }}</p>
                <p class="text-lt-blue-hl font-bold">{{ heading }}</p>
            </div>
            <!-- Rating blocks -->
            <div class="flex gap-1 mt-2">
                <div v-for="n in 10" :key="n" class="w-3 h-5 rounded-sm" :style="getBlockStyle(n)"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'IconItem',
    props: {
        imageUrl: {
            type: String,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        subHeading: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    methods: {
        getBlockStyle(index: number) {
            const fillPercentage = this.rating >= index ? 1 : 0;
            const color = this.getGradientColor(index);
            return {
                backgroundColor: fillPercentage ? color : '#ddd',
            };
        },
        getGradientColor(index: number) {
            const redStart = [130, 35, 1];
            const greenEnd = [134, 184, 27];
            const factor = (index - 1) / 9;
            const red = Math.round(redStart[0] + factor * (greenEnd[0] - redStart[0]));
            const green = Math.round(redStart[1] + factor * (greenEnd[1] - redStart[1]));
            const blue = Math.round(redStart[2] + factor * (greenEnd[2] - redStart[2]));
            return `rgb(${red}, ${green}, ${blue})`;
        },
    },
};
</script>