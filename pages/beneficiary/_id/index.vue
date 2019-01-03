<script>
import BeneficiaryHttp from '../../../services/http/BeneficiaryHttp'
import ImageGenerator from '../../../services/images/ImageGenerator'
import ObjectUtil from '../../../utils/ObjectUtil'

export default {
	data() {
        return {
            beneficiaryHttp: {},
            imageGenerator: {},
            picture: '',
            beneficiary: {}
        }
    },

	methods: {
        back() {
            this.$router.back();
        }
    },

	async asyncData(context) {
        let id = context.route.params.id;
        let beneficiary = await (new BeneficiaryHttp(context.$axios)).show(id);
        context.store.commit('beneficiary/setCurrBeneficiary', beneficiary);
        
        // Get the card picture
        let url = (new ImageGenerator).topics(beneficiary.name).url();

		return { 
            picture: url,
            beneficiary
        };
	},

	fetch({ store }) {
    },

    created() {
        console.log(ObjectUtil.isEmpty(this.beneficiary));
    },
    
    beforeCreate() {
        this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);
        this.imageGenerator = new ImageGenerator;
    },
}
</script>

<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12 md10 offset-md1>
			<v-card>
                <v-img :src="picture"
                    height="300px"
                    gradient="to top right, rgba(0,0,0,.6), rgba(0,0,0,.6)">
                    <v-layout
                    column
                    fill-height>
                        <v-card-title>
                            <v-btn dark icon @click="back">
                            <v-icon>chevron_left</v-icon>
                            </v-btn>
            
                            <v-spacer></v-spacer>
            
                            <v-btn dark icon class="mr-3">
                            <v-icon>edit</v-icon>
                            </v-btn>
            
                            <v-btn dark icon>
                            <v-icon>more_vert</v-icon>
                            </v-btn>
                        </v-card-title>
            
                        <v-spacer></v-spacer>
            
                        <v-card-title class="white--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">{{ beneficiary.name }}</div>
                        </v-card-title>
                    </v-layout>
                </v-img>
                <v-list two-line>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="indigo">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content class="black__text">
                            <v-list-tile-title>{{ beneficiary.mobile }}</v-list-tile-title>
                            <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to="soundclip" append>
                        <v-list-tile-action>
                            <v-icon color="indigo">library_music</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content class="black__text">
                            <v-list-tile-title>Voicenotes</v-list-tile-title>
                            <v-list-tile-sub-title>See All Voicenotes</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>chevron_right</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
