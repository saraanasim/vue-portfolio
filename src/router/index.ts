import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import titleMiddleware from "./middlewares/changeTitle.middleware";
import layoutMiddleware from "./middlewares/loadLayout.middleware";
import { defineAsyncComponent } from "vue";

// Use defineAsyncComponent to handle dynamic imports properly
const HomePage = defineAsyncComponent(() => import("@/views/HomePage.vue"));
const ProjectsPage = defineAsyncComponent(() => import("@/views/ProjectsPage.vue"));

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {
            title: 'Home Page',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    },
    {
        path: '/projects',
        name: 'projects',
        component: ProjectsPage,
        meta: {
            title: 'Projects Page',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Helper to run multiple middlewares
async function runMiddlewares(to: any, from: any, next: any, middlewares: any[], index: number = 0) {
    if (index < middlewares.length) {
        const currentMiddleware = middlewares[index];
        await currentMiddleware(to, from, (nextMiddleware: any) => {
            if (nextMiddleware !== false) {
                runMiddlewares(to, from, next, middlewares, index + 1);
            } else {
                next(false); // Cancel navigation
            }
        });
    } else {
        next();
    }
}

// Global beforeEach for router
router.beforeEach((to, from, next) => {
    // Always run the title middleware
    titleMiddleware(to, from, () => {
        // Check for route-specific middlewares
        if (to.meta.middleware) {
            const middlewares = Array.isArray(to.meta.middleware)
                ? to.meta.middleware
                : [to.meta.middleware];

            // Run all middlewares in order
            runMiddlewares(to, from, next, middlewares);
        } else {
            next(); // If no middlewares, continue navigation
        }
    });
});

export { router };
