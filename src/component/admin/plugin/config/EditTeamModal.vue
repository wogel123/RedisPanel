<template>
    <div>
        <div class="modal-overlay" @click="close"></div>
        <div class="modal">
            <input type="text" v-model="team.name">
            <input type="text" v-model="team.color">
            <input type="text" v-model="team.banner_color">
            <input type="text" v-model="team.inventory">
            <input type="text" v-model="team.scoreboard_id">
            <input type="text" v-model="team.scoreboard_line">
            <input type="text" v-model="team.glass_color">
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditTeamModal",
        props: {
          team: {
              type: Object,
              required: true
          }
        },
        created(){
            window.document.addEventListener('keydown', this.closeOnESC);
        },
        beforeDestroy () {
            window.document.removeEventListener('keydown', this.closeOnESC);
        },
        methods: {
            close() {
                this.$emit('close', this.team)
            },
            closeOnESC(key) {
                if(key.keyCode === 27){
                    this.close()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .close {
        animation-direction: reverse;
    }
    .modal-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        animation-name: fadeIn;
        animation-duration: .6s;
        background-color: #000000;
        will-change: opacity;
        animation-fill-mode: both;
    }


    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to{
            opacity: .4;
        }
    }


    .modal {
        position: fixed;
        left: 0;
        right: 0;
        height: 45%;
        background-color: #ffffff;
        animation-name: up;
        animation-duration: .6s;
        animation-fill-mode: both;
        will-change: bottom;
    }

    @keyframes up {
        from{
            bottom: -45%;
        }
        to{
            bottom: 0;
        }
    }

</style>