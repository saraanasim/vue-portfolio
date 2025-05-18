<template>
    <BaseButton :variant="ButtonVariants.TypeWriter" :isActive="true" @click="openConnectModal">Connect</BaseButton>
    <ConnectModal v-model="isConnectModalOpen" />
</template>

<script lang="ts">
import BaseButton from './BaseButton.vue';
import ConnectModal from './ConnectModal.vue';
import { ButtonVariants } from '@/utils/constants';
import { ref } from 'vue';

export default {
    name: 'ConnectButton',
    components: {
        BaseButton,
        ConnectModal
    },
    setup() {
        const isConnectModalOpen = ref(false);

        const openConnectModal = () => {
            isConnectModalOpen.value = true;
        };

        return {
            ButtonVariants,
            isConnectModalOpen,
            openConnectModal
        };
    }
};
</script>