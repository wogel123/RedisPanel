<template>
    <div class="login">
        <h3>Sign In</h3>
        <form @submit.prevent="signIn">
            <input type="text" v-model="email"  placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button>Connection</button>
        </form>
        <div class="message" v-if="error">{{ error }}</div>
        <p>
            You don't have an account ? You can
            <router-link to="/sign-up">create one</router-link>
        </p>
    </div>
</template>


<script>
    import { auth } from "@/services/database";

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                error: ""
            };
        },
        methods: {
            async signIn() {
                let result = await auth.signIn(this.email, this.password);

                if (result.message) {
                    this.error = result.message;
                }
            }
        }
    };
</script>

<style scoped>
</style>




<style scoped>
</style>


