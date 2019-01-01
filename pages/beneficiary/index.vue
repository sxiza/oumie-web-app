<script>
import BeneficiaryHttp from '../../services/http/BeneficiaryHttp'

export default {
	data() {
        return {
			beneficiaryHttp: {}
        }
	},
	

	methods: {

    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object
		let beneficiaries = await (new BeneficiaryHttp(context.$axios)).getAll();
		context.store.commit('beneficiary/setBeneficiaries', beneficiaries);

		return { beneficiaries };
	},

	fetch({ store }) {
	},

    beforeCreate() {
        this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);
    }
}
</script>

<template>
<v-container fluid
            grid-list-md>
	<v-layout row wrap>
		<v-flex xs12 md4>
			<v-card v-for="beneficiary in beneficiaries"
					:key="beneficiary.id"
					color="grey darken-1"
					:to="`/beneficiary/${beneficiary.id}`">
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
	</v-layout>
</v-container>
</template>
