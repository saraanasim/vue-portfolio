<template>
    <div :class="[
        'col-span-2 md:col-span-1 lg:col-span-2 w-full flex gap-4 relative p-4 bg-gray-bg hover:bg-blue-hl border hover:cursor-pointer border-dimmest-text',
        { '!bg-blue-hl': selected }
    ]">
        <div class="relative h-fit">
            <!-- Image with corner borders -->
            <img :src="imageUrl" alt="Asset Image" class="object-fit h-full max-h-[72px] max-w-[72px]" />

            <!-- Corner borders using Tailwind -->
            <!-- <div class="absolute top-0 left-0 w-[15px] h-[15px] border-t-2 border-l-2 border-lt-blue-hl"></div>
            <div class="absolute top-0 right-0 w-[15px] h-[15px] border-t-2 border-r-2 border-lt-blue-hl"></div>
            <div class="absolute bottom-0 left-0 w-[15px] h-[15px] border-b-2 border-l-2 border-lt-blue-hl"></div>
            <div class="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-2 border-r-2 border-lt-blue-hl"></div> -->
        </div>

        <div class="flex flex-col gap-2">
            <div>
                <p class="text-[10px]">{{ subHeading }}</p>
                <p class="text-lt-blue-hl font-bold">{{ heading }}</p>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'SelectableIconItem',
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
        selected: {
            type: Boolean,
            default: false, // Added default value
        },
    },
};
</script>
