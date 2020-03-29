<template>
<v-card
    :v-if='this.user'
    class="mx-auto"
    max-width="400"
    outlined
  >
    <v-card-title>
      <!--<span class="title font-weight-light">Title</span>-->
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      "{{this.user.username}}" </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="this.user.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{this.user.fullName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { userService } from '../services/user.service';

export default {
    name: 'UserBio',
    props: {
        username: String,
        pin: String,
    },
    data () {
        return {
            user: null,
            submitted: false,
            house: null,
        }
    },
    created () {
        // reset login status
        this.fetchData();
    },
    methods:{
      fetchData(){
            console.log(this.username)
            this.error = this.user = null
            this.loading = true
            if(!(this.username && this.pin)){
              this.loading = false;
              return
            }
            userService.getByNameAndPin(this.username, this.pin).then((user) => {
                this.loading = false;
                this.user = user;
            }).catch(err=>{
                this.error=err;
                this.loading = false;
                console.log(err);
            })
        }
    }

}
</script>

