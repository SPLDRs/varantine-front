<template>

    <v-layout wrap>
      <v-flex   sm3>
        <div v-if="loading" class="loading">
        Loading...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>
        <user-bio v-if="user" :fullName="user.fullName" :avatar="user.avatar" :bio="user.bio"></user-bio>
      </v-flex>
      <v-flex  sm9>  
            <v-layout wrap class='collection-list'>
                <collection-preview v-for="collection in user.collections" :key="collection"
                :name='collection' :username='user.username'>
                </collection-preview>
            </v-layout>    
      </v-flex>
    </v-layout>    
</template>

<script>
import UserBio from '../components/UserBio.vue'
import CollectionPreview from '../components/CollectionPreview.vue'
import { mapState, mapActions } from 'vuex'
import { userService } from '../services/user.service'

export default {
    components:{
        UserBio,
        CollectionPreview
    },

    data () {
    return {
      loading: false,
      user: null,
      error: null
    }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            this.error = this.user = null
            this.loading = true
            // replace `getPost` with your data fetching util / API wrapper
            userService.getByName(this.$route.params.username).then((user) => {
                this.loading = false
                this.user = user
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        }
    }
}
</script>

