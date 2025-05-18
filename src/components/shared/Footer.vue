<template>
    <footer class="w-full bg-dark-bg text-cyan border-t-2 border-cyan py-4 cyber-footer">
        <div class="max-w-7xl mx-auto flex justify-center sm:justify-between items-center px-4 relative">
            <!-- Footer Left Section -->
            <div class="text-sm flex items-center space-x-4 font-mono">
                <span class="font-semibold scanner-text hidden sm:block">ACCESS TERMINAL</span>
                <span class="text-xs text-dim-text blink-slow">© 2024 | SECURE CONNECTION</span>
            </div>

            <!-- Footer Center Section: Decorative Element -->
            <div class="absolute left-1/2 transform -translate-x-1/2 top-0 h-full">
                <div class="h-full w-1 bg-cyan glow-effect"></div>
            </div>

            <!-- Footer Right Section -->
            <div class="hidden sm:block text-xs text-dim-text font-mono border border-cyan p-2 cyber-terminal">
                SYSTEM.STATUS = <span class="text-green-500 font-bold">ONLINE</span>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
export default {
    name: 'AppFooter',
};
</script>

<style scoped>
.cyber-footer {
    background-color: #021114;
    color: #00E5FF;
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
    position: relative;
    overflow: hidden;
}

.cyber-footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00E5FF, transparent);
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

.cyber-terminal {
    background-color: rgba(0, 229, 255, 0.05);
    position: relative;
}

.cyber-terminal::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: #00E5FF;
    animation: blink 1s step-end infinite;
}

.blink-slow {
    animation: blink 2s step-end infinite;
}

.glow-effect {
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
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

.bg-dark-bg {
    background-color: #021114;
}

.text-cyan {
    color: #00E5FF;
}

.border-cyan {
    border-color: #00E5FF;
}
</style>