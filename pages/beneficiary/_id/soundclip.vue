<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import SoundclipHttp from '../../../services/http/SoundclipHttp'
import BeneficiaryHttp from '../../../services/http/BeneficiaryHttp'
import ObjectUtil from '../../../utils/ObjectUtil'
import TimingUtil from '../../../utils/TimingUtil'
import AudioGenerator from '../../../services/audio/AudioGenerator'
import SoundclipModel from '../../../constants/models/SoundclipModel'

export default {
	data() {
        return {
			soundclipHttp: {},
			beneficiaryHttp: {},
			audio: {},
			recording: false,
			uploading: false,
			uploaded: 0
        }
	},

	computed: {
		...mapGetters({
			beneficiary: 'beneficiary/currBeneficiary',
			soundclips: 'beneficiary/soundclips'
		}),
		showMic() {
			return !this.uploading && !this.recording;
		}
	},
	

	methods: {
		statusColour(soundclip) {
			return SoundclipModel.statusColour(soundclip.status, true);
		},
		
		readDateTime(soundclip) {
			return moment(soundclip.created_at).format("dddd, MMM Do YYYY, h:mm a");
		},

		uploadProgress(progressEvent) {
			this.uploaded = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
		},

		async getBeneficiary() {
			let beneficiary = await this.beneficiaryHttp.show(this.$route.params.id);
			this.$store.commit('beneficiary/setCurrBeneficiary', beneficiary);
		},

		async play(soundclip) {
			try {
				let soundBuffer = await this.soundclipHttp.play(soundclip.id);
				let clip = this.audio.generateFromBuffer([soundBuffer]);
				clip.play();
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
			this.uploading = true;
			let soundclip = await this.soundclipHttp.create({
				soundclip: this.audio.file,
				beneficiaryID: this.beneficiary.id,
				onUploadProgress: this.uploadProgress
			});
			this.$store.commit('beneficiary/addSoundclip', soundclip);
			this.uploading = false;
			await TimingUtil.sleep(10000);
			this.audio.destroy();
		}
    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object
		let soundclips = await (new SoundclipHttp(context.$axios)).getAll({
			beneficiaryID: context.route.params.id
		});
		context.store.commit('beneficiary/setSoundclips', soundclips);

		return { };
	},

	fetch({ store }) {
	},

	beforeDestroy() {
		this.audio.destroy();
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
				<v-card-actions>
					<v-subheader>  <v-icon>music_note</v-icon>Voicenotes for {{ beneficiary.name }}</v-subheader>
					<v-spacer></v-spacer>
					<v-progress-circular 
						:value="uploaded" 
						v-if="uploading" 
						color="lime">
					</v-progress-circular>
					<v-btn round 
						color="primary" 
						@click="stopRecording" 
						v-if="recording">
						Recording...
						<v-icon right>stop</v-icon>
					</v-btn>
					<v-tooltip bottom
							v-if="showMic">
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
				<v-list>
					<template v-for="(soundclip, k) in soundclips">
						<v-list-tile
							:key="soundclip.id">
							<v-list-tile-content>
								<v-list-tile-title>{{ readDateTime(soundclip) }} - <span :class="statusColour(soundclip)">{{ soundclip.readStatus }}</span></v-list-tile-title>
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
				
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
