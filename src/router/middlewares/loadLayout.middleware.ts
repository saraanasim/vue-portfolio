import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router";

export default async function loadLayoutMiddleware(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) {
    try {
        const layout = to.meta.layout || 'DefaultLayout'
        const layoutComponent = await import(`@/layouts/${layout}.vue`)
        to.meta.layoutComponent = layoutComponent.default
    }
    catch (error) {
        console.error(error)
        const layout = 'DefaultLayout'
        const defaultLayout = await import(`@/layouts/${layout}.vue`)
        to.meta.layoutComponent = defaultLayout.default
    }
    next()
}