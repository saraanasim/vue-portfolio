<template>
    <div class="text-logo">
        <h1 class="text-logo__text">Saraan Techworks</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TextLogo',
});
</script>

<style scoped>
.text-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.text-logo__text {
    font-family: 'Orbitron', 'Courier New', monospace;
    font-weight: 700;
    font-size: 2rem;
    color: #00E5FF;
    text-shadow:
        0 0 5px #00E5FF,
        0 0 10px #00E5FF,
        0 0 20px #00E5FF;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: linear-gradient(180deg, #00E5FF 0%, #0077B6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glitch 2s infinite alternate-reverse;
    display: inline-block;
}

@keyframes glitch {

    0%,
    100% {
        transform: none;
        opacity: 1;
    }

    7% {
        transform: skew(-0.5deg, -0.9deg);
        opacity: 0.95;
    }

    10% {
        transform: none;
        opacity: 1;
    }

    27% {
        transform: none;
        opacity: 1;
    }

    30% {
        transform: skew(0.8deg, -0.1deg);
        opacity: 0.9;
    }

    35% {
        transform: none;
        opacity: 1;
    }

    52% {
        transform: none;
        opacity: 1;
    }

    55% {
        transform: skew(-1deg, 0.2deg);
        opacity: 0.95;
    }

    60% {
        transform: none;
        opacity: 1;
    }
}

@media (max-width: 640px) {
    .text-logo__text {
        font-size: 1.5rem;
    }
}
</style>