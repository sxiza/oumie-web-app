<script>
import InputDialog from '~/components/InputDialog'
import { EventBus } from '~/services/events/EventBus'
import FormValidation from '~/utils/mixins/FormValidation'

export default {
	mixins: [InputDialog, FormValidation],
    components: {
        InputDialog
	},

	data() {
        return {
			name: '',
			mobile: '',
			
        }
	},
	
	computed: {
		transformed() {
			return {
				name: this.name,
				mobile: this.mobile
			};
		}
	},

	methods: {
		saveBeneficiary() {
			this.saveLoading = true;
			this.$store.commit('beneficiary/setCurrBeneficiary', this.transformed);
		},

		open(beneficiary = {}) {
			this.name = beneficiary.name;
			this.mobile = beneficiary.mobile;
        }
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
	},

	mounted() {
		EventBus.$on(this.saveEvent, this.saveBeneficiary);
	}
}
</script>

<template>
<input-dialog 
	:open-event="openEvent"
	:save-event="saveEvent">
    <span slot="title">Add Beneficiary</span>
	<template slot="input-content">
		<v-subheader class="hidden-md-and-down">A beneficiary might be your Ouma (Granny), Oupa (Grandpa) or a friend that is physically unable to navigate voicenotes</v-subheader>
		<v-form ref="form">
			<v-layout wrap>
					<v-flex xs12 md4>
						<v-text-field
							v-model="name"
							label="Name"
							prepend-icon="person"
							autofocus
							box
							@change="clearError('name')"
							:error-messages="validationData('name')">
						</v-text-field>
					</v-flex>
					<v-flex xs12 md4>
						<v-text-field
							v-model="mobile"
							label="Phone Number"
							prepend-icon="phone"
							box
							@change="clearError('mobile')"
							:error-messages="validationData('mobile')">
						</v-text-field>
				</v-flex>
				<v-flex xs12 md4 class="hidden-md-and-down">
					<v-btn 
						:loading="saveLoading"
						@click="saveBeneficiary" 
						color="primary" 
						large>Save</v-btn>
				</v-flex>
			</v-layout>
		</v-form>
	</template>
</input-dialog>
</template>
