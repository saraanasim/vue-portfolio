<template>
    <BaseModal v-model="isOpen" title="CONNECT" accessLevel="PUBLIC">
        <div class="connect-modal">
            <div class="section-heading">
                <span class="text-green-hl mr-2">>&gt;</span>
                <span>CONNECTION OPTIONS</span>
                <div class="scanner-line"></div>
            </div>

            <div class="social-grid">
                <div v-for="social in socials" :key="social.name" class="social-item"
                    @click="openSocialLink(social.url)">
                    <div class="social-icon">
                        <Icon :icon="social.icon" class="icon" />
                    </div>
                    <div class="social-info">
                        <div class="social-name">{{ social.name }}</div>
                        <div class="social-url">{{ formatUrl(social.url) }}</div>
                    </div>
                    <div class="social-arrow">
                        <Icon icon="mdi:arrow-right" />
                    </div>
                </div>
            </div>

            <div class="download-section">
                <div class="section-heading">
                    <span class="text-cyan mr-2">>&gt;</span>
                    <span>DOWNLOAD RESUME</span>
                </div>
                <div class="download-button" @click="downloadResume">
                    <Icon icon="mdi:file-download" class="mr-2" />
                    <span>DOWNLOAD_RESUME.PDF</span>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import BaseModal from '@/components/shared/BaseModal.vue';
import configData from '@/data/config.json';
import { downloadResume } from '@/utils/helpers';

export default {
    name: 'ConnectModal',
    components: {
        BaseModal,
        Icon
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    computed: {
        isOpen: {
            get(): boolean {
                return this.modelValue;
            },
            set(value: boolean): void {
                this.$emit('update:modelValue', value);
            }
        },
        socials() {
            return configData.socials;
        }
    },
    methods: {
        formatUrl(url: string): string {
            // Remove protocol and mailto: for cleaner display
            return url.replace(/^(https?:\/\/)|(mailto:)/i, '');
        },
        openSocialLink(url: string): void {
            window.open(url, '_blank', 'noopener,noreferrer');
        },
        downloadResume(): void {
            downloadResume();
        }
    }
};
</script>

<style scoped>
.connect-modal {
    font-family: monospace;
    color: var(--text-cyan, #00E5FF);
}

.section-heading {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
    font-weight: bold;
    font-size: 1rem;
}

.section-heading::after {
    content: '';
    height: 1px;
    background-color: rgba(0, 229, 255, 0.3);
    flex-grow: 1;
    margin-left: 0.5rem;
}

.scanner-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background-color: #7ba205;
    animation: scan 2s linear infinite;
}

@keyframes scan {
    0% {
        left: 0;
        opacity: 0.8;
    }

    100% {
        left: 100%;
        opacity: 0;
    }
}

.social-grid {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
}

.social-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: rgba(0, 229, 255, 0.05);
    border: 1px solid rgba(0, 229, 255, 0.2);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.social-item:hover {
    background-color: rgba(0, 229, 255, 0.15);
    transform: translateX(3px);
    border-color: rgba(0, 229, 255, 0.4);
}

.social-icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(0, 229, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
}

.icon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--text-cyan, #00E5FF);
}

.social-info {
    flex-grow: 1;
}

.social-name {
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.social-url {
    font-size: 0.8rem;
    color: rgba(0, 229, 255, 0.7);
}

.social-arrow {
    color: var(--green-hl, #7ba205);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.2s ease;
}

.social-item:hover .social-arrow {
    opacity: 1;
    transform: translateX(0);
}

.download-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed rgba(0, 229, 255, 0.3);
}

.download-button {
    background-color: rgba(123, 162, 5, 0.1);
    border: 1px solid var(--green-hl, #7ba205);
    color: var(--green-hl, #7ba205);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1rem;
}

.download-button:hover {
    background-color: var(--green-hl, #7ba205);
    color: #011518;
}
</style>