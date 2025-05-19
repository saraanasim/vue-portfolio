import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import titleMiddleware from "./middlewares/changeTitle.middleware";
import layoutMiddleware from "./middlewares/loadLayout.middleware";

// Use defineAsyncComponent to handle dynamic imports properly
const HomePage = () => import("@/views/HomePage.vue");
const ProjectsPage = () => import("@/views/ProjectsPage.vue");
const ExperimentsPage = () => import("@/views/ExperimentsPage.vue");
const ArticlesPage = () => import("@/views/ArticlesPage.vue");

const routesConfig: Record<'HOME' | 'PROJECTS' | 'EXPERIMENTS' | 'ARTICLES', RouteRecordRaw> = {
    HOME: {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {
            title: 'Saraan Asim',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    },
    PROJECTS: {
        path: '/projects',
        name: 'projects',
        component: ProjectsPage,
        meta: {
            title: 'Saraan Asim | Projects',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    },
    EXPERIMENTS: {
        path: '/experiments',
        name: 'experiments',
        component: ExperimentsPage,
        meta: {
            title: 'Saraan Asim | Experiments',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    },
    ARTICLES: {
        path: '/articles',
        name: 'articles',
        component: ArticlesPage,
        meta: {
            title: 'Saraan Asim | Articles',
            layout: 'DefaultLayout',
            middleware: [layoutMiddleware]
        }
    }
}

const routes: RouteRecordRaw[] = Object.values(routesConfig)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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

export { router, routesConfig };
