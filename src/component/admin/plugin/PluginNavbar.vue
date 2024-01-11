<template>
    <div class="plugin_navigation">
        <ul class="plugin_navigation_elements" v-for="link in links[plugin]">
            <li>
                <router-link :to="{name: link.to, params: link.params}">
                    {{ link.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "PluginNavbar",
        props: {
            plugin: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                links: {
                    'api': [],
                    'beaconcatch': [],
                    'bungee': [],
                    'hub': [],
                    'runningtime': [{
                        title: "Config",
                        to: "config-runningtime",
                        params: {
                            plugin: this.plugin
                        }
                    }],
                    'theblock': [],
                    'warjump': []
                }
            }
        },
        mounted() {
            if (this.plugin !== "api") {
                this.links[this.plugin].splice(0, 0, {
                    title: 'Serveurs',
                    to: "server",
                    params: {
                        plugin: this.plugin,
                        language: this.$store.state.translations_language
                    }
                });
            }

            this.links[this.plugin].push({
                title: 'Traductions',
                to: "traduction-list",
                params: {
                    plugin: this.plugin,
                    language: this.$store.state.translations_language
                }
            });

            if (this.$route.name === "plugin") {
                this.$router.replace({
                    name: this.links[this.plugin][0].to,
                    params: this.links[this.plugin][0].params
                })
            }
        }
    }
</script>

<style scoped lang="scss">

    .plugin_navigation {
        height: 60px;
        background-color: #ffffff;
        border-bottom: 1px solid #f2f2f2;
        position: fixed;
        width: 80vw;
        flex-direction: row;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;

        .plugin_navigation_elements {
            list-style: none;

            a {
                display: block;
                height: 100%;
                line-height: 60px;
                text-decoration: none;
                color: #000000;
                padding: 0 1em;

                &:hover, &.router-link-active {
                    box-shadow: 0 1px 0 #000000;
                }
            }
        }
    }

</style>