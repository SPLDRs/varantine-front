<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
<p v-if="loading" class="loading">
    Loading...
</p>

<p v-if="error" class="error">
    {{ error }}
</p>

<v-img v-if=house :src='$hostname+house.housePlan'>
    <v-btn v-if="deleteFunction" text color="warning" 
            @click="deleteFunction(house._id)">Delete</v-btn>
    <v-btn text v-if="primaryFunction" color="blue" 
            @click="primaryFunction(house._id)">Set as Primary</v-btn>
    {{name}}
</v-img>


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
    props: {
        name: String,
        username: String,
        primaryFunction: Function,
        deleteFunction: Function
    },
    data () {
        return {
            house: null,
        }
    },
    computed: {
        ...mapState('account', ['status', 'user']),
    },
    created () {
        // reset login status
        this.fetchData();
    },
    methods: {
        ...mapActions('account', ['acceptRequest', 'declineRequest', 'terminateExistingMatch']),
        handleSubmit (e) {
            if (this.$refs.form.validate()) {
                //this.snackbar = true;
                this.searching = true;
                const { username, pin } = this;
                if (username && pin) {
                    this.initMatch({id:this.user._id, BName:username, BPin: pin })
                }
            }   
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
            houseService.getByUserAndName(this.user.username, this.name).then((house) => {
                this.loading = false;
                this.house = house;
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        }
    }
};
</script>

<style scoped>
.bottom-gradient{
    background: linear-gradient(rgba(0,0,0,0) 60%, rgba(10, 10, 10, 1));
}
</style>