const PageSignup = () => import("./pages/PageSignup");
const PageLogin = () => import("./pages/PageLogin");
const PlainLayout = () => import("./layouts/PlainLayout");
const BaseLayout = () => import("./layouts/BaseLayout");
const PageTodo = () => import("./pages/PageTodo");
const PageDone = () => import("./pages/PageDone");

const routes = [
    {
        path: '/',
        component: BaseLayout,
        children: [{
            path: '',
            component: PageTodo
        }]
    },
    {
        path: '/done',
        component: BaseLayout,
        children: [{
            path: '',
            component: PageDone
        }]
    },
    {
        path: '/signup',
        component: PlainLayout,
        children: [{
            path: '',
            component: PageSignup
        }]
    },
    {
        path: '/login',
        component: PlainLayout,
        children: [{
            path: '',
            component: PageLogin
        }]
    }
];

export default routes;