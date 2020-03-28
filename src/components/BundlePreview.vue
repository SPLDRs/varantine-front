<template>
<v-flex xs12 sm6 md4 lg3 class="pa-2">
  <v-card 
    :to="computedPath"
    class="d-flex flex-column" height="270px"
  >
    <v-img
        v-if="bundle && bundle.image"
        class="white--text flex-shrink-1 flex-grow-0"
        :src="$hostname+bundle.image"
        @load="imageLoaded"
      >
        <v-card-title class="align-end fill-height">{{bundle.title}}</v-card-title>
    </v-img>
    <v-card-title v-if="bundle && !bundle.image" class="flex-shrink-1 flex-grow-0">
          {{bundle.title}}
    </v-card-title>
    <v-card-text class= "flex-grow-1 flex-shrink-0" v-if="!bundle" v-html="bid"></v-card-text>
    <v-card-text class= "flex-grow-1 flex-shrink-0" 
    v-if="bundle" v-html="bundle.createdDate.substr(0,10)"></v-card-text>
    <v-card-text class= "loading flex-grow-1 flex-shrink-0" v-if="loading">Loading...</v-card-text>
    <v-card-text class= "error flex-grow-1 flex-shrink-0" v-if="error">{{error}}</v-card-text>
  </v-card>
</v-flex>
</template>

<script>
import {bundleService} from '../services/bundle.service';
import * as axios from 'axios';
import {apiUrl} from '../helpers/api-config'


export default {
    name: 'BundlePreview',
    props: {
        bid: String,
        type: String,
        //updateFunction: Function,
        //deleteFunction: Function
    },
    data () {
        return {
            bundle: null,
            loading: false,
            error: null
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData()
    },
    computed: {
        computedPath: function(){
            let type = '';
            if(this.bundle && this.bundle.image){
                type='image';
            }else if(this.bundle && this.bundle.markdown){
                type='text';
            }
            if(this.bundle)
                return `/u/${this.$route.params.username}/${this.$route.params.collectionName}/${type}/${this.bundle.id}`
            return '';

        }

    },
    watch: {
        // call again the method if the route changes
        //'$route': 'fetchData',
        //bundle: function(){
            //console.log('redraw from bundle preview');
            //this.$redrawVueMasonry();
        //},
    },
    updated: function () {
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been re-rendered
            console.log('redraw from bundle preview updated next tick');
            this.$redrawVueMasonry();
        })
    },
    methods: {
        fetchData () {
            this.error = this.collection = null
            this.loading = true
            // replace `getPost` with your data fetching util / API wrapper
            bundleService.getByTypeAndId(this.type, this.bid).then((bundle) => {
                this.loading = false;
                this.bundle = bundle;
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        },
        imageLoaded(){
            console.log('redraw from bundle preview image loaded');
            this.$redrawVueMasonry();
        }
    }
}
</script>


