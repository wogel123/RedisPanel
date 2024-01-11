<template>
    <div>
        <form @submit.prevent="create">
            <input type="text" v-model="email"  placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <input type="text" v-model="name">
            <select name="" id="" v-model="grade">
                <option disabled value=""> Grade</option>
                <option value="admin">Admin</option>
            </select>
            <button>add</button>
        </form>
    </div>
</template>

<script>
    import { auth } from "@/services/database";

    export default {
        name: "Add",
        data() {
            return {
                email: "",
                password: "",
                error: "",
                name: "",
                grade: ""
            };
        },
        methods: {
            async create() {
                await auth.createNewAccount(this.email, this.password, {
                    name: this.name,
                    grade: this.grade
                }, () => {
                    console.log("créé")
                });
            }
        },
        watch: {
            grade(value) {
                console.log(value)
            }
        }
    }
</script>

<style scoped>

</style>