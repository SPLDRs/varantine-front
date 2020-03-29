<template>
    <div>
        <h3> create house {{house.name}} - {{house.housePlanName}}</h3>
        <v-form ref="form" lazy-validation>
            <v-text-field v-model="house.name"
            label="House Name"
            :rules="nameRules"
            required></v-text-field>
            <v-radio-group v-model="house.housePlanName" column>
            <v-radio 
                v-for="house in this.allPlans" 
                :key="house.name" :label="house.name" :value="house.name"></v-radio>
            </v-radio-group>
            <v-btn :disabled="status.updating" @click="handleSubmit">Add</v-btn>
            <img v-show="status.updating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            
        </v-form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            house: {
                name: '',
                housePlanName: "default",
            },
            submitted: false,
            nameRules: [v => !!v || 'House name is required.'],
        }
    },
    created(){
        this.fetchData();
    },
    computed: {
        ...mapState('account', ['status','user']),
        ...mapState('houses', ['status','allPlans'])
    },
    methods: {
        ...mapActions('account', ['addHouse']),
        ...mapActions('houses', {fetchData: 'getAllPlans'}),
        handleSubmit(e) {
            if(this.$refs.form.validate()){
                this.submitted = true;
                console.log(this.house);
                this.addHouse({id:this.user._id, house:
                {...this.house, housePlan: "/"+this.house.housePlanName+".svg"}});
                this.$refs.form.reset()
            }
        }
    }
}
</script>
