<template>
    <div>
        <div class="search_filter">
            <input type="text" placeholder="Search..." v-model="search">
        </div>
        <div class="language_selector">
            <span @click="switchLanguage('en')" v-show="language === 'fr'">Changer pour Anglais</span>
            <span @click="switchLanguage('fr')" v-show="language === 'en'">Changer pour Français</span>
        </div>
        <router-link class="add" :to="{name: 'traduction-add', params: {plugin: this.plugin,language: this.language}}">
            <i class="fas fa-plus"></i>
        </router-link>
        <div class="content">
            <ul v-if="filter.length !== 0" id="list">
                <li v-for="(translation) in filter" class="card" v-bind:key="translation.key">
                    <div class="element">
                        <span class="element_key" v-html="highlight(translation.key)"></span>
                        <div class="element_value">{{ translation.value.length > 50 ? translation.value.substring(0, 50)
                            +
                            "..." : translation.value}}
                        </div>
                        <div class="element_action">
                            <router-link class="btn"
                                         :to="{name: 'traduction-edit', params: {plugin: plugin,key: translation.key,language: language}}">
                                Editer
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else>
                <div class="search_any_result"><span>Aucun résultats</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {client} from '@/services/redis'

    export default {
        name: "List",
        data() {
            return {
                plugin: this.$route.params.plugin,
                language: this.$route.params.language,
                list: [],
                search: ''
            }
        },
        created() {
            client.translations.fetchAllTranslations(this.plugin, this.language, (response) => {
                Object.entries(response.data).forEach(element => {
                    this.list.push({
                        key: element[0],
                        value: element[1]
                    });
                });
            })

        },
        methods: {
            highlight(value) {
                if (this.search.length > 1)
                    return value.replace(new RegExp(this.search, "gi"), match => {
                        return "<span class='highlight'>" + match + "</span>"
                    })
                return value;
            },
            switchLanguage(language) {
                this.$router.replace({
                    name: "traduction-list",
                    params: {
                        plugin: this.plugin,
                        language: language
                    }
                })
            }
        },
        computed: {
            filter() {
                let array = this.list.filter(translation => {
                    return translation.key.includes(this.search.toLowerCase())
                });
                return this.$lodash.orderBy(array, 'key', 'asc');
            }
        }
    }
</script>

<style scoped lang="scss">
    .card {

        margin: 0 auto;
        width: 95%;

        .element {
            display: grid;
            grid-template-columns: 5fr 8fr 1fr;
            grid-template-rows: 1fr;
            grid-column-gap: 0px;
            grid-row-gap: 0px;

            background-color: #ffffff;
            margin: .5% 0;
            padding: 10px;
            color: #000000;

            .element_key {

            }

            .element_action {
                display: flex;

                .btn {
                    display: flex;
                    padding: .5rem;
                    background-color: #0c2461;
                    color: #ffffff;
                    vertical-align: middle;
                    border-radius: .2rem;
                }

                a {
                    text-decoration: none;
                }
            }
        }
    }

    .search_filter {
        position: absolute;
        top: 80px;
        right: 10px;

        input {
            border: none;
            border-bottom: 1px solid #000000;
        }
    }

    .search_any_result {
        color: #000000;
        text-align: center;
    }

    .language_selector {
        position: absolute;
        top: 80px;
        color: #000000;
        cursor: pointer;
    }

    .add {
        position: absolute;
        top: 82px;
        right: 180px;
        text-decoration: none;
        color: #000000;
    }

    .content {
        height: 80vh;
    }

    #list {
        overflow-y: auto;
        list-style: none;
    }

</style>