<template>
    <div class="relative">
        <!-- Trigger Button -->
        <button :class="[
            'cyber-dropdown-button p-0 w-full h-full min-size-1 max-h-10 font-bold transform transition-transform duration-200 ease-in-out',
            { 'opacity-50 cursor-not-allowed': isDisabled }
        ]" @click="toggleDropdown" :disabled="isDisabled">
            <div class="block h-2 w-full bg-dark-bg border-x-[0.1rem] border-t-[0.1rem] border-cyan rounded-t-[2px]"
                :class="{ 'cyber-active-bar': isOpen }" />
            <div
                class="flex justify-start border-[0.1rem] border-cyan rounded-b-[2px] p-2 bg-dark-bg font-mono text-cyan">
                <slot name="trigger">
                    <span class="font-mono">{{ selected?.label || 'Select an Option' }}</span>
                </slot>
            </div>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isOpen"
            class="absolute top-16 z-50 w-full bg-dark-bg border-2 border-cyan rounded-sm shadow-lg max-h-60 overflow-y-auto cyber-dropdown-menu"
            ref="dropdownMenu">
            <ul class="font-mono text-cyan">
                <li v-for="(option, index) in options" :key="index"
                    class="cyber-dropdown-option px-4 py-2 cursor-pointer flex items-center"
                    :class="{ 'cyber-option-selected': isOptionSelected(option) }" @click="selectOption(option)">
                    <span class="mr-2 cyber-selector" v-if="isOptionSelected(option)">></span>
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
.bg-dark-bg {
    background-color: #021114;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
}

.cyber-dropdown-button {
    background-color: transparent;
    color: #00E5FF;
    transition: all 0.2s;
}

.cyber-dropdown-button:not(:disabled):hover {
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
    transform: translateY(-1px);
}

.cyber-active-bar {
    background-color: rgba(0, 229, 255, 0.2);
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.5);
}

.cyber-dropdown-menu {
    background-color: #011518;
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
    border-color: #00E5FF;
    position: relative;
    overflow: hidden;
}

.cyber-dropdown-option {
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(0, 229, 255, 0.1);
    background-color: transparent;
}

.cyber-dropdown-option:last-child {
    border-bottom: none;
}

.cyber-dropdown-option:hover {
    background-color: rgba(0, 229, 255, 0.1);
    box-shadow: inset 0 0 5px rgba(0, 229, 255, 0.2);
}

.cyber-option-selected {
    background-color: rgba(0, 229, 255, 0.15);
    box-shadow: inset 0 0 8px rgba(0, 229, 255, 0.3);
}

.cyber-selector {
    animation: blink 1s step-end infinite;
}

.cyber-scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 229, 255, 0.7);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
    z-index: 1;
    animation: scan 2s linear infinite;
}

@keyframes scan {
    0% {
        top: 0;
    }

    100% {
        top: 100%;
    }
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
