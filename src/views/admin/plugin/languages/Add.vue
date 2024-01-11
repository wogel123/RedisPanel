<template>
    <div class="edition">
        <div class="card content">
            <div class="header">
                <div class="title">
                    Contenu de : <input type="text" v-model="key">
                </div>
                <div class="actions">
                    <i @click="togglePreview" v-bind:class="{'far fa-eye': preview, 'fas fa-eye': !preview}"></i>
                </div>

            </div>
            <div class="body">
                <ResizeableTextarea>
                    <textarea v-show="!preview" name="" v-model="value" ref="area" spellcheck="true"
                              autocomplete="off"
                              autocapitalize="off"></textarea>
                </ResizeableTextarea>
                <div v-show="preview" ref="render"></div>
            </div>
        </div>
        <div class="card infos sidebar">
            <div class="update">
                <span class="btn" @click="add">Ajouter</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {client} from '@/services/redis'
    import minecraft from "../../../../services/minecraft";
    import ResizeableTextarea from "@/lib/Resizeable-textarea"

    export default {
        name: "add",
        components: {ResizeableTextarea},
        data() {
            return {
                plugin: this.$route.params.plugin,
                language: this.$route.params.language,
                key: "",
                value: "",
                preview: false
            }
        },
        methods: {
            add() {
                client.translations.updateTranslation(this.plugin, this.language, this.key, this.value, this.previous, () => {
                    this.$toasted.show(this.key + " a été ajouté", {
                        keepOnHover: false,
                        duration: 5000,
                        className: 'success'
                    });

                    let language = this.language;
                    language === 'fr' ? language = 'en' : language = 'fr';

                    this.$router.push({
                        name: "traduction-list",
                        params: {
                            plugin: this.plugin,
                            language: this.language
                        }
                    });

                    client.translations.updateTranslation(this.plugin, language, this.key, this.key, this.previous, () => {
                        this.$toasted.show("N'oubliez pas de modifier la traduction en autre langue", {
                            keepOnHover: false,
                            duration: 5000,
                            className: 'info'
                        });
                    });
                })
            },
            togglePreview() {
                this.preview = !this.preview;
            },
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

                .title {
                    input {
                        border: none;
                        border-bottom: 1px solid rgba(0, 0, 0, .125);
                    }
                }

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

</style>