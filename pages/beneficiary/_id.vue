<script>
import BeneficiaryHttp from '../../services/http/BeneficiaryHttp'
import ImageGenerator from '../../services/images/ImageGenerator'

export default {
	data() {
        return {
            beneficiaryHttp: {},
            imageGenerator: {},
            beneficiary: {},
            picture: ''
        }
	},

	methods: {
        back() {
            this.$router.back();
        }
    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
        // Also, the returned object will be merged with your data object

        let id = context.route.params.id;
        let beneficiary = await (new BeneficiaryHttp(context.$axios)).get(id);

        // Get the card picture
        
        // let url = (new ImageGenerator).topic(beneficiary.name).url();
        let url = '';
		return { 
            picture: url,
            beneficiary
         };
	},

	fetch({ store }) {
		
    },
    
    async created() {
        console.log(await (new ImageGenerator).url());
        this.beneficiaryHttp = new BeneficiaryHttp(this.$axios);
        this.imageGenerator = new ImageGenerator;
    },
}
</script>

<template>
<v-container fluid
            grid-list-md>
	<v-layout row wrap>
		<v-flex xs12 md8 offset-md2>
			<v-card>
          <v-img
            :src="picture"
            height="300px"
          >
            <v-layout
              column
              fill-height
            >
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
                <div class="display-1 pl-5 pt-5">Ali Conners</div>
              </v-card-title>
            </v-layout>
          </v-img>
          </v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>
