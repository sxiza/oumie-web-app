<script>
import qs from 'qs'

export default {
	data() {
        return {
            valid: true,
            mobile: '',
            showPass: false,
            password: '',
        }
	},
	
	computed: {
		env() {
			return this.$store.state.inspire.poefing;
		}
	},

	methods: {
        async submit () {
            await this.$auth.loginWith('local', {
                data: qs.stringify({
                    mobile: this.mobile,
                    password: this.password
                })
            });
        },
        
        clear () {
            this.$refs.form.reset()
        }
    },

	asyncData (context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object
		return { };
	},

	fetch({ store }) {
		store.commit('inspire/setPoef', process.env.API_URL)
	}
}
</script>

<template>
<v-layout row justify-center align-center>
	<v-flex xs12 md6>
		<v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">Login</div>
                </div>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                    <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="mobile"
                            label="Mobile Number"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="password"
                            :append-icon="showPass ? 'visibility_off' : 'visibility'"
                            :type="showPass ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="showPass = !showPass"
                        ></v-text-field>
                    </v-flex>
                    <v-btn
                        :disabled="!valid"
                        @click="submit">
                        Login
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                    </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
	</v-flex>
</v-layout>
</template>
