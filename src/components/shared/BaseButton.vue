<template>
    <button :class="[
        'p-0 w-full h-full min-size-1 max-h-10 transition-transform duration-200 ease-in-out',
        { 'opacity-50 cursor-not-allowed': isDisabled },
        { ' bg-gray-bg font-bold text-dimmest-text transform hover:scale-95': variant === ButtonVariants.TypeWriter },
        { ' bg-transparent text-dimmest-text hover:text-maroon-hl': variant === ButtonVariants.Flat },
        { ' font-bold text-maroon-hl': variant === ButtonVariants.Flat && isActive },
        { ' bg-blue-hl hover:bg-maroon-hl font-bold text-dimmest-text': variant === ButtonVariants.FlatFilled },

    ]" :disabled="isDisabled" @click="onClick">
        <div v-if="variant === ButtonVariants.TypeWriter" :class="[
            'block h-2 w-full bg-gray-bg border-x-[0.1rem] border-t-[0.1rem] border-dimmest-text rounded-t-[2px]',
            { 'border-maroon-hl bg-maroon-hl': isActive }
        ]" />
        <div :class="[
            'flex justify-center',
            { 'opacity-50 cursor-not-allowed': isDisabled },
            { 'justify-start border-[0.1rem] border-dimmest-text rounded-b-[2px]': variant === ButtonVariants.TypeWriter },
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
