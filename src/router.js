import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/user/Login.vue'
import LanguageEdit from './views/admin/plugin/languages/Edit.vue'
import LanguageList from './views/admin/plugin/languages/List.vue'
import LanguageAdd from './views/admin/plugin/languages/Add.vue'
import GestionUsersAdd from './views/admin/gestion/users/Add.vue'
import store from '@/store'
import AdminTemplate from "./template/AdminTemplate";
import DefaultTemplate from "./template/DefaultTemplate";
import PluginTemplate from "./template/PluginTemplate";

import plugins from "./services/plugins";
import permissions from "./services/permissions";
import RunningTimeConfig from "./views/admin/plugin/config/RunningTimeConfig";

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/admin",
            component: AdminTemplate,
            name: "admin",
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: "dashboard",
                    name: "dashboard",
                },
                {
                    path: "players",
                    component: DefaultTemplate,
                    name: "players"
                },
                {
                    path: "plugins/:plugin",
                    component: PluginTemplate,
                    name: "plugin",
                    meta: {
                        title: "Plugin {plugin}"
                    },
                    children: [
                        {
                            path: "languages/:language",
                            component: DefaultTemplate,
                            meta: {
                                title: "Traductions {plugin}"
                            },
                            children: [
                                {
                                    path: "",
                                    component: LanguageList,
                                    name: "traduction-list"
                                },
                                {
                                    path: "edit/:key",
                                    component: LanguageEdit,
                                    name: "traduction-edit"
                                },
                                {
                                    path: "add",
                                    component: LanguageAdd,
                                    name: "traduction-add"
                                }
                            ]
                        },
                        {
                            path: "server",
                            component: DefaultTemplate,
                            name: "server"
                        },
                        {
                            path: "config",
                            component: DefaultTemplate,
                            children: [
                                {
                                    path: "runningtime",
                                    component: RunningTimeConfig,
                                    name: "config-runningtime"
                                }
                            ]
                        }
                    ]
                },
                {
                    path: "gestion",
                    component: DefaultTemplate,
                    meta: {
                        permission: 'admin'
                    },
                    children: [
                        {
                            path: "users",
                            name: "gestion-users",
                            component: GestionUsersAdd
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAnonymous: true
            }
        },
        {
            path: "*",
            redirect: "/admin"
        }
    ]
});


router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithPermissions = to.matched.slice().reverse().find(r => r.meta && r.meta.permission);

    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if (nearestWithTitle) {
        let title = nearestWithTitle.meta.title;
        Object.keys(to.params).forEach(key => {
            let value = to.params[key];
            title = title.replace('{' + key + '}', value.charAt(0).toUpperCase() + value.slice(1));
        });
        document.title = title;
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if (nearestWithMeta) {
        nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
        // Add the meta tags to the document head.
            .forEach(tag => document.head.appendChild(tag));
    }


    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const requiresAnonymous = to.matched.some(x => x.meta.requiresAnonymous);
    const currentUser = store.state.currentUser;
    const userProfile = store.state.userProfile;
    const isLogged = currentUser && (userProfile !== undefined && userProfile.length !== 0);

    if (to.params.language !== undefined) {
        store.state.translations_language = to.params.language;
    }
    if(to.params.plugin && !plugins.isSupported(to.params.plugin)){
        next({
            name: 'admin'
        });
        Vue.toasted.show(`Le plugin ${to.params.plugin} n'est pas supporté`, {
            keepOnHover: false,
            duration: 5000,
            className: 'error'
        })
        return;
    }

    if (nearestWithPermissions) {
        if (!(userProfile && permissions.isAllowed(nearestWithPermissions.meta.permission, userProfile.grade))) {
            next(from);
            Vue.toasted.show("Vous n'avez pas la permission d'acceder a cette page", {
                keepOnHover: false,
                duration: 5000,
                className: 'error'
            })
            return;
        }
    }
    if (requiresAuth) {
        if (!isLogged) {
            next({
                name: 'login'
            });
            Vue.toasted.show("Vous devez être connecté !", {
                keepOnHover: false,
                duration: 5000,
                className: 'error'
            })
            return;
        }
    }
    if (requiresAnonymous) {
        if (isLogged) {
            next(from);
            Vue.toasted.show("Vous êtes déjà connecté !", {
                keepOnHover: false,
                duration: 5000,
                className: 'info'
            })
            return;
        }
    }
    next()
});


export default router