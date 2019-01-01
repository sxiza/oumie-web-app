<script>
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			clipped: true,
			drawer: true,
			fixed: false,
			items: [
				{ icon: 'apps', title: 'Welcome', to: '/', public: true, inAuth: true, action: () => {} },
				{ icon: 'bubble_chart', title: 'Beneficiaries', to: '/beneficiary', public: false, inAuth: true, action: () => {} },
				{ icon: 'person_add', title: `Register`, to: '/register', public: true, inAuth: false, action: () => {} },
				{ icon: 'account_circle', title: 'Login', to: '/login', public: true, inAuth: false, action: () => {} },
				{ icon: 'exit_to_app', title: 'Logout', public: false, inAuth: true, action: this.logout },
			],
			miniVariant: false,
			right: true,
			rightDrawer: false
		}
	},

	computed: {
		...mapGetters(['authenticated', 'self']),
		title() {
			if (this.authenticated)
				return `Welcome to Oumienet, ${this.self.name}`;
			else
				return 'Oumienet';
		}
	},

	methods: {
		showMenuItem(item) {
			if (this.authenticated) {
				if (item.inAuth) {
					return true;
				}
				else {
					return false;
				}
			}
			else {
				if (item.public)
					return true;
				else
					return false;
			}
		},
		async logout() {
			await this.$auth.logout();
		}
	}
}
</script>

<template>
<v-app light>
	<v-navigation-drawer
		:mini-variant.sync="miniVariant"
		:clipped="clipped"
		v-model="drawer"
		fixed
		app>
		<v-list>
			<v-list-tile
				router
				:to="item.to"
				:key="i"
				v-for="(item, i) in items"
				exact
				v-if="showMenuItem(item)"
				@click="item.action">
				<v-list-tile-action>
					<v-icon v-html="item.icon"></v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title v-text="item.title"></v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
	<v-toolbar fixed app :clipped-left="clipped">
		<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
		<v-btn
			icon
			@click.stop="miniVariant = !miniVariant">
			<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
		</v-btn>
		<v-toolbar-title v-text="title"></v-toolbar-title>
		<v-spacer></v-spacer>
	</v-toolbar>
	<v-content>
		<v-container>
			<nuxt />
		</v-container>
	</v-content>
	<v-footer :fixed="fixed" app>
		<span>&copy; {{ new Date().getFullYear() }}</span>
	</v-footer>
</v-app>
</template>

