<template>
    <div :class="[
        'cyber-selectable col-span-2 md:col-span-1 lg:col-span-2 w-full flex gap-4 relative p-4 border hover:cursor-pointer',
        { 'cyber-selected': selected }
    ]">
        <div class="relative h-fit cyber-image-container">
            <!-- Image with cyber frame -->
            <img :src="imageUrl" alt="Asset Image" class="object-fit h-full max-h-[72px] max-w-[72px] z-10 relative" />

            <!-- Cyber corner borders -->
            <div class="absolute top-0 left-0 w-[15px] h-[15px] border-t-2 border-l-2 border-cyan cyber-corner"></div>
            <div class="absolute top-0 right-0 w-[15px] h-[15px] border-t-2 border-r-2 border-cyan cyber-corner"></div>
            <div class="absolute bottom-0 left-0 w-[15px] h-[15px] border-b-2 border-l-2 border-cyan cyber-corner">
            </div>
            <div class="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-2 border-r-2 border-cyan cyber-corner">
            </div>
        </div>

        <div class="flex flex-col gap-2 cyber-text">
            <div>
                <p class="text-[10px] font-mono text-dimmest-text">{{ subHeading }}</p>
                <p class="text-cyan font-bold font-mono">{{ heading }}</p>
                <slot></slot>
            </div>
        </div>

        <!-- Scan line effect -->
        <div class="cyber-scanline"></div>
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
            default: false,
        },
    },
};
</script>

<style scoped>
.cyber-selectable {
    background-color: #021114;
    border-color: #00E5FF;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
}

.cyber-selectable:hover {
    background-color: rgba(0, 229, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
}

.cyber-selected {
    background-color: rgba(0, 229, 255, 0.15);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.5), inset 0 0 10px rgba(0, 229, 255, 0.2);
}

.cyber-image-container {
    padding: 5px;
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
    background-color: #011518;
}

.cyber-corner {
    transition: all 0.3s ease;
}

.cyber-selectable:hover .cyber-corner {
    box-shadow: 0 0 5px #00E5FF;
}

.cyber-scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 229, 255, 0.5);
    opacity: 0;
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.8);
    z-index: 1;
    animation: scan 1.5s linear infinite;
}

.cyber-selectable:hover .cyber-scanline,
.cyber-selected .cyber-scanline {
    opacity: 1;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
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
