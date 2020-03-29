<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
<p v-if="loading" class="loading">
    Loading...
</p>

<p v-if="error" class="error">
    {{ error }}
</p>

<v-img v-if=house :src='$hostname+house.housePlan'>{{house.name}}</v-img>
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
    name: 'HouseEdit',
    components: {
        //BundlePreview
    },
    props: {
        name: String,
        username: String,
        updateFunction: Function,
        deleteFunction: Function
    },
    data () {
        return {
            house: null,
            loading: false,
            error: null
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
        fetchData () {
            this.error = this.house = null
            this.loading = true
            userService.update({_id: this.user._id})
            const houses = this.user.houses
            if(!(this.user.partnerPin&&this.user.partnerName)){
                this.error = 'You don\'t have any partner yet.';
                this.loading = false;
                return
            }
            userService.getPrimary(this.user.partnerName).then((houseName) => {
                houseService.getByUserAndName(this.user.partnerName, houseName).then((house) => {
                    this.loading = false;
                    this.house = house;
                }).catch(err=>{
                    this.error=err;
                    this.loading = false;
                    console.log(err);
                })
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.bottom-gradient{
    background: linear-gradient(rgba(0,0,0,0) 60%, rgba(10, 10, 10, 1));
}
</style>