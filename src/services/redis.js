import {redisHistoryCollection} from "./database";
import axios from 'axios'
import store from "../store";
import Vue from 'vue'

const client = {};
const translations = {};
const configurations = {};
const URL = "http://149.91.91.149:3001";

translations.updateTranslation = (plugin, language, key, value, previous, callback) => {
    let prefix = plugin + "_" + language + "_";
    if (previous === value) {
        Vue.toasted.show("La valeur est indentique", {
            keepOnHover: false,
            duration: 5000,
            className: 'error'
        });
    } else {
        axios.post(URL + "/language/" + plugin + "/" + language + "/" + key, {
            value: value
        }).then(response => {
            let document = redisHistoryCollection.doc(prefix + key);
            document.collection("history").add({
                value: value,
                author: store.state.userProfile.name,
                date: new Date()
            }).then(r => {
                callback()
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

translations.addTranslation = (plugin, language, key, value, callback) => {
    let prefix = plugin + "_" + language + "_";
    axios.post(URL + "/language/" + plugin + "/" + language + "/" + key, {
        value: value
    }).then(response => {
        let document = redisHistoryCollection.doc(prefix + key);
        document.collection("history").add({
            value: value,
            author: store.state.userProfile.name,
            date: new Date()
        }).then(r => {
            callback()
        });
    }).catch(ignored => {
    });
}



translations.fetchAllTranslations = (plugin, language, callback) => {
    axios.get(URL + "/language/" + plugin + "/" + language)
        .then(response => {
            callback(response)
        })
        .catch(ignored => {
        })
}

translations.getTranslation = (plugin, language, key, callback) => {
    axios.get(URL + "/language/" + plugin + "/" + language + "/" + key)
        .then(response => {
            callback(response)
        })
        .catch(error => {
            console.log(error)
        })
};

translations.getHistory = (plugin, language, key, callback) => {
    let prefix = plugin + "_" + language + "_";
    let array = [];
    redisHistoryCollection.doc(prefix + key).collection("history").orderBy("date", 'desc').get().then(snapshot => {
        snapshot.forEach(doc => {
            let d = doc.data();
            d.key = doc._key.path.segments[8];
            array.push(d)
        })
    });
    callback(array);
}

client.translations = translations;

configurations.loadConfiguration = (path, callback) => {
    axios.get(URL + "/path/" + path)
        .then(response => {
            callback(response)
        })
        .catch(ignored => {
        })
}

client.configurations = configurations;


export {
    client
}