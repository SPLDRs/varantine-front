<template>
    <div>
        <h2>Find Your Partner</h2>
        <v-form
        ref="form"
        lazy-validation>
            <v-text-field v-model="username"
            label="Username"
            :rules="usernameRules"
            required></v-text-field>
            <v-text-field v-model="pin" 
            label="Pin"
            type="password"
            :rules='pinRules'
            required></v-text-field>
            <v-btn :disabled="status.searching"
            @click="handleSubmit">Send Request</v-btn>
            <img v-show="status.updating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </v-form>
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
        ...mapState('account', ['status', 'user'])
    },
    created () {
        // reset login status
        this.terminateExistingMatch({id: this.user._id});
    },
    methods: {
        ...mapActions('account', ['initMatch', 'terminateExistingMatch']),
        handleSubmit (e) {
            if (this.$refs.form.validate()) {
                //this.snackbar = true;
                this.searching = true;
                const { username, pin } = this;
                if (username && pin) {
                    this.initMatch({id:this.user._id, BName:username, BPin: pin })
                }
            }
            
        }
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