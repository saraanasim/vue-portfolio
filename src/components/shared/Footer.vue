<template>
    <footer class="w-full bg-black-bg text-white-text py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-4">
            <!-- Footer Left Section -->
            <div class="text-sm flex items-center space-x-4 font-orbitron">
                <span class="font-semibold">Sleek Interface</span>
                <span class="text-xs text-dim-text">© 2024 All Rights Reserved</span>
            </div>

            <!-- Footer Center Section: Social Icons -->
            <div class="flex items-center space-x-3">

            </div>

            <!-- Footer Right Section -->
            <div class="text-xs text-dim-text font-orbitron">
                Powered by Arc Reactor Technology
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
export default {
    name: 'Footer',
};
</script>

<style scoped>
footer {
    /* Subtle glowing effect on hover */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

footer:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
</style>