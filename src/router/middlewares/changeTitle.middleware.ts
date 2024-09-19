import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router";

export default function changeTitleMiddleware(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) {
    try {
        const title = to.meta.title as string || "Saraan's Portfolio"
        document.title = title
    }
    catch (error) {
        console.log(error)
        document.title = "Saraan's Portfolio"
    }
    next()
}