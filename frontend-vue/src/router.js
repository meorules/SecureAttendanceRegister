import { createWebHistory, createRouter } from 'vue-router';

const routes = [{
        path: "/",
        alias: "/animals",
        name: "animals",
        component: () =>
            import ("./components/AnimalsList")
    },
    {
        path: "/",
        alias: "/modules",
        name: "modules",
        component: () =>
            import ("./components/ModuleList")
    },
    {
        path: "/modules/:id/:groupid",
        alias: "/groups",
        name: "groups",
        component: () =>
            import ("./components/GroupOptions")
    },
    {
        path: "/modules/:id/:groupid/attendanceIndicator",
        alias: "/attendanceIndicators",
        component: () => import("./components/AttendanceIndicators")
    },
    {
        path: "/modules/:id/:groupid/semesterRegistration",
        alias: "/semesterRegistration",
        component: () => import("./components/SemesterRegistration")
    },
    {
        path: "/modules/:id/:groupid/editAttendance",
        alias: "/editAttendance",
        component: () => import("./components/EditAttendance")
    },
    {
        path: "/modules/:id/:groupid/createLesson",
        alias: "/createLesson",
        component: () => import("./components/CreateLesson")
    },
    {
        path: "/modules/:id/:groupid/deleteLesson",
        alias: "/deleteLesson",
        component: () => import("./components/DeleteLesson")
    },
    {
        path: "/modules/:id/:groupid/semesterRegistration/:studentid",
        alias: "/studentAttendance",
        component: () => import("./components/StudentAttendance")
    },
    {
        path: "/modules/:id",
        name: "group-list",
        component: () =>
            import ("./components/GroupList")
    },
    {
        path: "/attendance-indicators",
        name: "attendance-indicators",
        component: () =>
            import ("./components/AttendanceIndicators")
    },
    {
        path: "/animals/:id",
        name: "animal-details",
        component: () =>
            import ("./components/AnimalDetails")
    },
    {
        path: '/add-animal',
        name: 'add-animal',
        component: () =>
            import ("./components/AnimalAdd")
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ("./components/UserList")
    },
    {
        path: '/users/:id',
        name: 'user-details',
        component: () =>
            import ("./components/UserDetails")
    },
    {
        path: '/add-user',
        name: 'user-add',
        component: () =>
            import ("./components/UserAdd")
    },
    {
        path: '/public',
        name: 'public-page',
        component: () =>
            import ("./components/PublicPage")
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ("./components/LoginPage")
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ("./components/RegisterPage")
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ("./components/ProfilePage")
    },
    {
        path: '/protected',
        name: 'protected',
        component: () =>
            import ("./components/ProtectedContent")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });


export default router;