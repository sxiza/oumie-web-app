<script>
import InputDialog from '~/components/InputDialog'
import { EventBus } from '~/services/events/EventBus'

export default {
	extends: InputDialog,
	
    components: {
        InputDialog
    },

	data() {
        return {
			beneficiary: {}
        }
	},
	
	computed: {
	},

	methods: {
		save() {

		},

		open(beneficiary = {}) {
			this.beneficiary = beneficiary;
            this.show = true;
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
		EventBus.$on(this.saveEvent, this.save);
	}
}
</script>

<template>
<input-dialog>
    <span slot="title">Add Beneficiary</span>
	<template slot="input-content">
		<v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12>
					<v-input label="Name" required v-model="beneficiary.name"></v-input>
				</v-flex>
			</v-layout>
		</v-container>
	</template>
</input-dialog>
</template>
