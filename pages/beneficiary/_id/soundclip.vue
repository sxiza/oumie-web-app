<script>
import SoundclipHttp from '../../../services/http/SoundclipHttp'
import BeneficiaryHttp from '../../../services/http/BeneficiaryHttp'
import ObjectUtil from '../../../utils/ObjectUtil'
import { mapGetters } from 'vuex'

export default {
	data() {
        return {
			soundclipHttp: {},
			beneficiaryHttp: {},
			soundclips: []
        }
	},

	computed: {
		...mapGetters({
			beneficiary: 'beneficiary/currBeneficiary'
		})
	},
	

	methods: {
		async getBeneficiary() {
			let beneficiary = await this.beneficiaryHttp.show(this.$route.params.id);
			this.$store.commit('beneficiary/setCurrBeneficiary', beneficiary);
		}
    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object
		let soundclips = await (new SoundclipHttp(context.$axios)).getAll({
			beneficiaryID: context.route.params.id
		});

		return { soundclips };
	},

	fetch({ store }) {
	},

	async created() {
		console.log(this.soundclips);
		this.soundclipHttp = new SoundclipHttp(this.$axios);
		this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);

		if (ObjectUtil.isEmpty(this.beneficiary))
			await this.getBeneficiary();
	},
}
</script>

<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12 md10 offset-md1>
			<v-card>
				<v-list subheader>
            		<v-subheader>Voicenotes for {{ beneficiary.name }}</v-subheader>
					<template v-for="(soundclip, k) in soundclips">
						<v-list-tile
							:key="soundclip.id"
							avatar>
							<v-list-tile-avatar>
								<v-icon>music_note</v-icon>
							</v-list-tile-avatar>
				
							<v-list-tile-content>
								<v-list-tile-title>{{ soundclip.created_at }} - {{ soundclip.readStatus }}</v-list-tile-title>
							</v-list-tile-content>
				
							<v-list-tile-action>
								<v-tooltip top>
									<v-btn icon ripple slot="activator">
										<v-icon>hearing</v-icon>
									</v-btn>
									<span>Play</span>
								</v-tooltip>
							</v-list-tile-action>
							<v-list-tile-action>
								<v-tooltip top>
									<v-btn icon ripple slot="activator">
										<v-icon>send</v-icon>
									</v-btn>
									<span>Send</span>
								</v-tooltip>
							</v-list-tile-action>
						</v-list-tile>
						<v-divider
							v-if="k + 1 < soundclips.length"
                			:key="k">
						</v-divider>
					</template>
				</v-list>
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
