<template>
    <div>
        <PluginNavbar :plugin="plugin"></PluginNavbar>
        <router-view class="plugin_edition"></router-view>
    </div>
</template>

<script>
    import PluginNavbar from "../component/admin/plugin/PluginNavbar";

    export default {
        name: "Plugin",
        components: {PluginNavbar},
        data() {
            return {
                plugin: this.$route.params.plugin
            }
        }
    }
</script>

<style scoped>

    .plugin_edition {
        margin-top: 61px;
        padding: 0px 1.25rem 30px;
        overflow-y: auto;
        height: 80vh;

        color: #333333;

    }

</style>