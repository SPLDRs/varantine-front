//import config from 'config';
import { authHeader } from '../helpers/index';
import * as axios from 'axios';
import {apiUrl} from '../helpers/api-config'
//console.log(authHeader);

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    getByNameAndPin,
    update,
    updateAvatar,
    addHouse,
    deleteHouse,
    setPrimary,
    getPrimary, 
    getAllHouseNames,
    getUsername,
    initMatch,
    terminateExistingMatch,
    acceptRequest,
    declineRequest,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function getByNameAndPin(username, pin) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/pin/${username}/${pin}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user._id}`, requestOptions).then(handleResponse)
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function updateAvatar(id, formData) {
    const url = `${apiUrl}/users/uploadAvatar`;
    var config = {
        headers: authHeader()
    }
    formData.append('id', id);
    //console.log(formData);
    return axios.post(url, formData, config)
        // get data
        .then(x => x.data)
        .then(image => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.avatar = image.base64;
            localStorage.setItem('user', JSON.stringify(user));
            return image;
        })
        // add url field
        //.then(x => x.map(img => Object.assign({},
            //img, { url: `${BASE_URL}/images/${img.id}` })));
}

function getAllHouseNames(){
    const url = `${apiUrl}/users/getHouses`;
    const user = JSON.parse(localStorage.getItem('user'));
    var config = {
        headers: authHeader()
    }
    //console.log(formData);
    return axios.post(url, {id:user._id}, config)
        // get data
        .then(x => x.data)
        .then(allHouses => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.houses = allHouses;
            localStorage.setItem('user', JSON.stringify(user));
            return allHouses;
        })
}

function getUsername(){
    //const url = `${apiUrl}/users/getHouses`;
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
}



function addHouse(id, house){
    const url = `${apiUrl}/users/addHouse`;
    var config = {
        headers: authHeader()
    }
    //console.log(formData);
    return axios.post(url, {id, house:{...house}}, config)
        // get data
        .then(x => x.data)
        .then(allHouses => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.houses = allHouses;
            localStorage.setItem('user', JSON.stringify(user));
            return allHouses;
        })
}

function deleteHouse(houseId){
    //console.log('user.service');
    const url = `${apiUrl}/users/deleteHouse`;
    var config = {
        headers: authHeader()
    }
    //console.log(formData);
    return axios.post(url, {houseId}, config)
        // get data
        .then(x => x.data)
        .then(allHouses => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.houses = allHouses;
            localStorage.setItem('user', JSON.stringify(user));
            return allHouses;
        })
}
function setPrimary(userId, houseId){
    const url = `${apiUrl}/users/setPrimary`;
    const payload = {userId, houseId};
    var config = {
        headers: authHeader()
    }
    //console.log(formData);
    return axios.post(url, payload, config)
        // get data
        .then(x => x.data)
        .then(allHouses => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.houses = allHouses;
            localStorage.setItem('user', JSON.stringify(user));
            return allHouses;
        })
}

function getPrimary(username){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/getPrimary/${username}`, requestOptions).then(handleResponse);
}

function updateHelper(url, payload){
    var config = {
        headers: authHeader()
    }
    //console.log(formData);
    return axios.post(url, payload, config)
        // get data
        .then(x => x.data)
        .then(me => {
            localStorage.setItem('user', JSON.stringify(me));
            return me;
        })
}

function initMatch(id, BName, BPin){
    const url = `${apiUrl}/users/initMatch`;
    const payload = {id, BName, BPin};
    return updateHelper(url, payload);
}

function terminateExistingMatch(id){
    const url = `${apiUrl}/users/terminateExistingMatch`;
    const payload = {id}
    return updateHelper(url, payload);
}

function acceptRequest(id){
    const url = `${apiUrl}/users/acceptRequest`;
    const payload = {id}
    return updateHelper(url, payload);
}

function declineRequest(id){
    const url = `${apiUrl}/users/declineRequest`;
    const payload = {id}
    return updateHelper(url, payload);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function axios401Guard(error){
    console.log("handle response i.e. auto logout");
}

function handleResponse(response) {
    console.log("handle response i.e. auto logout");
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}