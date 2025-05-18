<template>
    <div>
        <BaseButton :variant="ButtonVariants.FlatFilled" class="cyber-login-button" @click="showLoginModal">Login
        </BaseButton>

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
        <BaseModal v-model="isUserBlockedModalOpen" title="SYSTEM LOCKDOWN" accessLevel="SECURITY"
            :closeOnBackdrop="false">
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
    </div>
</template>

<script lang="ts">
import { ButtonVariants } from '@/utils/constants';
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';

export default {
    name: 'LoginButton',
    components: {
        Icon,
        BaseButton,
        BaseModal
    },
    data() {
        return {
            ButtonVariants,
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