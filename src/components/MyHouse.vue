<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
<p v-if="loading" class="loading">
    Loading...
</p>

<p v-if="error" class="error">
    {{ error }}
</p>

<v-img v-if=house :src='$hostname+house.housePlan'>{{house.name}}</v-img>

<p>{{location}}</p>
<v-text-field v-model="targetId"
    label="Target ID"
    required>
</v-text-field>
<v-btn @click="pingServer">Ping</v-btn>
</v-flex>
</template>

<script>
import {houseService} from '../services/house.service';
import {userService} from '../services/user.service';
//import * as axios from 'axios';
//import {apiUrl} from '../helpers/api-config'
//import BundlePreview from '../components/BundlePreview.vue'
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            pin: '',
            submitted: false,
            house: null,
            polygon: [
            { lat: 6.436914, lng: 3.451432 },
            { lat: 6.436019, lng: 3.450917 },
            { lat: 6.436584, lng: 3.450917 },
            { lat: 6.435006, lng: 3.450928 },
            { lat: 6.434953, lng: 3.451808 },
            { lat: 6.435251, lng: 3.451765 },
            { lat: 6.435262, lng: 3.451969 },
            { lat: 6.435518, lng: 3.451958 }
          ],
          location: '',
          targetId: null
        }
    },
    computed: {
        ...mapState('account', ['status', 'user']),
    },
    created () {
        // reset login status
        this.fetchData();
    },
    mounted() {},
    methods: {
        //...mapActions('account', []),
        pingServer(){
            console.log("ping in pingServer")
            this.$socket.client.emit("stupid", this.targetId); 
            this.$socket.$subscribe('newLocation', payload => {
                console.log("Subscribe to newLocation "+this.$socket.client.id);
                this.location = {...payload, id:this.$socket.client.id};
            });
        },

        fetchData(){
            this.error = this.collection = null
            this.loading = true
            userService.update({_id: this.user._id})
            const houses = this.user.houses
            if(houses.length<=0){
                this.error = 'No house has been built yet.';
                this.loading = false;
                return
            }
            // replace `getPost` with your data fetching util / API wrapper
            houseService.getByUserAndName(this.user.username, houses[0]).then((house) => {
                this.loading = false;
                this.house = house;
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        }

    },
    sockets: {
        connect(){
          console.log('connected');
        },
        newLocation(position) {
          this.location = {...position, id:this.$socket.client.id}
          console.log("newLocation in MyHouse")
        }
    },

};
</script>

<style scoped>
.bottom-gradient{
    background: linear-gradient(rgba(0,0,0,0) 60%, rgba(10, 10, 10, 1));
}
</style>