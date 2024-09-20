<template>
    <div class="w-full h-full p-2 sm:p-4">
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="col-span-1">Big Logo</div>
            <div class="col-span-1 md:col-span-2 grid grid-cols-2 gap-2 border-b-[0.1rem] py-2">
                <div
                    class="col-span-2 md:col-span-1 border-b-[0.1rem] md:border-b-0 border-x-[0.1rem] border-t-[0.1rem] rounded-[2px]">
                    <span class="ml-2 font-bold text-lg text-white-text">
                        {{ title }}
                    </span>
                </div>
                <div class="col-span-2 md:col-span-1 flex gap-2">
                    <BaseButton :variant="ButtonVariants.TypeWriter" :isActive="true">Connect</BaseButton>
                    <BaseButton :variant="ButtonVariants.TypeWriter">Upload</BaseButton>
                    <BaseButton :variant="ButtonVariants.TypeWriter">Download</BaseButton>
                </div>
            </div>
        </div>
        <slot></slot>
        <div>Section Footer</div>
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
