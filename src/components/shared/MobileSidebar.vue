<template>
    <div class="mobile-sidebar" :class="{ 'open': isOpen }">
        <!-- Backdrop -->
        <div class="backdrop" @click="close"></div>

        <!-- Sidebar Content -->
        <div class="sidebar-content">
            <div class="sidebar-header">
                <div class="flex items-center gap-2">
                    <AppLogo size="w-8 h-8" />
                </div>
                <button class="cyber-button" @click="close">
                    <Icon icon="mdi:close" class="size-6" />
                </button>
            </div>

            <div class="sidebar-content-wrapper">
                <div class="login-section">
                    <LoginButton />
                </div>

                <nav class="sidebar-nav">
                    <BaseButton v-for="route in routes" :key="route.path" @click="navigateTo(route.path)"
                        class="cyber-nav-button w-full text-left" :isActive="$route.path === route.path">
                        {{ route.name }}
                    </BaseButton>
                </nav>

                <div class="action-buttons">
                    <ConnectButton />
                    <DownloadButton />
                </div>

                <div class="close-section">
                    <CloseButton text="Terminate session" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { routesConfig } from '@/router';
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';
import CloseButton from './CloseButton.vue';
import ConnectButton from './ConnectButton.vue';
import DownloadButton from './DownloadButton.vue';
import LoginButton from './LoginButton.vue';
import AppLogo from './Logo.vue';

export default {
    name: 'MobileSidebar',
    components: {
        Icon,
        BaseButton,
        LoginButton,
        CloseButton,
        ConnectButton,
        DownloadButton,
        AppLogo
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            routes: [
                { path: routesConfig.HOME.path, name: 'INFO' },
                { path: routesConfig.PROJECTS.path, name: 'PROJECTS' },
                { path: routesConfig.EXPERIMENTS.path, name: 'EXPERIMENTS' },
                { path: routesConfig.ARTICLES.path, name: 'ARTICLES' }
            ]
        }
    },
    methods: {
        close() {
            this.$emit('update:isOpen', false);
        },
        navigateTo(path: string) {
            this.$router.push(path);
            this.close();
        }
    }
}
</script>

<style scoped>
.mobile-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    visibility: hidden;
}

.mobile-sidebar.open {
    visibility: visible;
}

.backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.open .backdrop {
    opacity: 1;
}

.sidebar-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background-color: #021114;
    border-right: 2px solid #00E5FF;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
}

.open .sidebar-content {
    transform: translateX(0);
}

.sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #00E5FF;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-content-wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4rem);
    /* Subtract header height */
    padding: 1rem;
}

.login-section {
    margin-bottom: 2rem;
}

.sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.action-buttons {
    margin-top: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 1px solid rgba(0, 229, 255, 0.3);
}

.close-section {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 229, 255, 0.3);
}

.cyber-button {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid #00E5FF;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.cyber-button:hover {
    background-color: #00E5FF;
    color: #021114;
    box-shadow: 0 0 10px #00E5FF80;
}

.cyber-nav-button {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid #00E5FF;
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.5rem 1rem;
    transition: all 0.2s;
}

.cyber-nav-button:hover {
    background-color: #00E5FF;
    color: #021114;
    box-shadow: 0 0 10px #00E5FF80;
}
</style>