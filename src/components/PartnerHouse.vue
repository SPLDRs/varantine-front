<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
<p v-if="loading" class="loading">
    Loading...
</p>

<p v-if="error" class="error">
    {{ error }}
</p>

<v-img v-if=house :src='$hostname+house.housePlan' ref="houseSVG">
    <div class="marker" style = "position:absolute;" 
    v-bind:style="{top: myLocationCoord.y+'px', left: myLocationCoord.x+'px'}">
        <v-icon>stars</v-icon>
    </div>
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
    name: 'HouseEdit',
    components: {
        //BundlePreview
    },
    props: {
        //name: String,
        //username: String,
        location: String,
        //updateFunction: Function,
        //deleteFunction: Function
    },
    data () {
        return {
            //username: '',
            //pin: '',
            submitted: false,
            house: null,
            myLocationCoord: {x: 0, y:0},
            //plan: null,
        }
    },
    watch:{
        location: function(val){
            console.log("Changed selection");
            console.log(this.plan);
            const {name, width, height, resolution, ...rooms} = this.plan;
            let coords = rooms[this.location].split(", ");
            console.log(this.plan);
            this.myLocationCoord.x = 
                Number(coords[0])*this.$refs.houseSVG.$el.offsetWidth/this.plan.width-6;
            this.myLocationCoord.y = 
                Number(coords[1])*this.$refs.houseSVG.$el.offsetHeight/this.plan.height-6;
            console.log(Number(coords[0]));
            //console.log(this.$refs.houseSVG);
            console.log(this.$refs.houseSVG.$el.offsetWidth);
            console.log(this.plan.width);
            console.log(this.myLocationCoord.x);
        }
    },
    computed: {
        ...mapState('account', ['status', 'user']),
        ...mapState('houses', ['allPlans']),
        plan: function(){
            return this.allPlans.find(o => o.name === this.house.housePlanName);
        },
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
            let username = this.user.username;
            let BName = this.user.partnerName; 
            let roomname = username>BName? username+"-"+BName: BName+"-"+username;

            this.$socket.client.emit("room", roomname); 
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