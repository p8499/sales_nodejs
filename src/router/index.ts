import Vue from 'vue'
import VueRouter, {Route} from 'vue-router'
import {stringToFilterItemsModel, stringToNumber, stringToSortModel} from "@/components/lib/pac-common";
import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";
import pages from "@/pages";

Vue.use(VueRouter);

const routes = [{
    name: 'employee-list',
    path: '/employee-list',
    component: () => import('@/views/employee-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(EMPLOYEE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string),
    })
}, {
    name: 'employee-update',
    path: '/employee-update/:emid',
    component: () => import('@/views/employee-update.vue'),
    props: (route: Route) => Object({
        initEmid: stringToNumber(route.params['emid'])
    })
}, {
    name: 'employee-add',
    path: '/employee-add',
    component: () => import('@/views/employee-add.vue')
}];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    to.meta['alive'] =
        typeof (to.name) === 'string' &&
        typeof (from.name) === 'string' &&
        pages.relation(to.name, from.name);
    next();
});

export default router
