<template>
    <div class="relative">
        <!-- Trigger Button -->
        <button :class="[
            'p-0 w-full h-full min-size-1 max-h-10 font-bold text-dimmest-text transform transition-transform duration-200 ease-in-out',
            { 'opacity-50 cursor-not-allowed': isDisabled }
        ]" @click="toggleDropdown" :disabled="isDisabled">
            <div class="block h-2 w-full bg-gray-bg border-x-[0.1rem] border-t-[0.1rem] border-dimmest-text rounded-t-[2px]"
                :class="{ 'border-maroon-hl bg-maroon-hl': isOpen }" />
            <div class="flex justify-start border-[0.1rem] border-dimmest-text rounded-b-[2px] p-2 bg-black">
                <slot name="trigger">
                    <span class="font-mono">{{ selected?.label || 'Select an Option' }}</span>
                </slot>
            </div>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isOpen"
            class="absolute top-16 z-50 w-full bg-black border-2 border-dimmest-text rounded-sm shadow-lg max-h-60 overflow-y-auto"
            ref="dropdownMenu">
            <ul class="font-mono">
                <li v-for="(option, index) in options" :key="index"
                    class="dropdown-option px-4 py-2 hover:bg-gray-bg cursor-pointer flex items-center"
                    :class="{ 'text-maroon-hl': isOptionSelected(option) }" @click="selectOption(option)">
                    <span class="mr-2" v-if="isOptionSelected(option)">></span>
                    <span v-else class="mr-2 opacity-0">></span>
                    {{ option.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

// Define Option type
export type DropdownOption = {
    label: string;
    value: string | number;
};

export default defineComponent({
    name: 'BaseDropdown',
    props: {
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
        options: {
            type: Array as PropType<DropdownOption[]>,
            default: () => [],
        },
        selected: {
            type: Object as PropType<DropdownOption | null>,
            default: null,
        },
        multiSelect: {
            type: Boolean,
            default: false
        },
        selectedValues: {
            type: Array as PropType<(string | number)[]>,
            default: () => []
        }
    },
    emits: ['update:isOpen', 'select'],
    methods: {
        toggleDropdown() {
            if (!this.isDisabled) {
                this.$emit('update:isOpen', !this.isOpen);
            }
        },
        selectOption(option: DropdownOption) {
            this.$emit('select', option);
            if (!this.multiSelect) {
                this.$emit('update:isOpen', false); // Close dropdown after selection only in single select mode
            }
        },
        isOptionSelected(option: DropdownOption): boolean {
            if (this.multiSelect) {
                return this.selectedValues.includes(option.value);
            } else {
                return this.selected?.value === option.value;
            }
        },
        handleOutsideClick(event: Event) {
            const dropdownMenu = this.$refs.dropdownMenu as HTMLElement;
            const button = this.$el.querySelector('button');

            if (dropdownMenu && !dropdownMenu.contains(event.target as Node) &&
                button && !button.contains(event.target as Node)) {
                this.$emit('update:isOpen', false);
            }
        },
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                // Add small delay before adding click listener to avoid catching the same click event
                setTimeout(() => {
                    document.addEventListener('click', this.handleOutsideClick);
                }, 0);
            } else {
                document.removeEventListener('click', this.handleOutsideClick);
            }
        },
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
});
</script>

<style scoped>
.dropdown-option {
    transition: background-color 0.2s ease-in-out;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-option:last-child {
    border-bottom: none;
}

.dropdown-option:hover {
    background-color: #2a2a2a;
}
</style>
