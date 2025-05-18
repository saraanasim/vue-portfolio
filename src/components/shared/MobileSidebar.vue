<template>
    <div class="mobile-sidebar" :class="{ 'open': isOpen }">
        <!-- Backdrop -->
        <div class="backdrop" @click="close"></div>

        <!-- Sidebar Content -->
        <div class="sidebar-content">
            <div class="sidebar-header">
                <div class="flex items-center gap-2">
                    <div class="bg-dark-bg border border-cyan p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" class="w-8 h-8 text-cyan">
                            <!-- Using the same logo path from Header -->
                            <path fill="currentColor"
                                d="M277.000000,497.000000 C184.666687,497.000000 92.833374,497.000000 1.000049,497.000000 C1.000033,331.666718 1.000033,166.333450 1.000016,1.000138 C166.333237,1.000092 331.666473,1.000092 496.999756,1.000046 C496.999847,166.333191 496.999847,331.666382 496.999939,496.999786 C423.833344,497.000000 350.666656,497.000000 277.000000,497.000000 M244.580078,391.092743 C255.635178,378.648682 264.498871,364.807922 270.735413,349.366760 C284.387756,315.564697 292.393280,280.242432 298.571259,244.456619 C301.244476,228.972214 305.447205,213.966354 311.648895,199.534348 C318.057983,184.619629 329.955170,178.551743 345.929626,181.472031 C362.377960,184.478958 371.182617,195.479843 376.093292,210.215393 C383.462189,232.327271 383.996460,254.948959 379.698853,277.734406 C377.057007,291.741241 371.598602,304.475800 361.831848,315.085144 C349.051361,328.968292 332.441406,334.043335 314.309418,335.159393 C309.799652,335.436981 308.270844,336.934296 308.293701,341.457031 C308.443695,371.122894 308.459625,400.790405 308.284088,430.455994 C308.254852,435.403442 310.090332,436.862854 314.778595,436.698792 C328.265686,436.226837 341.668121,435.179565 354.944824,432.634766 C412.331268,421.635010 449.494263,387.734680 467.657532,332.665222 C478.866577,298.680206 481.404541,263.648895 478.895569,228.127502 C476.533478,194.685226 467.466949,163.239548 449.835022,134.643982 C432.168274,105.991966 408.415466,84.291321 375.752319,73.797569 C354.573151,66.993294 332.801727,66.729454 311.002228,69.599083 C294.259674,71.803040 278.594269,77.396858 265.154358,87.950493 C244.606125,104.085915 231.056015,124.966934 223.338715,149.903961 C213.634445,181.261520 207.600388,213.479019 200.250198,245.392288 C196.324402,262.437408 191.654480,279.319550 184.132828,295.168365 C175.803879,312.718262 158.369827,319.205688 141.582825,311.319946 C131.284393,306.482208 125.327675,297.601562 121.726707,287.289856 C113.346863,263.293335 113.538071,238.874435 120.047188,214.571152 C124.771889,196.930420 135.615326,184.256134 153.232346,178.017502 C160.673172,175.382492 168.436478,174.390167 176.225235,173.787064 C179.926865,173.500427 181.673889,172.262436 181.665253,168.381805 C181.598175,138.215347 181.598969,108.048637 181.650604,77.882133 C181.657745,73.707069 179.584869,72.187050 175.730179,72.423279 C170.743637,72.728874 165.745453,72.922981 160.775589,73.405365 C150.858063,74.368004 140.754761,74.484726 131.253540,77.862541 C77.381790,97.014732 42.638073,134.220963 27.417093,189.279190 C18.758266,220.600403 17.332327,252.538162 21.200974,284.776367 C24.612286,313.203522 32.256275,340.311615 47.301952,364.810059 C79.383003,417.046783 127.992348,434.042114 183.103485,425.816925 C207.682938,422.148499 227.832825,410.263367 244.580078,391.092743 z" />
                        </svg>
                    </div>
                    <span class="text-cyan font-mono font-bold">NAVIGATION</span>
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
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';
import { routesConfig } from '@/router';
import LoginButton from './LoginButton.vue';
import CloseButton from './CloseButton.vue';
import ConnectButton from './ConnectButton.vue';
import DownloadButton from './DownloadButton.vue';

export default {
    name: 'MobileSidebar',
    components: {
        Icon,
        BaseButton,
        LoginButton,
        CloseButton,
        ConnectButton,
        DownloadButton
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