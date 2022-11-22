import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: "/",
        alias: "/animals",
        name: "animals",
        component: () => import("./components/AnimalsList")
    },
    {
        path: "/",
        alias: "/modules",
        name: "modules",
        component: () => import("./components/ModuleList")
    },
    {
        path: "/modules/:id/:groupid",
        alias: "/groups",
        name: "groups",
        component: () => import("./components/GroupOptions")
    },
    {
        path: "/modules/:id",
        name: "module-details",
        component: () => import("./components/ModuleDetails")
    },
    {
        path: "/animals/:id",
        name: "animal-details",
        component: () => import("./components/AnimalDetails")
    },
    {
        path: '/add-animal',
        name: 'add-animal',
        component: () => import("./components/AnimalAdd")
    },
    {
        path: '/users',
        name: 'users',
        component: () => import("./components/UserList")
    },
    {
        path: '/users/:id',
        name: 'user-details',
        component: () => import("./components/UserDetails")
    },
    {
        path: '/add-user',
        name: 'user-add',
        component: () => import("./components/UserAdd")
    },
    {
        path: '/public',
        name: 'public-page',
        component: () => import("./components/PublicPage")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("./components/LoginPage")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("./components/RegisterPage")
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import("./components/ProfilePage")
    },
    {
        path: '/protected',
        name: 'protected',
        component: () => import("./components/ProtectedContent")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;