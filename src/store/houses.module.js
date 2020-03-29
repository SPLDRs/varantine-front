import { houseService, userService } from '../services/index';

const state = {
    status:{ 
        loading: false,
        updating:false,
        dirty: false},
    all: []
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');
        userService.getAllHouseNames().then(nameList=> {
            for (let name of nameList){
                //console.log(userService.getUsername(), name)
                houseService.getByUserAndName(userService.getUsername(), name)
                .then(
                    house => commit('addToHouses', house),
                    error => commit('addFailure', error)
                );
            }
        }).then(()=>{
            commit('getAllFinished');
        })
    },
    update({ dispatch, commit }, house){
        commit('updateRequest');
        return houseService.update(house)
        .then(
            house => {
                commit('updateSuccess');
                //dispatch('account/update')
                //router.push('/login');
                commit('setClean');
                dispatch('alert/success', 'Update house successful.', { root: true });
                return new Promise(function(resolve, reject) {
                    resolve(house);
                });
            },
            error => {
                commit('updateFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    updateBg({ dispatch, commit }, {id, prevPath, formData}) {
        commit('updateRequest');
        //console.log('house module');
        return houseService.updateBg(id, prevPath, formData)
            .then(
                imagePath => {
                    commit('updateSuccess');
                    //router.push('/login');
                    dispatch('alert/success', 'Update Background Image successful.', { root: true });

                    commit('updateHouseBg', {id, imagePath:imagePath.path});
                    //commit('setDirty');
                    return new Promise(function(resolve, reject) {
                        resolve(imagePath);
                    });
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
};

const mutations = {
    getAllRequest(state) {
        Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.loading = true;
        state.all=[];
    },
    getAllFinished(state) {
        state.status.loading = false;
    },
    addToHouses(state, house) {
        state.all.push(house);
    },
    addFailure(state, error) {
        state.status.error = error;
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
        //state.user = JSON.parse(localStorage.getItem('user'));
    },
    updateFailure(state, error) {
        //Object.keys(state.status).forEach(v => state.status[v] = false);
        state.status.updating = false;
        //state.status.loggedIn = true;
    },
    setDirty(state){
        console.log("house dirty");
        state.status.dirty = true;
    },
    setClean(state){
        console.log("house clean");
        state.status.dirty = false;
    },
    updateHouseBg(state, info){
        for (let house of state.all){
            if(house._id===info.id){
                house.bg = info.imagePath;
                break;
            }
        }
    }
};

export const houses = {
    namespaced: true,
    state,
    actions,
    mutations
};
