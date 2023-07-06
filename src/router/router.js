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
import UsersList from '../pages/Admin/UsersList.vue';
import MessagesList from '../pages/Admin/MessagesList.vue';
import AdminDashboard from '../pages/Admin/Dashboard.vue';
import Products from '../pages/Products.vue';
import AdminProducts from '../pages/Admin/Products.vue';
import EditProduct from '../pages/Admin/EditProduct.vue';
import DeleteProduct from '../pages/Admin/DeleteProduct.vue';
import NewProduct from '../pages/Admin/NewProduct.vue';
import UserDetail from '../pages/Admin/UserDetail.vue';
import OrderProduct from '../pages/OrderProduct.vue';

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
      path: '/products',
      component: Products,
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
      path: '/admin',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/lista-mensajes',
      component: MessagesList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/lista-usuarios',
      component: UsersList,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/products',
      component: AdminProducts,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/products/edit/:id',
      component: EditProduct,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/products/delete/:id',
      component: DeleteProduct,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/products/new',
      component: NewProduct,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/user/:id',
      component: UserDetail,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/products/order/:id/:userId',
      component: OrderProduct,
      meta: { requiresAuth: true },
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

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && user.id === null) {
      return {
        path: '/iniciar-sesion',
      }
    } else if (to.meta.requiresAdmin) {
      // Check the user's role
      const userRole = await isAdmin(user.id);
  
      if (!userRole) {
        return {
          path: '/',
        }
      } 
    }
  });

export default router;