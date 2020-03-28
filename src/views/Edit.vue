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
            <v-btn to="/login">Logout</v-btn>
        </p>
        <h3>Users from secure api end point:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="error">ERROR: {{users.error}}</span>
        <v-list three-line v-if="users.items">
          <template v-for="user in users.items">      
            <v-list-item :key="user.id" :to="'/u/'+user.username">
              <v-list-item-avatar>
                <img :src="user.avatar">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="user.fullName"></v-list-item-title>
                <v-list-item-subtitle v-html="user.bio"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <v-flex sm9 class="pa-2">
        <h2>collections:</h2>
        <v-layout wrap >
            <collection-edit v-for="collection in account.user.collections" :key="collection"
            :name='collection' :username='account.user.username' v-bind:deleteFunction="deleteCollection">
            </collection-edit>
        </v-layout> 
        <collection-creator></collection-creator> 
        <v-layout row wrap>
            <v-flex md6 class="pa-2">
                <h2>Image Bundles:</h2>
                <v-list two-line>
                    <draggable :list="account.user.imageBundles" group="imageBundles"
                    @change='setDirty'>
                        <bundle-edit v-for="bundle in account.user.imageBundles" :key="bundle.id"
                        :bid='bundle.id' :type="'image'" v-bind:deleteFunction="deleteBundle">
                        </bundle-edit>
                    </draggable>
                </v-list> 
                <image-bundle-creator></image-bundle-creator>
            </v-flex>
            <v-flex md6 class="pa-2">
                <h2>Text Bundles:</h2>
                <v-list two-line>
                    <draggable :list="account.user.textBundles" group="textBundles"
                    @change='setDirty'>
                        <bundle-edit v-for="bundle in account.user.textBundles" :key="bundle.id"
                        :bid='bundle.id' :type="'text'" v-bind:deleteFunction="deleteBundle">
                        </bundle-edit>
                    </draggable>
                </v-list> 
                <text-bundle-creator></text-bundle-creator> 
            </v-flex>
        </v-layout>    
        <v-fab-transition>
            <v-btn v-show="dirty" color="success"
            fab dark fixed bottom right
            @click="updateUser">
            <v-icon>save</v-icon>
            </v-btn>
        </v-fab-transition>

        <v-layout wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="n in 10" :key="n">
            <v-card color="brown" dark tile flat>
              <v-card-text>brown</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout wrap>
        <v-flex   xs12>
            <v-layout column>
            <v-flex  >
                <v-card color="blue-grey" dark tile flat>
                <v-card-text>blue-grey</v-card-text>
                </v-card>
            </v-flex>
            <v-flex  >
                <v-card color="brown" dark tile flat>
                <v-card-text>brown</v-card-text>
                </v-card>
            </v-flex>
            </v-layout>
        </v-flex>
        <v-flex   xs12 sm7>
            <v-layout wrap>
            <v-flex  >
                <v-card color="indigo lighten-2" dark tile flat>
                <v-card-text>indigo lighten-2</v-card-text>
                </v-card>
            </v-flex>
            <v-flex >
                <v-layout>
                <v-flex v-for="n in 2" :key="n"  >
                    <v-card color="amber lighten-2" tile flat>
                        <v-card-text>amber lighten-2</v-card-text>
                    </v-card>
                </v-flex>
                </v-layout>
             </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm2 chil >
        <v-card color="orange lighten-2" tile flat>
          <v-card-text>orange lighten-2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card color="red lighten-2" dark tile flat>
          <v-card-text>red lighten-2</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container class="grey lighten-5">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="pa-2" outlined tile>
            .col-12 .col-md-8
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row>
        <v-col v-for="n in 3" :key="n"
          cols="6" md="4">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns are always 50% wide, on mobile and desktop -->
      <v-row>
        <v-col
          v-for="n in 2"
          :key="n"
          cols="6"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="example">
      <div v-masonry>
        <div v-masonry-tile v-for="n in 20" :key="n" style="width:50px">
          <p v-for="i in (20-n)" :key="i">{{n}}</p>
        </div>
      </div>
    </div>

    </v-flex>
  </v-layout>
</template>

<script>
import ImageUpload from '../components/ImageUpload.vue'
import UserBio from '../components/UserBio.vue'
import CollectionCreator from '../components/CollectionCreator.vue'
import CollectionEdit from '../components/CollectionEdit.vue'
import ImageBundleCreator from '../components/ImageBundleCreator.vue'
import TextBundleCreator from '../components/TextBundleCreator.vue'
import BundleEdit from '../components/BundleEdit.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import * as axios from 'axios';
import { authHeader } from '../helpers/index'
import { userService } from '../services/user.service';
import { collectionService } from '../services/collection.service';
import draggable from "vuedraggable";
import {Waterfall, WaterfallItem} from 'vue2-waterfall';

export default {
    components:{
        ImageUpload,
        UserBio,
        CollectionCreator,
        CollectionEdit,
        ImageBundleCreator,
        TextBundleCreator,
        BundleEdit,
        draggable,
        Waterfall,
        WaterfallItem
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            dirty: state => state.account.status.dirty
            //collections: state => state.collections.all,
        }),
        
    },
    created () {
        this.getAllUsers();
       
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            //deleteUser: 'delete'
        }),
        ...mapActions('account', {
            uploadAvatar: 'updateAvatar',
            deleteCollection: 'deleteCollection',
            deleteBundle: 'deleteBundle',
            updateUser: 'update'
        }),
        ...mapMutations('account', {setDirty: 'setDirty'}),
    }
};
</script>