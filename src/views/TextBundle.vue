<template>
    <div>
        <div v-if="loading" class="loading">
        Loading...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>
        
        <h1> {{ $route.params.bundleId }}</h1>
        
        <div v-if='bundle'>
            <v-card
                class="mx-auto"
                outlined
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline">{{computedDate}}</div>
                    <v-list-item-title class="headline mb-1" style="white-space: initial">
                        {{bundle.title}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto pa-3"
                outlined
            >
            <markdown-display/>  
            </v-card>       
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BundleEdit from '../components/BundleEdit.vue'
import draggable from "vuedraggable";
//import ImageUpload from '../components/ImageUpload.vue'
import MarkdownDisplay from '../components/MarkdownDisplay.vue'

export default {
    components:{
        //CollectionHeader,
        MarkdownDisplay
    },
    data () {
        return {
        loading: false,
        //collection: null,
        error: null,
        //dirty: false,
        //modal: false,
        //titleRules: [v => !!v || 'Title is required.'],
        }
    },
    computed: {
        ...mapState('bundles', ['status', 'bundle']),
        computedDate: {
            get(){
                return this.bundle.createdDate.substring(0, 10);
            },
            set(value){
                this.bundle.createdDate=value+this.bundle.createdDate.substring(10);
            }
            
        }
        
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        //this.fetchData();
        this.getCurrentBundle({type:'text', id:this.$route.params.bundleId});
    },
    watch: {
        // call again the method if the route changes
        //??? params??
        '$route': function(){
            this.getCurrentBundle({type:'image', id:this.$route.params.bundleId});
        }
    },
    methods: {
        ...mapActions('bundles', {
            getCurrentBundle: 'getByTypeAndId'
            }),
        ...mapMutations('bundles', ['setDirty']),
    }
}
</script>