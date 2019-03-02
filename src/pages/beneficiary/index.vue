<script>
import { mapGetters } from 'vuex'
import ErrorUtil from '~/utils/ErrorUtil'
import UIEvents from '~/constants/events/ui/UIEvents'
import { EventBus } from '~/services/events/EventBus'
import BeneficiaryHttp from '~/services/http/BeneficiaryHttp'
import BeneficiaryEvents from '~/constants/events/BeneficiaryEvents'
import BeneficiaryCreateDialog from '~/components/beneficiary/BeneficiaryCreateDialog'

export default {
	components: {
		BeneficiaryCreateDialog
	},

	data() {
        return {
			beneficiaryHttp: {},
			createOpenEvent: BeneficiaryEvents.INPUT_DIALOG_OPEN,
			createSaveEvent: BeneficiaryEvents.INPUT_DIALOG_SAVE
        }
	},
	
	computed: {
		...mapGetters({
			beneficiaries: 'beneficiary/beneficiaries',
			beneficiary: 'beneficiary/currBeneficiary'
		})
	},

	watch: {
		beneficiary(beneficiary) {
			this.createBeneficiary(beneficiary);
		}
	},

	methods: {
		async createBeneficiary(beneficiary) {
			try {
				beneficiary = await this.beneficiaryHttp.store(beneficiary);
				this.$store.commit('beneficiary/addBeneficiary', beneficiary);
				this.$store.commit('showSnackbar', "Beneficiary Added");
				EventBus.$emit(UIEvents.INPUT_DIALOG_CLOSE);
			}
			catch (error) {
				console.error(ErrorUtil.getMessages(error));
				this.$store.commit('beneficiary/setFormErrors', ErrorUtil.getMessages(error).errors);
			}
		},

		openAddDialog() {
			EventBus.$emit(this.createOpenEvent);
		},

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
		<v-flex xs12 md4 
			v-for="beneficiary in beneficiaries"
			:key="beneficiary.id">
			<v-card 
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
			<v-btn @click="openAddDialog()" color="primary" dark large>Add <v-icon right>add</v-icon></v-btn>
		</v-flex>
		<v-btn dark
			fixed
			right
			bottom
			fab
			color="primary"
			@click="openAddDialog()">
			<v-icon>add</v-icon>
		</v-btn>
	</v-layout>
	<beneficiary-create-dialog 
		:open-event="createOpenEvent"
		:save-event="createSaveEvent">
	</beneficiary-create-dialog>
</v-container>
</template>
