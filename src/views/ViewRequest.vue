<template>
<div>
    <h2 v-if=!validRequest>No Requests to Display</h2>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    v-if = validRequest 
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">REQUEST</div>
        <v-list-item-title class="headline mb-1">{{requestUsername}}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text @click="acceptRequest">Accept</v-btn>
      <v-btn text @click="declineRequest">Decline</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            pin: '',
            submitted: false,
            usernameRules: [v => !!v || 'Username is required.'],
            pinRules: [v => !!v || 'Pin is required.']
        }
    },
    computed: {
        ...mapState('account', ['status', 'user']),
        requestUsername: function(){
            const user = this.$store.state.account.user;
            const request = JSON.parse(user.activeRequest);
            if (request){
                return request.from;
            }
            return null;
        },
        requestPin: function(){
            const user = this.$store.state.account.user;
            const request = JSON.parse(user.activeRequest);
            if (request){
                return request.withPin;
            }
            return null;
        },
        validRequest: function(){
            const user = this.$store.state.account.user;
            const request = JSON.parse(user.activeRequest);
            console.log(this.user.pin);
            return request && request.withPin == this.user.pin;
        }

    },
    created () {
        // reset login status
        this.terminateExistingMatch({id:this.user._id});
    },
    methods: {
        ...mapActions('account', ['acceptRequest', 'declineRequest', 'terminateExistingMatch']),
        handleSubmit (e) {
            if (this.$refs.form.validate()) {
                //this.snackbar = true;
                this.searching = true;
                const { username, pin } = this;
                if (username && pin) {
                    this.initMatch({id:this.user._id, BName:username, BPin: pin })
                }
            }   
        },
        //acceptRequest(){

        //},
        //declineRequest(){

        //}
    },
    directives: {
        focus: {
            // directive definition
            inserted: function (el) {
                //console.log("inserted directive");
                el.focus()
            }
        }
    }
};
</script>

