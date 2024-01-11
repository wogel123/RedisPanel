<template>
    <div class="navbar">
        <div class="left">
            <a href="#">
                <span><img src="" alt="logo"></span>
            </a>
        </div>
        <div class="right">
            <div class="user">
                <span>{{ currentProfile.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {auth} from '@/services/database'

    export default {
        name: "Navbar",
        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },
            currentProfile() {
                return this.$store.state.userProfile;
            }
        },
        methods: {
            signOut() {
                auth.signOut();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 60px;
        background-color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #f2f2f2;

        .left {
            float: left;
            background-color: #18202d;
            text-align: center;
            height: 60px;
            width: 20vw;
        }

        .right {
            float: right;
            padding: 0 20px;
            height: 100%;
            line-height: 60px;
            text-align: center;


            .user {
                color: #000000;
            }
        }
    }
</style>