<template>
    <v-layout wrap>
      <v-flex   sm3 class="pa-2">
        <h1>Hi {{account.user.fullName}}!</h1>
        <v-row align="center" justify="center">
          <v-img
            :src="account.user.avatar"
            aspect-ratio="1"
            max-width="100"
            max-height="100"
          ></v-img>
        </v-row>
        <image-upload form-title="Upload Avatar" upload-field-name = "avatar" 
        v-bind:upload-function="uploadAvatar" :id="account.user._id"></image-upload>
        <v-form ref="form" lazy-validation>
                <v-textarea
                label="Bio"
                auto-grow
                v-model="account.user.bio" @change="setDirty"
                ></v-textarea>
        </v-form>
        <p>
            <v-btn to="/login">Log out</v-btn>
        </p>
      </v-flex>

      
      <v-flex sm9 class="pa-2">
        <h2>Houses:</h2>
        <v-layout wrap >
            <my-house-list-item v-for="house in account.user.houses" :key="house"
            :name='house' :username='account.user.username' v-bind:deleteFunction="deleteHouse"
            v-bind:primaryFunction="setPrimary">
            </my-house-list-item>
        </v-layout> 
        <house-creator></house-creator>   
        <v-fab-transition>
            <v-btn v-show="dirty" color="success"
            fab dark fixed bottom right
            @click="updateUser">
            <v-icon>save</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import ImageUpload from '../components/ImageUpload.vue'
import HouseCreator from '../components/HouseCreator.vue'
import MyHouseListItem from '../components/MyHouseListItem.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import * as axios from 'axios';
import { authHeader } from '../helpers/index'
import { userService } from '../services/user.service';
import { houseService } from '../services/house.service';

export default {
    components:{
        ImageUpload,
        HouseCreator,
        MyHouseListItem
    },
    computed: {
        ...mapState({
            account: state => state.account,
            //users: state => state.users.all,
            dirty: state => state.account.status.dirty
            //houses: state => state.houses.all,
        }),
        
    },
    created () {
       
    },
    methods: {
        ...mapActions('account', {
            uploadAvatar: 'updateAvatar',
            deleteHouse: 'deleteHouse',
            //deleteBundle: 'deleteBundle',
            updateUser: 'update',
            setPrimary: 'setPrimary'
        }),
        ...mapMutations('account', {setDirty: 'setDirty'}),
    }
};
</script>