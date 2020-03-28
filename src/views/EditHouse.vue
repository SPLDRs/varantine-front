<template>
    <div>
        <div v-if="loading" class="loading">
        Loading...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>
        
        <h1> {{ $route.params.houseName }}</h1>
        
        <div v-if='house'>    
            <v-img :src ='$hostname+house.src' max-height="50vh"/>
            <v-form ref="form" lazy-validation>
                <v-input
                label="Name"
                v-model="house.name" @change="setDirty"
                ></v-input>
            </v-form> 
        </div>
    <v-fab-transition>
        <v-btn v-show='status.dirty && !status.updating' color="success"
        fab dark fixed bottom right
        @click="updateHouse(house)">
        <v-icon>save</v-icon>
        </v-btn>
    </v-fab-transition>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { houseService } from '../services/house.service'
//import HouseHeader from '../components/HouseHeader.vue'
import { userService } from '../services/user.service';
//import BundleEdit from '../components/BundleEdit.vue'
//import draggable from "vuedraggable";
//import ImageUpload from '../components/ImageUpload.vue'

export default {
    components:{
        //HouseHeader,
        //BundleEdit,
        //draggable,
        //ImageUpload
    },
    data () {
        return {
        loading: false,
        //house: null,
        error: null,
        //dirty: false,
        //fab: false,
        }
    },
    computed: {
        ...mapState('houses', ['status']),
        house: function () {
            const all = this.$store.state.houses.all;
            for (let c of all){
                if(c.name === this.$route.params.houseName)
                return c;
            }
            return null;
        },
        imageBundles: function() {
            const user = this.$store.state.account.user;
            return user.imageBundles.reduce((filtered, x) => {
                //console.log(x.name);
                let shouldAdd = true;
                for (let bundle of this.house.bundles){
                    if(bundle.type =="image" && bundle.id == x.id) shouldAdd = false;
                }
                if (shouldAdd) {
                    //var someNewValue = x.name;
                    filtered.push(`${x.title} | ${x.id}`);
                }
                return filtered;
            }, []);
        },
        textBundles: function() {
            const user = this.$store.state.account.user;
            return user.textBundles.reduce((filtered, x) => {
                //console.log(x.name);
                let shouldAdd = true;
                for (let bundle of this.house.bundles){
                    if(bundle.type =="text" && bundle.id == x.id) shouldAdd = false;
                }
                if (shouldAdd) {
                    //var someNewValue = x.name;
                    filtered.push(`${x.title} | ${x.id}`);
                }
                return filtered;
            }, []);
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        //this.fetchData();
        this.getAllHouses();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'getAllHouses'
    },
    methods: {
        ...mapActions('houses', {
            getAllHouses: 'getAll',
            updateHouse: 'update',
            uploadHouseBg: 'updateBg'}),
        ...mapMutations('houses', ['setDirty']),
        addBundle(type, e){
            const id = e.slice(-24);
            console.log("add " + type +" | "+ id);
            this.setDirty();
            this.house.bundles.push({id, type});
        },
        deleteBundle(type, id){
            console.log("delete "+ type +" | "+ id);
            this.setDirty();
            this.house.bundles = this.house.bundles.filter(x => !(x.type===type && x.id===id));
        }
    }
}
</script>