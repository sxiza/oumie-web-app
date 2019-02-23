<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['authenticated']),
		name() {
			return process.env.APP_NAME
		}
	}
}
</script>

<template>
<v-layout column justify-center align-center>
	<v-flex xs12 sm8 md6>
		<div class="text-xs-center">
			<img src="/v.png" alt="Vuetify.js" class="mb-5" />
		</div>
			<v-card>
			<v-card-title class="headline">Welcome to {{ name }}</v-card-title>
			<v-card-text>
				<p>Oumienet helps you let your grandparents know you care about them, in ways that are convenient to everyone</p>
				<small>You can also use it for your blind friends or family</small>
			</v-card-text>
			<v-card-actions v-if="authenticated">
				<v-spacer></v-spacer>
				<v-btn color="primary" flat nuxt to="/beneficiary">Continue</v-btn>
			</v-card-actions>
			<v-card-actions v-if="!authenticated">
				<v-spacer></v-spacer>
				<v-btn color="primary" flat nuxt to="/login">Continue</v-btn>
			</v-card-actions>
		</v-card>
	</v-flex>
</v-layout>
</template>
