<template>
<div style="position:relative;">
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

<p v-if=house > @{{house.name}} </p>
<p>{{partnerLocation}}</p>
<v-select
    v-model="myLocation"
    :items="availRooms"
    label="My Location"
    @change="updateMyLocationCoord"
></v-select>
<v-btn @click="pingServer">Ping</v-btn>

</v-flex>
<partner-house :location='partnerLocation' ref='partnerHouseView' 
:parentOffset='parentOffset'
 :parentPoint='myLocationCoord'
 :shouldOverLap='shouldOverLap'/>
</div>
</template>

<script>
import {houseService} from '../services/house.service';
import {userService} from '../services/user.service';
//import * as axios from 'axios';
//import {apiUrl} from '../helpers/api-config'
//import BundlePreview from '../components/BundlePreview.vue'
import { mapState, mapActions } from 'vuex'
import PartnerHouse from '@/components/PartnerHouse.vue';

export default {
    components:{
        PartnerHouse
    },
    data () {
        return {
            username: '',
            pin: '',
            submitted: false,
            house: null,
            myLocation: null,
            partnerLocation: null,
            myLocationCoord: {x: 0, y:0},
            shouldOverLap: false
        }
    },
    computed: {
        ...mapState('account', ['status', 'user']),
        ...mapState('houses', ['allPlans']),
        plan: function(){
            return this.allPlans.find(o => o.name === this.house.housePlanName);
        },
        availRooms: function(){
            if(!this.house) return [];
            console.log(this.allPlans);
            const {name, width, height, resolution, ...rooms} = this.plan;
            var roomsArray = Object.keys(rooms).map(function (key) { 
                // Using Number() to convert key to number type 
                // Using obj[key] to retrieve key value 
                return {room: key, coordinate: rooms[key]}; 
            }); 
            return roomsArray.reduce((filtered, x) => {
                if (x.coordinate) {
                    //var someNewValue = x.name;
                    filtered.push(`${x.room}`);
                }
                return filtered;
            }, []);
        },
        parentOffset: function(){
            if(!this.$refs.houseSVG) return null;
            return {
                width: this.$refs.houseSVG.$el.offsetWidth,
                height: this.$refs.houseSVG.$el.offsetHeight,
                top: this.$refs.houseSVG.$el.offsetTop,
                left:this.$refs.houseSVG.$el.offsetLeft,
        }
        },

    },
    created () {
        // reset login status
        this.fetchData();
        this.getAllPlans();
    },
    mounted() {
    },
    methods: {
        ...mapActions('houses', ['getAllPlans']),
        //...mapActions('account', []),
        pingServer(){
            console.log("ping in pingServer");
            let username = this.user.username;
            let BName = this.user.partnerName; 
            let roomname = username>BName? username+"-"+BName: BName+"-"+username;
            this.$socket.client.emit("pinLocation", {location:this.myLocation, room: roomname}); 
        },
        updateMyLocationCoord(){
            if(this.partnerLocation==this.myLocation){
                console.log("shouldOverLap(");
              this.shouldOverLap=true;
            }else{
                this.shouldOverLap=false;
            }
            console.log("Changed selection");
            const {name, width, height, resolution, ...rooms} = this.plan;
            let coords = rooms[this.myLocation].split(", ");
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
                console.log(house);
                this.house = house;
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        },
        /*computedStyle(){
            console.log("computedStyle")
            if(this.$refs.houseSVG){
                let realX = this.myLocationCoord.x/this.$refs.houseSVG.clientWidth*this.plan.ref.width;
                let realY = this.myLocationCoord.y/this.$refs.houseSVG.clientHeight*this.plan.ref.height;
                return `{ position:absolute, left: ${realX}, top: ${realY} }`
            }
            return "";
        }*/

    },
    sockets: {
        connect(){
          console.log('connected');
        },
        partnerLocation(data) {
          this.partnerLocation = data.location;
          console.log("partnerLocation in MyHouse");
          if(this.partnerLocation==this.myLocation){
                console.log("shouldOverLap(");
              this.shouldOverLap=true;
            }else{
                this.shouldOverLap=false;
            }
        }
    },
};

</script>

<style scoped>
.bottom-gradient{
    background: linear-gradient(rgba(0,0,0,0) 60%, rgba(10, 10, 10, 1));
}
</style>