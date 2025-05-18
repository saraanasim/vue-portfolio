<template>
    <div class="w-full">
        <button title="Close" class="cyber-button w-full" @click="showCloseModal">
            <template v-if="text">
                {{ text }}
            </template>
            <Icon v-else icon="mdi:close" class="size-6 block" />
        </button>

        <!-- Close Modal -->
        <BaseModal v-model="isCloseModalOpen" title="TERMINAL ALERT" accessLevel="ADMIN">
            <div class="modal-content-custom">
                <div class="cyberpunk-alert">
                    <Icon icon="mdi:robot-dead" class="alert-icon" />
                    <div class="message-text">
                        <p class="blinking-text">TERMINAL OVERRIDE:</p>
                        <p>Close request denied. This terminal session is protected.</p>
                        <p>Continue browsing with current access credentials.</p>
                        <p class="tech-text">AUTH_LEVEL: VISITOR_ACCESS</p>
                    </div>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import BaseModal from './BaseModal.vue';

export default {
    name: 'CloseButton',
    components: {
        Icon,
        BaseModal
    },
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isCloseModalOpen: false
        };
    },
    methods: {
        showCloseModal() {
            this.isCloseModalOpen = true;
        }
    }
}
</script>

<style scoped>
.cyber-button {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid #00E5FF;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0 1rem;
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cyber-button:hover {
    background-color: #00E5FF;
    color: #021114;
    box-shadow: 0 0 10px #00E5FF80;
}

.modal-content-custom {
    font-family: monospace;
    color: #00E5FF;
}

.cyberpunk-alert {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(0, 229, 255, 0.05);
    border: 1px solid rgba(0, 229, 255, 0.3);
    padding: 1.5rem;
}

.alert-icon {
    font-size: 3rem;
    color: #00E5FF;
    animation: pulse 2s infinite;
}

.message-text {
    flex: 1;
}

.blinking-text {
    color: #FF0033;
    font-weight: bold;
    margin-bottom: 0.5rem;
    animation: blink 1s step-end infinite;
}

.tech-text {
    margin-top: 1rem;
    color: rgba(0, 229, 255, 0.7);
    font-size: 0.8rem;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }

    100% {
        opacity: 1;
    }
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0.5;
    }
}
</style>