export const state = () => ({
	sidebar: false
})

export const getters = {
	authenticated(state) {
		return state.auth.loggedIn;
	},

	self(state) {
		return state.auth.user;
	}
}

export const mutations = {
	toggleSidebar (state) {
		state.sidebar = !state.sidebar;
	}
}
