<script>
import BeneficiaryHttp from '../../services/http/BeneficiaryHttp'
import { mapGetters } from 'vuex'

export default {
	data() {
        return {
			beneficiaryHttp: {},
			dialog: false
        }
	},
	
	computed: {
		...mapGetters({
			beneficiaries: 'beneficiary/beneficiaries'
		})
	},

	methods: {
		async getBeneficiaries() {
			let beneficiaries = await this.beneficiaryHttp.getAll();
			this.$store.commit('beneficiary/setBeneficiaries', beneficiaries);
		},
    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object

		return { };
	},

	async fetch({ store }) {
		
	},
	
	created() {
		this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);
	},

	mounted() {
		if (!this.beneficiaries.length)
			this.getBeneficiaries();
	}
}
</script>

<template>
<v-container fluid
            grid-list-md>
	<v-layout row wrap>
		<v-flex xs12>
			<h6 class="title">Beneficiaries	</h6>
		</v-flex>
		<v-flex xs12>
			<v-divider></v-divider>
		</v-flex>
		<v-flex xs12 md4>
			<v-card v-for="beneficiary in beneficiaries"
					:key="beneficiary.id"
					color="grey darken-1"
					:to="{ name: 'beneficiary-id', params: { id: beneficiary.id }}">
				<v-card-title primary-title class="white--text">
					<div class="headline">{{ beneficiary.name }}</div>
					<v-spacer></v-spacer>
					<div>{{ beneficiary.readStatus.toUpperCase() }}</div>
				</v-card-title>
				<v-divider dark></v-divider>
				<v-card-actions color="white">
					<v-spacer></v-spacer>
					<v-btn icon>
						<v-tooltip bottom>
							<v-icon color="white" slot="activator">mic</v-icon>
							<span>Record Voicenote</span>
						</v-tooltip>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
		<v-flex xs12>
			<v-divider></v-divider>
		</v-flex>
		<v-flex xs12 class="hidden-md-and-down">
			<v-btn @click="dialog = !dialog" color="primary" dark large>Add <v-icon right>add</v-icon></v-btn>
		</v-flex>
		<v-btn dark
			fixed
			right
			bottom
			fab
			color="primary"
			@click="dialog = !dialog">
			<v-icon>add</v-icon>
		</v-btn>
	</v-layout>
	
	<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">	
		<v-card>
			<v-toolbar dark color="primary">
				<v-btn icon dark @click="dialog = false">
					<v-icon>close</v-icon>
				</v-btn>
				<v-toolbar-title>Add Beneficiary</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn dark flat @click="dialog = false">Save</v-btn>
				</v-toolbar-items>
			</v-toolbar>
		</v-card>
	</v-dialog>
</v-container>
</template>
