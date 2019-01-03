<script>
import SoundclipHttp from '../../../services/http/SoundclipHttp'
import BeneficiaryHttp from '../../../services/http/BeneficiaryHttp'
import ObjectUtil from '../../../utils/ObjectUtil'
import { mapGetters } from 'vuex'
import AudioGenerator from '../../../services/audio/AudioGenerator'

export default {
	data() {
        return {
			soundclipHttp: {},
			beneficiaryHttp: {},
			soundclips: [],
			audio: {},
			recording: false
        }
	},

	computed: {
		...mapGetters({
			beneficiary: 'beneficiary/currBeneficiary'
		}),
	},
	

	methods: {
		async getBeneficiary() {
			let beneficiary = await this.beneficiaryHttp.show(this.$route.params.id);
			this.$store.commit('beneficiary/setCurrBeneficiary', beneficiary);
		},

		async play(soundclip) {
			try {
				let soundBuffer = await this.soundclipHttp.play(soundclip.id);
				let clip = this.audio.generateFromBuffer([soundBuffer]);
				await clip.play();
			} catch(error) {
				console.error(error.message);
			}
		},

		async record() {
			await this.audio.record();
			this.recording = true;
		},

		async stopRecording() {
			let clip = await this.audio.stopRecord();
			this.recording = false;
			clip.play();
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

	created() {
		this.soundclipHttp = new SoundclipHttp(this.$axios);
		this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);
		this.audio = new AudioGenerator;

		if (ObjectUtil.isEmpty(this.beneficiary))
			this.getBeneficiary();
	},
}
</script>

<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12 md10 offset-md1>
			<v-card>
				<v-list subheader>
            		<v-subheader inline>Voicenotes for {{ beneficiary.name }}</v-subheader>
					
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
									<v-btn icon ripple slot="activator" @click="play(soundclip)">
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
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn round 
						color="primary" 
						@click="stopRecording" 
						v-if="recording">
						Recording...
						<v-icon right>stop</v-icon>
					</v-btn>
					<v-tooltip bottom
							v-if="!recording">
						<v-btn fab 
							small 
							slot="activator" 
							color="primary" 
							@click="record">
							<v-icon>mic</v-icon>
						</v-btn>
						<span>Record Voicenote</span>
					</v-tooltip>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
