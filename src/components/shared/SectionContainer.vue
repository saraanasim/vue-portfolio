<template>
    <div class="w-full h-full p-2 sm:p-4">
        <div class="grid grid-cols-1 lg:grid-cols-3">
            <div class="col-span-1 flex justify-center">
                <img src="/src/assets/logos/logo-text.png" alt="Saraan Techworks Logo"
                    class="object-contain w-full h-full max-w-sm" />
            </div>
            <div class="col-span-1 lg:col-span-2 flex items-end">

                <div class="w-full grid grid-cols-2 gap-2 border-b-[0.1rem] py-2">
                    <div
                        class="col-span-2 lg:col-span-1 border-b-[0.1rem] lg:border-b-0 border-x-[0.1rem] border-t-[0.1rem] rounded-[2px]">
                        <span class="block ml-2 font-bold text-lg text-white-text text-wrap">
                            {{ title }}
                        </span>
                    </div>
                    <div class="col-span-2 lg:col-span-1 flex gap-2">
                        <BaseButton :variant="ButtonVariants.TypeWriter" :isActive="true">Connect</BaseButton>
                        <BaseButton :variant="ButtonVariants.TypeWriter">Upload</BaseButton>
                        <BaseButton :variant="ButtonVariants.TypeWriter">Download</BaseButton>
                    </div>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ButtonVariants } from '@/utils/constants';
import BaseButton from './BaseButton.vue';

export default defineComponent({
    name: 'SectionContainer',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    components: {
        BaseButton,
    },
    setup() {
        return {
            ButtonVariants,
        };
    },
});
</script>
