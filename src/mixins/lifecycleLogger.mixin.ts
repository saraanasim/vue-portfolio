import type { ComponentOptions } from "vue";

// Define the mixin type with Vue's lifecycle hooks
export const lifecycleLoggerMixin: ComponentOptions = {
    beforeCreate() {
        console.log(`${this.$options.name} - beforeCreate`);
    },
    created() {
        console.log(`${this.$options.name} - created`);
    },
    beforeMount() {
        console.log(`${this.$options.name} - beforeMount`);
    },
    mounted() {
        console.log(`${this.$options.name} - mounted`);
    },
    beforeUpdate() {
        console.log(`${this.$options.name} - beforeUpdate`);
    },
    updated() {
        console.log(`${this.$options.name} - updated`);
    },
    beforeUnmount() {
        console.log(`${this.$options.name} - beforeUnmount`);
    },
    unmounted() {
        console.log(`${this.$options.name} - unmounted`);
    }
};
