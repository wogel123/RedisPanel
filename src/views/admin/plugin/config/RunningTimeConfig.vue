<template>
    <div>
        <div class="grid">
            <div class="card game">
                <div class="header">
                    <div class="title">
                        Gestion de la partie
                    </div>
                    <div class="actions">
                        <i></i>
                    </div>
                </div>
                <div class="body">
                    <div class="team_size">
                        <span>Durée de la partie (en {{ gameDurationFormat }}) :</span>
                        <div class="range">
                            <input type="range" min="300" max="7200" v-model="gameDuration">
                            <span>{{ formatSeconds(gameDuration) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card team">
                <div class="header">
                    <div class="title">
                        Gestion des teams
                    </div>
                    <div class="actions">
                        <i></i>
                    </div>
                </div>
                <div class="body">
                    <div class="team_size">
                        <span>Taille des équipes :</span>
                        <div class="range">
                            <input type="range" min="1" max="15" v-model="teamSize">
                            <span>{{ teamSize }}</span>
                        </div>
                    </div>
                    <div class="team_list">
                        <span>Equipes :</span>
                        <div v-for="team in teams" class="team_label" @click="openEditTeamModal(team)">
                            <span v-bind:style="{borderColor: getColorFromCode(team.color)}">{{ team.name }}</span>
                        </div>
                        <div class="add" @click="openAddTeamModal">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EditTeamModal :team="modal.editTeam.data" v-if="modal.editTeam.show" @close="onCloseEditTeamModal"></EditTeamModal>
        <AddTeamModal v-if="modal.addTeam.show" @close="onCloseAddTeamModal"></AddTeamModal>
    </div>
</template>

<script>
    import {client} from "../../../../services/redis";
    import moment from 'moment'
    import minecraft from "../../../../services/minecraft";
    import EditTeamModal from "../../../../component/admin/plugin/config/EditTeamModal";
    import AddTeamModal from "../../../../component/admin/plugin/config/AddTeamModal";

    export default {
        name: "RunningTimeConfig",
        components: {AddTeamModal, EditTeamModal},
        data() {
            return {
                modal: {
                    editTeam: {
                        show: false,
                        data: {}
                    },
                    addTeam : {
                        show: false
                    }
                },
                config: {},
                teamSize: 1,
                gameDuration: 1,
                gameDurationFormat: "minutes",
                teams: {}
            }
        },
        created() {
            client.configurations.loadConfiguration("config:runningtime:data:config:votemap", (response) => {
                console.log(response.data)

                this.teamSize = response.data.config.teams_size;
                this.gameDuration = response.data.config.time;
                this.teams = response.data.teams;
            })
        },
        methods: {
            openEditTeamModal(team) {
                this.modal.editTeam.data = team;
                this.modal.editTeam.show = true;
            },
            onCloseEditTeamModal(data) {
                this.modal.editTeam.show = false;
            },
            openAddTeamModal() {
                this.modal.addTeam.show = true;
            },
            onCloseAddTeamModal(data) {
                this.teams[data.name] = data;
                this.modal.addTeam.show = false;
            },
            formatSeconds(seconds) {
                let format = seconds >= 3600 ? "HH:mm" : "mm:ss";
                return moment("2016-09-20 00:00:00").seconds(seconds).format(format)
            },
            getColorFromCode(code) {
                return minecraft.getColorCode(code)
            }
        },
        watch: {
            gameDuration(seconds) {
                let format = seconds >= 3600 ? "heures" : "minutes";
                this.gameDurationFormat = format;
            }
        }
    }
</script>

<style scoped lang="scss">

    .grid {
        column-width: 30em;
        column-gap: 1em;

        > div {
            display: inline-block;
        }
    }

    .card {
        display: flex;
        word-wrap: break-word;
        border-radius: .1875rem;
        background-color: #ffffff;
        border: 1px solid rgba(0, 0, 0, .125);
        margin: 1rem 0 1rem 1rem;
        flex-direction: column;
        width: 100%;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap;
            padding: .9rem 1.25rem;
            border-bottom: 1px solid rgba(0, 0, 0, .125);

            .actions {
                display: flex;

                * {
                    cursor: pointer;
                }
            }

        }

        .body {
            flex: 1 1 auto;
            padding: 1.25rem;

            > div:not(:first-child) {
                padding-top: 15px;
            }
        }
    }

    .team_size {
        .range {
            input {
                -webkit-appearance: none;
                width: calc(100% - 73px);
                height: 10px;
                border-radius: 5px;
                background: #d7dcdf;
                outline: none;
                padding: 0;
                margin: 0;

                &::-moz-range-thumb {
                    background-color: #2c3e50;
                }
            }

            span {
                display: inline-block;
                position: relative;
                color: #ffffff;
                line-height: 20px;
                text-align: center;
                border-radius: 3px;
                background: #2c3e50;
                padding: 5px 10px;
                margin-left: 8px;

                &:after {
                    position: absolute;
                    top: 8px;
                    left: -7px;
                    width: 0;
                    height: 0;
                    border-top: 7px solid transparent;
                    border-right: 7px solid #2c3e50;
                    border-bottom: 7px solid transparent;
                    content: '';
                }
            }
        }
    }

    .team_list {
        .team_label {
            display: inline-block;
            cursor: pointer;

            span {
                margin: 4px;
                border-bottom: 1px solid white;
            }

        }

        .add {
            display: inline-block;
            cursor: pointer;
        }
    }

</style>