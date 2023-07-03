import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth.js';
import { isAdmin } from '../services/users.js'
import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import MyProfile from '../pages/MyProfile.vue';
import UserProfile from '../pages/UserProfile.vue';
import PrivateChat from '../pages/PrivateChat.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/iniciar-sesion',
        component: Login,
    },
    {
        path: '/registro',
        component: Register,
    },
    {
        path: '/chat',
        component: Chat,
        meta: { requiresAuth: true },
    },
    {
        path: '/perfil',
        component: MyProfile,
        meta: { requiresAuth: true },
    },
    {
        path: '/usuario/:id',
        component: UserProfile,
        meta: { requiresAuth: true },
    },
    {
        path: '/usuario/:id/chat',
        component: PrivateChat,
        meta: { requiresAuth: true },
    },
    {
        path: '/lista-usuarios',
        component: PrivateChat,
        meta: { requiresAuth: true, requiresAdmin: true },
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
};

subscribeToAuth(newUser => user = newUser);

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth && user.id === null) {
      next('/iniciar-sesion');
    } else if (to.meta.requiresAdmin) {
      // Check the user's role
      const userRole = await isAdmin(user.id);
  
      if (userRole) {
        next();
      } else {
        next('/');
      }
    } else {
      next();
    }
  });

export default router;