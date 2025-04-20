<template>
    <button :class="[
        'p-0 w-full h-full min-size-1 max-h-10 transition-transform duration-200 ease-in-out cyber-button-base',
        { 'opacity-50 cursor-not-allowed': isDisabled },
        { 'bg-dark-bg font-bold text-cyan transform hover:scale-95 cyber-typewriter': variant === ButtonVariants.TypeWriter },
        { 'bg-transparent text-cyan hover:text-green-hl cyber-flat': variant === ButtonVariants.Flat },
        { 'cyber-flat-active !font-bold !text-green-hl': variant === ButtonVariants.Flat && isActive },
        { 'bg-cyan hover:bg-green-hl font-bold text-dark-bg px-2 cyber-filled': variant === ButtonVariants.FlatFilled },
    ]" :disabled="isDisabled" @click="onClick">
        <div v-if="variant === ButtonVariants.TypeWriter" :class="[
            'block h-2 w-full bg-dark-bg border-x-[0.1rem] border-t-[0.1rem] border-cyan rounded-t-[2px] cyber-button-top',
            { '!border-green-hl !bg-green-hl': isActive }
        ]" />
        <div :class="[
            'flex justify-center',
            { 'opacity-50 cursor-not-allowed': isDisabled },
            { 'justify-start border-[0.1rem] border-cyan rounded-b-[2px] cyber-button-content': variant === ButtonVariants.TypeWriter },
        ]">
            <slot />
        </div>
    </button>
</template>

<script lang="ts">
import { ButtonVariants } from '@/utils/constants'; // Ensure this is imported correctly
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseButton',
    props: {
        variant: {
            type: String,
            default: ButtonVariants.Flat, // Ensure the correct default variant is set
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            ButtonVariants, // Return ButtonVariants in data to access it in the template
        };
    },
    emits: ['click'],
    methods: {
        onClick(event: Event) {
            if (!this.isDisabled) {
                this.$emit('click', event); // Emit the click event when the button is not disabled
            }
        },
    },
});
</script>

<style scoped>
.cyber-button-base {
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
}

.cyber-button-base::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.2), transparent);
    transition: left 0.5s;
}

.cyber-button-base:hover::after {
    left: 100%;
}

.cyber-flat {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid #00E5FF;
}

.cyber-flat:hover {
    text-shadow: 0 0 8px #00E5FF;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.cyber-flat-active {
    text-shadow: 0 0 8px #00E5FF !important;
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.7) !important;
}

.cyber-filled {
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.cyber-filled:hover {
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.8);
}

.cyber-typewriter .cyber-button-top {
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.3);
}

.cyber-typewriter .cyber-button-content {
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.3);
}

.bg-dark-bg {
    background-color: #021114;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
}
</style>
