<template>
    <div class="edition">

        <div class="language_selector">
            <span @click="switchLanguage('en')" v-show="language === 'fr'">Changer pour Anglais</span>
            <span @click="switchLanguage('fr')" v-show="language === 'en'">Changer pour Français</span>
        </div>

        <div class="card content">
            <div class="header">
                <div class="title">
                    Contenu de : {{ key }}
                </div>
                <div class="actions">
                    <i @click="togglePreview" v-bind:class="{'far fa-eye': preview, 'fas fa-eye': !preview}"></i>
                </div>

            </div>
            <div class="body">
                <ResizeableTextarea>
                    <textarea v-show="!preview" name="" v-model="value" ref="area" spellcheck="true"
                              autocomplete="off"
                              autocapitalize="off"
                              @keyup="keydownEditor"></textarea>
                </ResizeableTextarea>
                <div v-show="preview" ref="render"></div>
            </div>
        </div>
        <div class="card infos sidebar">
            <div class="update">
                <span class="btn" @click="update">Mettre à jour</span>
            </div>

            <div v-show="history.length > 0">
                <div class="header">
                    <div class="title">
                        Historique
                    </div>
                    <div class="actions">
                        <i v-bind:class="{'fas fa-angle-down': history_opened, 'fas fa-angle-up': !history_opened}"
                           @click="openHistory"></i>
                    </div>
                </div>
                <div class="body secondary" v-bind:class="{opened: history_opened}">
                    <div v-for="h in history">
                        <span class="key">{{ h.key }}</span>
                        <div class="row">
                            <div class="info">
                                <span>{{ moment(h.date.seconds * 1000) }}</span>
                                <span class="author">par {{ h.author }}</span>
                            </div>
                            <span class="btn" @click="checkHistory(h)">Voir</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {client} from '@/services/redis'
    import minecraft from "../../../../services/minecraft";
    import ResizeableTextarea from "@/lib/Resizeable-textarea"
    import moment from "moment";

    export default {
        name: "edit",
        components: {ResizeableTextarea},
        data() {
            return {
                plugin: this.$route.params.plugin,
                language: this.$route.params.language,
                key: this.$route.params.key,
                value: "",
                previous: "",
                history: [],
                preview: false,
                history_opened: true
            }
        },
        mounted() {
            client.translations.getTranslation(this.plugin, this.language, this.key, (response) => {
                this.value = response.data;
                this.previous = this.value;
            });

            client.translations.getHistory(this.plugin, this.language, this.key, (response) => {
                this.history = response;
            });
        },
        methods: {
            moment(date) {
              return moment(date).calendar()
            },
            update() {
                client.translations.updateTranslation(this.plugin, this.language, this.key, this.value, this.previous, () => {
                    this.$toasted.show(this.key + " mis à jour !", {
                        keepOnHover: false,
                        duration: 5000,
                        className: 'success'
                    });
                    this.$router.push({
                        name: "traduction-list",
                        params: {
                            plugin: this.plugin,
                            language: this.language
                        }
                    })
                })
            },
            togglePreview() {
                this.preview = !this.preview;
            },
            openHistory() {
                this.history_opened = !this.history_opened;
            },
            keydownEditor(key) {
            },
            checkHistory(history) {
                this.value = history.value;
                if (this.preview) {
                    this.$refs.render.innerHTML = "";
                    this.$refs.render.appendChild(minecraft.translateColorCode(this.value));
                }
            },
            switchLanguage(language) {
                this.$router.replace({
                    name: "traduction-edit",
                    params: {
                        plugin: this.plugin,
                        language: language,
                        key: this.key
                    }
                })
            }
        },
        watch: {
            preview(value) {
                if (value)
                    this.$refs.render.appendChild(minecraft.translateColorCode(this.value));
                else
                    this.$refs.render.innerHTML = ""
            }
        }
    }
</script>

<style scoped lang="scss">

    .edition {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        color: #333333;

        .card {

            display: flex;
            word-wrap: break-word;
            border-radius: .1875rem;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, .125);
            margin: 1rem 0 1rem 1rem;
            flex-direction: column;

            &.content {
                width: 100%;
            }


            &.infos {
                width: 40rem;
                max-height: 100vh;

                .body {
                    &.secondary {
                        max-height: 0;
                        transition: max-height .2s ease-in-out;

                        &.opened {
                            max-height: 427px;
                        }

                        overflow: auto;

                        > div {
                            border-color: rgba(0, 0, 0, .05);
                        }


                        .key {
                            &:before {
                                content: "#";
                            }

                            font-weight: 100;
                            letter-spacing: 1px;
                            font-size: 10px;
                            top: 5px;
                            left: 5px;
                            position: absolute;
                        }

                        .row {
                            display: grid;
                            grid-template-columns: 5fr 1fr;
                            grid-template-rows: 1fr;
                            grid-column-gap: 3px;
                            grid-row-gap: 0px;
                            padding-top: 5px;
                        }
                    }

                    > div {
                        position: relative;
                        padding: 1.25rem;
                        border-bottom: 1px solid rgba(0, 0, 0, .125);
                    }

                    .btn {
                        cursor: pointer;
                        color: #ffffff;
                        background-color: #34495e;
                        line-height: 31px;
                        padding: .2rem;
                        border-radius: .2rem;
                        float: right;
                        text-align: center;
                    }

                    .info {
                        overflow-wrap: break-word;

                        > * {
                            display: block;
                        }

                        .author {
                            font-size: 13px;
                        }
                    }
                }

                .update {
                    background-color: rgba(0, 0, 0, .025);
                    padding: 1rem;
                    display: flex;

                    .btn {
                        color: #ffffff;
                        background-color: #2ecc71;
                        width: 100%;
                        text-align: center;
                        vertical-align: middle;
                        border-radius: .25rem;
                        padding: .5rem .8rem;
                        transition: all .15s ease-in-out;
                        cursor: pointer;

                        &:hover {
                            box-shadow: 0 0 0 10rem rgba(0, 0, 0, .075) inset;
                        }
                    }

                }
            }

            &.content {

                .body {
                    padding: 1.25rem;
                }
            }

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

                textarea {
                    outline: none;
                    resize: none;
                    width: 100%;
                    height: 100%;
                    border: none;
                    padding: 5px;
                    min-height: 200px;
                }
            }
        }
    }

    .language_selector {
        position: absolute;
        top: 80px;
        color: #000000;
        cursor: pointer;
    }

</style>