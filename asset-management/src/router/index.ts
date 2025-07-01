// import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
// import { useToastStore } from '../stores/useToastStore';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const routes: Array<RouteRecordRaw> = [
//   // { path: "/", component: () => import("../views/HomePage.vue") },
//   // {
//   //   path: "/feed",
//   //   component: () => import("../views/FeedPage.vue"),
//   //   meta: { requiresAuth: true },
//   // },
//   {
//     path: "/",
//     redirect: "/login-page", // Redirect root path to /login-page
//   },
//   {
//     path: "/login-page",
//     component: () => import("../views/LoginPage.vue"),
//     meta: { hideSidebar: true },
//   },
//   {
//     path: "/signup-page",
//     component: () => import("../views/SignUp.vue"),
//     meta: { hideSidebar: true },
//   },
//   {
//     path: "/asset-page",
//     component: () => import("../views/AssetsPage.vue"),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/asset-page/:assetId",
//     component: () => import("../views/AssetDetailPage.vue"),
//     props: true,
//   },
//   {
//     path: "/dashboard-page",
//     component: () => import("../views/DashBoard.vue"),
//     meta: { requiresAuth: true },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Wait for Firebase to initialize the auth state
// let isAuthInitialized = false;

// /*const ensureAuthInitialized = async (): Promise<void> => {
//   if (isAuthInitialized) return;
//   await new Promise<void>((resolve) => {
//     const unsubscribe = onAuthStateChanged(getAuth(), () => {
//       isAuthInitialized = true;
//       unsubscribe(); // Stop listening once the state is known
//       resolve();
//     });
//   });
// };*/

// const ensureAuthInitialized = async (): Promise<void> => {
//   if (isAuthInitialized) return;

//   try {
//     await new Promise<void>((resolve) => {
//       const unsubscribe = onAuthStateChanged(getAuth(), () => {
//         isAuthInitialized = true;
//         unsubscribe(); // Stop listening once the state is known
//         resolve();
//       });
//     });
//   } catch (err) {
//     console.warn("Firebase auth not available, skipping auth init.");
//     isAuthInitialized = true;
//   }
// };


// // Navigation Guard
// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   await ensureAuthInitialized();
//   const requiresAuth = to.matched.some((record: RouteRecordRaw) => record.meta?.requiresAuth);
//   const currentUser = getAuth().currentUser;
//   const toastStore = useToastStore();

//   if (requiresAuth && !currentUser) {
//     toastStore.setToastMessage("You need to log in to access this page.", "error");
//     console.log("Access denied");
//     next('/login-page'); // Redirect if not authenticated
//   } else {
//     next(); // Allow access if authenticated or the route does not require auth
//   }
// });

// export default router;


import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login-page",
  },
  {
    path: "/login-page",
    component: () => import("../views/LoginPage.vue"),
    meta: { hideSidebar: true },
  },
  {
    path: "/signup-page",
    component: () => import("../views/SignUp.vue"),
    meta: { hideSidebar: true },
  },
  {
    path: "/dashboard-page",
    component: () => import("../views/DashBoard.vue"),
  },
{
    path: "/asset-page",
    component: () => import("../views/AssetsPage.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/asset-page/:assetId",
    component: () => import("../views/AssetDetailPage.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

