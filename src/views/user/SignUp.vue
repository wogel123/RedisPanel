<template>
    <div class="login">
        <h3>Let's create a new account !</h3>
        <form @submit.prevent="signUp">
            <input type="text" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button>Sign Up</button>
        </form>
        <div class="message" v-if="error">{{ error }}</div>
        <span>
      or go back to
      <router-link to="/login">login</router-link>.
    </span>
    </div>
</template>

<script>
    import { auth } from "@/services/database";

    export default {
        name: "signup",
        data() {
            return {
                email: "",
                password: "",
                error: ""
            };
        },
        methods: {
            async signUp() {
                let result = await auth.signUp(this.email, this.password);

                if (result.message) {
                    this.error = result.message;
                }
            }
        }
    };
</script>

<style scoped>
</style>


