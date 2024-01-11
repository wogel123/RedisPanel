import firebase from 'firebase'
import store from '@/store'
import router from '@/router'

var config = {
    apiKey: "AIzaSyBT0ZMPrpP8Bi37DYL3BNVYog16xqqpwl0",
    authDomain: "alphasia-redis-panel.firebaseapp.com",
    databaseURL: "https://alphasia-redis-panel.firebaseio.com",
    projectId: "alphasia-redis-panel",
    storageBucket: "alphasia-redis-panel.appspot.com",
    messagingSenderId: "217628579457",
    appId: "1:217628579457:web:ebc614cc52dc899f"
};

const auth = firebase.initializeApp(config);
const workarount = firebase.initializeApp(config, "workaround");
const firestore = firebase.firestore();
const usersCollection = firestore.collection('users');
const redisHistoryCollection = firestore.collection('redisHistory');

auth.createNewAccount = async (email, password, params, callback) => {
    try {
        await workarount.auth().createUserWithEmailAndPassword(email, password).then(response => {
            usersCollection.doc(response.user.uid).set(params).then(() => {
                callback()
            });
        })
    } catch (error) {

    }
}

auth.signIn = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        store.commit('setCurrentUser', firebase.auth().currentUser);
        store.dispatch('fetchUserProfile');
        router.push('/profile');
        return true
    } catch (error) {
        return error
    }
};

auth.signOut = async () => {
    try {
        await firebase.auth().signOut();

        store.dispatch('clearData');
        router.push('/');

        return true
    } catch (error) {
        return error
    }
};

auth.resetPassword = async (email) => {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return true
    } catch (error) {
        return error
    }
};

usersCollection.getByUid = async (uid) => {
    return await usersCollection.doc(uid).get();
};

export {
    auth,
    firebase,
    usersCollection,
    redisHistoryCollection
}