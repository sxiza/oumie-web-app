<script>
export default {
	computed: {
		env() {
			return this.$store.state.inspire.poefing;
		}
	},

	asyncData (context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object
		return { };
	},

	fetch({ store }) {
		store.commit('inspire/setPoef', process.env.API_URL)
	}
}
</script>

<template>
<v-layout>
	<v-flex text-xs-center>
		<img src="/v.png" alt="Vuetify.js" class="mb-5">
		<blockquote class="blockquote">
			&#8220;First, solve the problem. Then, write the code.&#8221;, found at {{ env }}
			<footer>
				<small>
					<em>&mdash;John Johnson</em>
				</small>
			</footer>
		</blockquote>
	</v-flex>
</v-layout>
</template>
