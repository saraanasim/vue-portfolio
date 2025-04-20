<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="modelValue" class="modal-backdrop" @click="closeOnBackdrop && $emit('update:modelValue', false)">
                <div class="modal-container" @click.stop>
                    <!-- Header -->
                    <div class="modal-header">
                        <div class="header-left">
                            <div class="header-icon">!</div>
                            <div class="header-title">{{ title }}</div>
                        </div>
                        <div class="header-right">
                            <button class="close-btn" @click="$emit('update:modelValue', false)">X</button>
                        </div>
                    </div>

                    <!-- Status bar -->
                    <div class="status-bar">
                        <div class="status-item">SYSTEM_ROOT</div>
                        <div class="status-item">ACCESS LEVEL: {{ accessLevel }}</div>
                        <div class="status-item blink">CONNECTING...</div>
                    </div>

                    <!-- Content -->
                    <div class="modal-content">
                        <div class="modal-content-inner">
                            <div class="scanner-line"></div>
                            <slot></slot>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <div class="footer-left">
                            <slot name="footer-left"></slot>
                        </div>
                        <div class="footer-right">
                            <slot name="footer-buttons">
                                <button class="action-btn"
                                    @click="$emit('update:modelValue', false)">DISCONNECT</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts">
export default {
    name: 'BaseModal',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'ALERT'
        },
        accessLevel: {
            type: String,
            default: 'ADMIN'
        },
        closeOnBackdrop: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 20, 30, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal-container {
    width: 90%;
    max-width: 800px;
    background-color: #021114;
    border: 2px solid #00E5FF;
    box-shadow: 0 0 20px #00E5FF80, inset 0 0 10px #00404080;
    color: #00E5FF;
    position: relative;
    animation: scanline 5s linear infinite;
    transform-origin: center;
}

.modal-header {
    background-color: #011518;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #00E5FF;
}

.header-left {
    display: flex;
    align-items: center;
}

.header-icon {
    background-color: #7ba205;
    color: #011518;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 0.75rem;
}

.header-title {
    font-family: monospace;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #7ba205;
}

.close-btn {
    font-family: monospace;
    background-color: transparent;
    color: #7ba205;
    border: 1px solid #7ba205;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: bold;
}

.close-btn:hover {
    background-color: #00E5FF;
    color: #011518;
}

.status-bar {
    background-color: #00303C;
    display: flex;
    padding: 0.25rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-family: monospace;
    border-bottom: 1px solid #00E5FF50;
}

.status-item {
    margin-right: 1.5rem;
}

.blink {
    animation: blink 1s step-end infinite;
}

.modal-content {
    padding: 1rem;
    position: relative;
    overflow: hidden;
    min-height: 200px;
    max-height: 60vh;
    overflow-y: auto;
}

.modal-content-inner {
    position: relative;
    z-index: 2;
}

.scanner-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(0, 229, 255, 0.7);
    box-shadow: 0 0 10px 2px rgba(0, 229, 255, 0.8);
    z-index: 1;
    animation: scan 3s linear infinite;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-top: 2px solid #00E5FF;
    background-color: #00303C;
}

.action-btn {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid #00E5FF;
    padding: 0.25rem 0.75rem;
    font-family: monospace;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: 1px;
}

.action-btn:hover {
    background-color: #00E5FF;
    color: #011518;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

@keyframes scanline {
    0% {
        background-image: linear-gradient(to bottom,
                transparent 0%,
                rgba(0, 229, 255, 0.05) 10%,
                transparent 100%);
    }

    50% {
        background-image: linear-gradient(to bottom,
                transparent 30%,
                rgba(0, 229, 255, 0.05) 50%,
                transparent 70%);
    }

    100% {
        background-image: linear-gradient(to bottom,
                transparent 70%,
                rgba(0, 229, 255, 0.05) 90%,
                transparent 100%);
    }
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