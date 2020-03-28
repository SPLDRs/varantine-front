<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
<!--<div v-masonry-tile >style="width: 300px"-->
    <v-card  text  class="d-flex flex-column" height="320px">
        <v-card-title v-if="!collection" primary-title>{{name}}</v-card-title>
        <div v-if="loading" class="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <v-img v-if="collection" class="white--text flex-shrink-1 flex-grow-0" 
        :src="$hostname+collection.bg">
            <div class="fill-height bottom-gradient">
                <v-container fill-height fluid>
                    <v-layout fill-height align-end justify-end>
                        <v-flex xs12 flexbox class="grey--text text--lighten-5">
                            <div class="headline ">{{name}}</div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-img>
        <v-card-text v-if="collection" class= "flex-grow-1 flex-shrink-0">
            {{collection.intro}}
        </v-card-text>
        <v-card-actions v-if="collection" class="flex-grow-0 flex-shrink-0">
            <v-btn text :to="'/editCollection/'+name">Edit</v-btn>
            <v-btn v-if="deleteFunction" text color="warning" 
            @click="deleteFunction(collection.id)">Delete</v-btn>
        </v-card-actions>
        <!-- <v-list two-line v-if="collection">
            <bundle-preview v-for="bundle in collection.bundles" :key="bundle.id"
            :bid='bundle.id' :type="bundle.type">
            </bundle-preview>
        </v-list> -->
    </v-card>
</v-flex>
</template>

<script>
import {collectionService} from '../services/collection.service';
import * as axios from 'axios';
import {apiUrl} from '../helpers/api-config'
import BundlePreview from '../components/BundlePreview.vue'


export default {
    name: 'CollectionEdit',
    components: {
        BundlePreview
    },
    props: {
        name: String,
        username: String,
        updateFunction: Function,
        deleteFunction: Function
    },
    data () {
        return {
            collection: null,
            loading: false,
            error: null
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
        this.$redrawVueMasonry();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData',
        collection: function(){
            this.$redrawVueMasonry();
        },
    },
    methods: {
        fetchData () {
            this.error = this.collection = null
            this.loading = true
            // replace `getPost` with your data fetching util / API wrapper
            collectionService.getByUserAndName(this.username, this.name).then((collection) => {
                this.loading = false;
                this.collection = collection;
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