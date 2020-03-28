<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Folds</span>
        <span class="font-weight-light">Portfolio</span>
      </v-toolbar-title>
      <v-toolbar-items>
      <v-btn text to="/home">
        <v-icon class="mr-2">home</v-icon>
      </v-btn>
      <v-btn text to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn text to="/register">
        <span class="mr-2">Register</span>
      </v-btn>
      <v-btn text to="/edit">
        <v-icon class="mr-2">edit</v-icon>
      </v-btn>
    </v-toolbar-items>
    </v-app-bar>
    <v-snackbar
      v-model="alert.exists"
      :color="alert.type"
      :timeout="5000"
      top
    >
      {{ alert.message }}
      <v-btn
        dark
        text
        @click="clearAlert"
      >
        Close
      </v-btn>
    </v-snackbar>
    <div :class="`alert ${alert.type}`">{{alert.message}}</div>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

<style scoped>
.alert{
  position: fixed;
  top: 50px;  
}
</style>
