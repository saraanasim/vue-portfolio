<template>
    <header class="w-full h-16 flex items-center justify-between p-3 bg-dark-bg border-b-2 border-cyan text-cyan">
        <!-- Left Section: Logo and Company Name -->
        <div class="h-full flex items-center gap-2">
            <AppLogo />
            <div class="h-full w-1 bg-cyan glow-effect"></div>
            <div class="flex flex-col justify-start font-mono">
                <span class="text-lg font-bold">ACCESS TERMINAL</span>
                <span class="text-xs blink-slow">{{ time }}</span>
            </div>
        </div>

        <!-- Right Section: Minimize and Close Buttons -->
        <div class="h-full hidden md:flex items-center space-x-2">
            <MinimizeButton />
            <CloseButton />
        </div>

        <!-- Right Section: Mobile -->
        <div class="h-full flex md:hidden items-center space-x-2">
            <button class="cyber-button lg:hidden" @click="toggleMobileSidebar">
                <Icon icon="mdi:menu" class="size-6" />
            </button>
        </div>
    </header>
    <header
        class="w-full h-16 hidden sm:flex gap-2 items-center justify-between p-3 bg-dark-secondary border-b-2 border-cyan text-dimmest-text">
        <!-- Left Section: Access -->
        <div
            class="h-full w-fit px-2 md:px-4 lg:w-1/3 flex items-center gap-2 bg-dark-bg border border-cyan text-center font-bold text-xs md:text-sm font-mono">
            <p class="w-full text-cyan scanner-text">
                REMOTE-ACCESS - SECURE CONNECTION
            </p>
        </div>

        <div class="hidden h-full flex-1 md:flex">
            <div class="w-fit flex gap-8 ml-8">
                <BaseButton @click="navigateTo(routesConfig.HOME.path)" class="cyber-nav-button"
                    :isActive="$route.path === routesConfig.HOME.path">INFO</BaseButton>
                <BaseButton @click="navigateTo(routesConfig.PROJECTS.path)" class="cyber-nav-button"
                    :isActive="$route.path === routesConfig.PROJECTS.path">
                    Projects
                </BaseButton>
                <BaseButton @click="navigateTo(routesConfig.EXPERIMENTS.path)" class="cyber-nav-button"
                    :isActive="$route.path === routesConfig.EXPERIMENTS.path">
                    EXPERIMENTS
                </BaseButton>
                <BaseButton @click="navigateTo(routesConfig.ARTICLES.path)" class="cyber-nav-button"
                    :isActive="$route.path === routesConfig.ARTICLES.path">ARTICLES</BaseButton>
            </div>
        </div>

        <!-- Right Section: Login and Logout Buttons -->
        <div class="h-full flex items-center gap-2 bg-dark-bg border border-cyan font-bold font-mono">
            <LoginButton />
        </div>
    </header>

    <!-- MobileSidebar component -->
    <MobileSidebar v-model:isOpen="isMobileSidebarOpen" />
</template>

<script lang="ts">
import { ButtonVariants, companyInfo } from '@/utils/constants';
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';
import { getFormattedDateTime } from '@/utils/helpers';
import { routesConfig } from '@/router';
import MobileSidebar from './MobileSidebar.vue';
import LoginButton from './LoginButton.vue';
import MinimizeButton from './MinimizeButton.vue';
import CloseButton from './CloseButton.vue';
import AppLogo from './Logo.vue';

const time = getFormattedDateTime('time')

export default {
    name: 'AppHeader',
    components: {
        Icon,
        BaseButton,
        MobileSidebar,
        LoginButton,
        MinimizeButton,
        CloseButton,
        AppLogo
    },
    data() {
        return {
            time,
            ButtonVariants,
            companyInfo,
            routesConfig,
            isMobileSidebarOpen: false,
        };
    },
    methods: {
        navigateTo(path: string) {
            console.log({ path })
            this.$router.push(path);
        },
        toggleMobileSidebar() {
            this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
        }
    }
}
</script>

<style scoped>
.bg-dark-bg {
    background-color: #021114;
}

.bg-dark-secondary {
    background-color: #011518;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
}

.glow-effect {
    box-shadow: 0 0 10px #00E5FF80;
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
    padding: 0.25rem 0.75rem;
    transition: all 0.2s;
}

.cyber-nav-button:hover {
    background-color: #00E5FF;
    color: #021114;
    box-shadow: 0 0 10px #00E5FF80;
}

.scanner-text {
    position: relative;
    overflow: hidden;
}

.scanner-text::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 229, 255, 0.2) 50%,
            transparent 100%);
    animation: scan-horizontal 3s linear infinite;
}

.blink-slow {
    animation: blink 2s step-end infinite;
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

@keyframes scan-horizontal {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
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
