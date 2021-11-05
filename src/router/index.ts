import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        // 当我访问根路径，自动切换到页面为 /money的路径
        path: "/",
        redirect:"/money",
    },
    {
        path: "/money",
        component: Money
    },
    {
        path: "/labels",
        component: Labels
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        // 404页面
        path:"*",
        component:NotFound
    }
];

const router = new VueRouter({
    routes
});

export default router;
