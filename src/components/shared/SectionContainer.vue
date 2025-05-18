<template>
    <div class="cyber-container w-full h-full flex flex-col gap-4 px-2 sm:px-4">
        <div class="hidden sm:grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div class="col-span-1 flex justify-center">
                <TextLogo />
            </div>
            <div class="col-span-1 lg:col-span-2 flex items-end">
                <div class="w-full grid grid-cols-2 gap-2 border-b-[0.1rem] border-cyan py-2">
                    <div
                        class="col-span-2 lg:col-span-1 border-b-[0.1rem] lg:border-b-0 border-x-[0.1rem] border-t-[0.1rem] border-cyan rounded-[2px] cyber-title-panel">
                        <div class="status-bar">
                            <div class="status-item">SYSTEM</div>
                            <div class="status-item blink">ACTIVE</div>
                        </div>
                        <span class="block ml-2 font-bold text-lg text-cyan font-mono">
                            {{ title }}
                        </span>
                    </div>
                    <!-- Buttons Slot -->
                    <div class="col-span-2 lg:col-span-1 flex gap-2 cyber-controls">
                        <slot name="buttons">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 cyber-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { ButtonVariants } from '@/utils/constants';
import { defineComponent } from 'vue';
import TextLogo from './TextLogo.vue';

export default defineComponent({
    name: 'SectionContainer',
    components: {
        TextLogo
    },
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        return {
            ButtonVariants,
        };
    },
});
</script>

<style scoped>
.cyber-container {
    position: relative;
    background-color: #021114;
    color: #00E5FF;
}

.cyber-panel {
    background-color: #011518;
    border: 1px solid #00E5FF;
    box-shadow: 0 0 10px #00E5FF40;
    padding: 0.5rem;
    position: relative;
    overflow: hidden;
}

.cyber-image {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 5px #00E5FF);
}

.cyber-title-panel {
    background-color: #011518;
    position: relative;
    box-shadow: inset 0 0 5px #00404080;
}

.cyber-controls {
    background-color: #00303C;
    border: 1px solid #00E5FF;
    padding: 0.5rem;
}

.cyber-content {
    position: relative;
    border: 1px solid #00E5FF;
    background-color: #011518;
    box-shadow: 0 0 15px #00E5FF30;
    padding: 1rem;
    min-height: 200px;
    overflow: hidden;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
}

.status-bar {
    background-color: #00303C;
    display: flex;
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-family: monospace;
    border-bottom: 1px solid #00E5FF50;
}

.status-item {
    margin-right: 1rem;
}

.blink {
    animation: blink 1s step-end infinite;
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0.3;
    }
}
</style>
