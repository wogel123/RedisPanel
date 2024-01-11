<template>
    <div class="sidebar">
        <div class="content">
            <div class="navigation" v-for="group in navigation" v-bind:key="group.title">
                <span class="navigation_element_title"> {{ group.title }}</span>
                <ul class="navigation_elements" v-for="element in group.elements" v-bind:key="element.title">
                    <li class="navigation_item">
                        <router-link class="navigation_link" :to="{name: element.to, params: element.params}">
                            <i v-bind:class="element.icon"></i>
                            {{ element.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                navigation: [
                    {
                        title: "Main",
                        elements: [
                            {
                                title: "Dashboard",
                                to: "dashboard",
                                icon: "fas fa-home"
                            },
                            {
                                title: "Joueurs",
                                to: "players",
                                icon: "fas fa-gamepad"
                            }
                        ]
                    },
                    {
                        title: "Plugins",
                        elements: [
                            {
                                title: "API",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "api"
                                }
                            },
                            {
                                title: "Beaconcatch",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "beaconcatch"
                                }
                            },
                            {
                                title: "Bungee",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "bungee"
                                }
                            },
                            {
                                title: "Hub",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "hub"
                                }
                            },
                            {
                                title: "RunningTime",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "runningtime"
                                }
                            },
                            {
                                title: "TheBlock",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "theblock"
                                }
                            },
                            {
                                title: "WarJump",
                                to: "plugin",
                                icon: "fas fa-angle-right",
                                params: {
                                    plugin: "warjump"
                                }
                            }
                        ]
                    },
                    {
                        title: "Administration",
                        elements: [
                            {
                                title: "Utilisateurs",
                                to: "gestion-users",
                                icon: "fas fa-users"
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        width: 20vw;
        background-color: #18202d;
        position: fixed;
        bottom: 0;
        left: 0;
        top: 60px;
        padding-bottom: 30px;

        .content {
            padding-top: 10px;
            max-height: 100%;
            overflow-y: auto;

            .navigation {
                .navigation_element_title {
                    font-weight: bold;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    font-size: 10px;
                    padding: 25px 0 15px 0;
                    margin-left: 5%;
                }

                .navigation_elements {
                    list-style: none;

                    .navigation_item {
                        position: relative;
                    }

                    .navigation_link {
                        display: flex;
                        align-items: center;
                        align-content: center;
                        padding: 10px 0 10px 30px;

                        transition: color .2s;

                        &:hover, &.router-link-active {
                            color: #ffffff;
                        }

                        i {
                            margin-right: .625rem;
                        }
                    }
                }

                a {
                    text-decoration: none;
                    color: #b7c0cd;
                }
            }
        }
    }
</style>