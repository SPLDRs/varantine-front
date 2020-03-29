import { userService } from '../services/index';
import { router } from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { 
        loggingIn: false,
        loggedIn: true,
        registering: false,
        updating:false,
        dirty: false }, 
        user }
    : { status: {loggingIn: false}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/intro');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    //console.log("breakpoint");
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    update({ dispatch, commit }){
        commit('updateRequest');
        console.log(state.user);
        return userService.update(state.user)
        .then(
            user => {
                commit('updateSuccess');
                //router.push('/login');
                dispatch('alert/success', 'Update successful.', { root: true });
                commit('setClean');
                return new Promise(function(resolve, reject) {
                    resolve(user);
                });
            },
            error => {
                commit('updateFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    updateAvatar({ dispatch, commit }, {id,  formData}) {
        commit('updateRequest');
        //console.log('account module');
        return userService.updateAvatar(id, formData)
            .then(
                image => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', 'Update avatar successful.', { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(image);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    addHouse({ dispatch, commit }, {id, house}) {
        commit('updateRequest');
        //console.log('account module');
        return userService.addHouse(id, house)
            .then(
                houses => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', 'Add house successful.', { root: true });
                    dispatch('houses/getAll', null, { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(houses);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    deleteHouse({ dispatch, commit }, houseId) {
        commit('updateRequest');
        //console.log('account module');
        return userService.deleteHouse(houseId)
            .then(
                houses => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', 'Delete house successful.', { root: true });
                    dispatch('houses/getAll', null, { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(houses);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    setPrimary({ dispatch, commit }, houseId){
        commit('updateRequest');
        //console.log('account module');
        const userId = state.user._id;
        return userService.setPrimary(userId, houseId)
            .then(
                houses => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', 'Set Primary Successful.', { root: true });
                    dispatch('houses/getAll', null, { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(houses);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    initMatch({ dispatch, commit }, {id, BName, BPin}) {
        commit('updateRequest');
        //console.log('account module');
        console.log('payload in account module: '+id+BName+BPin);
        return userService.initMatch(id, BName, BPin)
            .then(
                me => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', `Request to ${BName} sent.`, 
                        { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(me);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    terminateExistingMatch({ dispatch, commit }, {id}) {
        commit('updateRequest');
        console.log('id in account module: '+id);
        return userService.terminateExistingMatch(id)
            .then(
                me => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', `Terminate my existing match succcessful.`, 
                        { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(me);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    acceptRequest({ dispatch, commit }) {
        const id = state.user._id;
        return userService.acceptRequest(id)
            .then(
                me => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', `Accept request succcessful.`, 
                        { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(me);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    
    socket_joinRoom({dispatch, commit}, room){
        this._vm.$socket.client.emit("room", {room})
    },

    declineRequest({ dispatch, commit }) {
        const id = state.user._id;
        return userService.declineRequest(id)
            .then(
                me => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', `Decline request succcessful.`, 
                        { root: true });
                    return new Promise(function(resolve, reject) {
                        resolve(me);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );

    }
};

const mutations = {
    loginRequest(state, user) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.loggingIn = true;
        state.user = user;
    },
    loginSuccess(state, user) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.loggedIn = true;
        state.user = user;
    },
    loginFailure(state) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.user = null;
    },
    logout(state) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.user = null;
    },
    registerRequest(state, user) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.registering = true;
    },
    registerSuccess(state, user) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
    },
    registerFailure(state, error) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
    },
    setDirty(state){
        console.log('set dirty in account.module')
        state.status.dirty = true;
    },
    setClean(state){
        state.status.dirty = false;
    },
    updateRequest(state){
        //Object.keys(state.status).forEach(v => state.status[v] = false);
        //state.status.loggedIn = true;
        state.status.updating = true;
    },
    updateSuccess(state, user) {
        //Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.updating = false;
        //state.status.loggedIn = true;
        state.user = JSON.parse(localStorage.getItem('user'));
    },
    updateFailure(state, error) {
        //Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.updating = false;
        //state.status.loggedIn = true;
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};