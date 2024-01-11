<template>
    <div id="admin">
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <router-view class="page" :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
    import Navbar from "@/component/admin/Navbar";
    import Sidebar from "../component/admin/Sidebar";

    export default {
        name: "App",
        components: {Navbar, Sidebar},
        data() {
            return {};
        }
    };
</script>

<style lang="scss" scoped>
    .page {
        overflow-y: auto;
        max-width: 80vw;
        margin-left: 20vw;
        margin-top: 61px;
    }
</style>

