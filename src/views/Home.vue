<template>
  <div class="home">
    <v-btn to="/generatePin">Generate Pin</v-btn>
    <v-btn to="/initMatch">Init Match</v-btn>
    <v-btn to="/viewRequest">View Request</v-btn>
    <h2 ml-4 :v-if=this.user.pin>Current pin: {{user.pin}}</h2>
    <my-house/>
    <user-bio :username='this.user.partnerName' :pin='this.user.partnerPin'/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHouse from '@/components/MyHouse.vue';
//import PartnerHouse from '@/components/PartnerHouse.vue';
import UserBio from '@/components/UserBio.vue';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    MyHouse,
    //PartnerHouse,
    UserBio
  },
  computed: {
        ...mapState('account', ['status', 'user']),
    },
}
</script>
