<template>
    <header class="w-full h-16 flex items-center justify-between p-3 bg-dark-bg border-b-2 border-cyan text-cyan">
        <!-- Left Section: Logo and Company Name -->
        <div class="h-full flex items-center gap-2">
            <div class="bg-dark-bg border border-cyan p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" class="w-12 h-12 text-cyan">
                    <path fill="currentColor" opacity="1" stroke="none" d="
                    M277.000000,497.000000 
                    C184.666687,497.000000 92.833374,497.000000 1.000049,497.000000 
                    C1.000033,331.666718 1.000033,166.333450 1.000016,1.000138 
                    C166.333237,1.000092 331.666473,1.000092 496.999756,1.000046 
                    C496.999847,166.333191 496.999847,331.666382 496.999939,496.999786 
                    C423.833344,497.000000 350.666656,497.000000 277.000000,497.000000 
                    M244.580078,391.092743 
                    C255.635178,378.648682 264.498871,364.807922 270.735413,349.366760 
                    C284.387756,315.564697 292.393280,280.242432 298.571259,244.456619 
                    C301.244476,228.972214 305.447205,213.966354 311.648895,199.534348 
                    C318.057983,184.619629 329.955170,178.551743 345.929626,181.472031 
                    C362.377960,184.478958 371.182617,195.479843 376.093292,210.215393 
                    C383.462189,232.327271 383.996460,254.948959 379.698853,277.734406 
                    C377.057007,291.741241 371.598602,304.475800 361.831848,315.085144 
                    C349.051361,328.968292 332.441406,334.043335 314.309418,335.159393 
                    C309.799652,335.436981 308.270844,336.934296 308.293701,341.457031 
                    C308.443695,371.122894 308.459625,400.790405 308.284088,430.455994 
                    C308.254852,435.403442 310.090332,436.862854 314.778595,436.698792 
                    C328.265686,436.226837 341.668121,435.179565 354.944824,432.634766 
                    C412.331268,421.635010 449.494263,387.734680 467.657532,332.665222 
                    C478.866577,298.680206 481.404541,263.648895 478.895569,228.127502 
                    C476.533478,194.685226 467.466949,163.239548 449.835022,134.643982 
                    C432.168274,105.991966 408.415466,84.291321 375.752319,73.797569 
                    C354.573151,66.993294 332.801727,66.729454 311.002228,69.599083 
                    C294.259674,71.803040 278.594269,77.396858 265.154358,87.950493 
                    C244.606125,104.085915 231.056015,124.966934 223.338715,149.903961 
                    C213.634445,181.261520 207.600388,213.479019 200.250198,245.392288 
                    C196.324402,262.437408 191.654480,279.319550 184.132828,295.168365 
                    C175.803879,312.718262 158.369827,319.205688 141.582825,311.319946 
                    C131.284393,306.482208 125.327675,297.601562 121.726707,287.289856 
                    C113.346863,263.293335 113.538071,238.874435 120.047188,214.571152 
                    C124.771889,196.930420 135.615326,184.256134 153.232346,178.017502 
                    C160.673172,175.382492 168.436478,174.390167 176.225235,173.787064 
                    C179.926865,173.500427 181.673889,172.262436 181.665253,168.381805 
                    C181.598175,138.215347 181.598969,108.048637 181.650604,77.882133 
                    C181.657745,73.707069 179.584869,72.187050 175.730179,72.423279 
                    C170.743637,72.728874 165.745453,72.922981 160.775589,73.405365 
                    C150.858063,74.368004 140.754761,74.484726 131.253540,77.862541 
                    C77.381790,97.014732 42.638073,134.220963 27.417093,189.279190 
                    C18.758266,220.600403 17.332327,252.538162 21.200974,284.776367 
                    C24.612286,313.203522 32.256275,340.311615 47.301952,364.810059 
                    C79.383003,417.046783 127.992348,434.042114 183.103485,425.816925 
                    C207.682938,422.148499 227.832825,410.263367 244.580078,391.092743 
                    z" />
                </svg>
            </div>
            <div class="h-full w-1 bg-cyan glow-effect"></div>
            <div class="flex flex-col justify-start font-mono">
                <span class="text-lg font-bold">ACCESS TERMINAL</span>
                <span class="text-xs blink-slow">{{ time }}</span>
            </div>
        </div>

        <!-- Right Section: Minimize and Close Buttons -->
        <div class="h-full flex items-center space-x-2">
            <button title="Minimize" class="cyber-button" @click="showMinimizeModal">
                <Icon icon="mdi:window-minimize" class="size-6 block" />
            </button>
            <button title="Close" class="cyber-button" @click="showCloseModal">
                <Icon icon="mdi:close" class="size-6 block" />
            </button>
        </div>
    </header>
    <header
        class="w-full h-16 flex gap-2 items-center justify-between p-3 bg-dark-secondary border-b-2 border-cyan text-dimmest-text">
        <!-- Left Section: Access -->
        <div
            class="h-full w-fit px-2 md:px-4 lg:w-1/3 flex items-center gap-2 bg-dark-bg border border-cyan text-center font-bold text-xs md:text-sm font-mono">
            <p class="w-full text-cyan scanner-text">
                REMOTE-ACCESS - SECURE CONNECTION
            </p>
        </div>

        <div class="hidden h-full flex-1 lg:flex">
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
            <BaseButton :variant="ButtonVariants.FlatFilled" class="cyber-login-button" @click="showLoginModal">Login
            </BaseButton>
        </div>
    </header>

    <!-- Minimize Modal -->
    <BaseModal v-model="isMinimizeModalOpen" title="SYSTEM OVERRIDE" accessLevel="ADMIN">
        <div class="modal-content-custom">
            <div class="cyberpunk-alert">
                <Icon icon="mdi:alert-octagon" class="alert-icon" />
                <div class="message-text">
                    <p class="blinking-text">SYSTEM NOTIFICATION:</p>
                    <p>Minimize operation intercepted. This terminal cannot be minimized.</p>
                    <p>Reason: Critical system functions active.</p>
                    <p class="tech-text">SYS_CODE: 0x45FD2A</p>
                </div>
            </div>
        </div>
    </BaseModal>

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

    <!-- Login Modal -->
    <BaseModal v-model="isLoginModalOpen" title="SYSTEM AUTHENTICATION" accessLevel="ROOT" :closeOnBackdrop="false">
        <div class="login-form">
            <div class="form-header">
                <p class="text-cyan">ENTER ROOT ACCESS CREDENTIALS</p>
                <p class="tech-text">SECURITY PROTOCOL: ACTIVE</p>
            </div>
            <div class="form-field">
                <label for="username">ROOT USER ID:</label>
                <input id="username" v-model="loginForm.username" type="text" class="cyber-input" />
            </div>
            <div class="form-field">
                <label for="password">ACCESS KEY:</label>
                <input id="password" v-model="loginForm.password" type="password" class="cyber-input" />
            </div>
            <div class="form-actions">
                <BaseButton :variant="ButtonVariants.FlatFilled" class="submit-btn" @click="submitLogin">
                    AUTHENTICATE
                </BaseButton>
            </div>
        </div>
    </BaseModal>

    <!-- Access Denied Modal -->
    <BaseModal v-model="isAccessDeniedModalOpen" title="ACCESS VIOLATION" accessLevel="SECURITY"
        :closeOnBackdrop="false">
        <div class="modal-content-custom">
            <div class="cyberpunk-alert access-denied">
                <Icon icon="mdi:security-network" class="alert-icon alert-icon-red" />
                <div class="message-text">
                    <p class="blinking-text">SECURITY ALERT:</p>
                    <p>Authentication failed. Unauthorized access attempt detected.</p>
                    <p>Warning: {{ attemptsRemaining }} attempts remaining before account lockout.</p>
                    <p class="error-text">Failure to provide correct credentials will result in permanent system
                        lockout.</p>
                    <p class="tech-text">VIOLATION_CODE: 0xE443F2</p>
                </div>
            </div>
        </div>
        <template #footer-buttons>
            <button class="action-btn danger-btn" @click="closeAccessDeniedModal">ACKNOWLEDGE</button>
        </template>
    </BaseModal>

    <!-- User Blocked Modal -->
    <BaseModal v-model="isUserBlockedModalOpen" title="SYSTEM LOCKDOWN" accessLevel="SECURITY" :closeOnBackdrop="false">
        <div class="modal-content-custom">
            <div class="cyberpunk-alert access-blocked">
                <Icon icon="mdi:account-lock" class="alert-icon alert-icon-red" />
                <div class="message-text">
                    <p class="blinking-text">TERMINAL LOCKED:</p>
                    <p>Multiple unauthorized access attempts detected.</p>
                    <p>This terminal has been blocked from further access attempts.</p>
                    <p>Contact system administrator for account recovery.</p>
                    <p class="tech-text">LOCKDOWN_ID: {{ lockdownId }}</p>
                </div>
            </div>
        </div>
        <template #footer-buttons>
            <button class="action-btn danger-btn" @click="acknowledgeBlockedStatus">ACKNOWLEDGE</button>
        </template>
    </BaseModal>
</template>

<script lang="ts">
import { ButtonVariants, companyInfo } from '@/utils/constants';
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';
import { getFormattedDateTime } from '@/utils/helpers';
import { routesConfig } from '@/router';

const time = getFormattedDateTime('time')

export default {
    name: 'AppHeader',
    components: {
        Icon,
        BaseButton,
        BaseModal
    },
    data() {
        return {
            time,
            ButtonVariants,
            companyInfo,
            routesConfig,
            isMinimizeModalOpen: false,
            isCloseModalOpen: false,
            isLoginModalOpen: false,
            isAccessDeniedModalOpen: false,
            isUserBlockedModalOpen: false,
            loginForm: {
                username: '',
                password: ''
            },
            attemptsRemaining: 1,
            lockdownId: this.generateLockdownId()
        };
    },
    mounted() {
        // Check if user is blocked
        const isBlocked = localStorage.getItem('userBlocked') === 'true';
        if (isBlocked) {
            this.lockdownId = localStorage.getItem('lockdownId') || this.generateLockdownId();
        }
    },
    methods: {
        navigateTo(path: string) {
            console.log({ path })
            this.$router.push(path);
        },
        showMinimizeModal() {
            this.isMinimizeModalOpen = true;
        },
        showCloseModal() {
            this.isCloseModalOpen = true;
        },
        showLoginModal() {
            // Check if user is blocked
            const isBlocked = localStorage.getItem('userBlocked') === 'true';
            if (isBlocked) {
                this.isUserBlockedModalOpen = true;
                return;
            }

            this.loginForm = { username: '', password: '' };
            this.isLoginModalOpen = true;
        },
        submitLogin() {
            // Always show access denied
            this.isAccessDeniedModalOpen = true;

            // Track attempts in localStorage
            const attempts = parseInt(localStorage.getItem('loginAttempts') || '0') + 1;
            localStorage.setItem('loginAttempts', attempts.toString());

            if (attempts >= 2) {
                // Block user after 2 attempts
                localStorage.setItem('userBlocked', 'true');
                localStorage.setItem('lockdownId', this.lockdownId);
            } else {
                this.attemptsRemaining = 2 - attempts;
            }
        },
        closeAccessDeniedModal() {
            this.isAccessDeniedModalOpen = false;

            const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
            if (attempts >= 2) {
                this.isLoginModalOpen = false;
                this.isUserBlockedModalOpen = true;
            }
        },
        acknowledgeBlockedStatus() {
            this.isUserBlockedModalOpen = false;
        },
        generateLockdownId() {
            // Generate a random hex ID
            return Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
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

.cyber-login-button {
    background-color: #00E5FF;
    color: #021114;
    border: 1px solid #00E5FF;
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
}

.cyber-login-button:hover {
    box-shadow: 0 0 10px #00E5FF;
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

.login-form {
    font-family: monospace;
    color: #00E5FF;
    padding: 1rem;
}

.form-header {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 229, 255, 0.3);
}

.form-field {
    margin-bottom: 1.5rem;
}

.form-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: rgba(0, 229, 255, 0.8);
    font-weight: bold;
}

.cyber-input {
    width: 100%;
    background-color: rgba(0, 229, 255, 0.05);
    border: 1px solid rgba(0, 229, 255, 0.3);
    color: #00E5FF;
    padding: 0.75rem;
    font-family: monospace;
    outline: none;
}

.cyber-input:focus {
    border-color: #00E5FF;
    box-shadow: 0 0 5px rgba(0, 229, 255, 0.5);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
}

.submit-btn {
    background-color: #00E5FF;
    color: #021114;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.5rem 1.5rem;
    border: none;
}

.access-denied {
    border-color: rgba(255, 0, 51, 0.3);
    background-color: rgba(255, 0, 51, 0.05);
}

.access-blocked {
    border-color: rgba(255, 0, 51, 0.5);
    background-color: rgba(255, 0, 51, 0.1);
}

.alert-icon-red {
    color: #FF0033;
}

.error-text {
    color: #FF0033;
    font-weight: bold;
    margin-top: 0.5rem;
}

.danger-btn {
    background-color: rgba(255, 0, 51, 0.2);
    color: #FF0033;
    border-color: #FF0033;
}

.danger-btn:hover {
    background-color: #FF0033;
    color: #021114;
}
</style>
