export const state = () => ({
	sidebar: false,
	snackbar: {
		show: false,
		message: ''
	}
})

export const getters = {
	authenticated(state) {
		return state.auth.loggedIn;
	},

	self(state) {
		return state.auth.user;
	},

	snackbarShow(state) {
		return state.snackbar.show;
	},

	snackbarMessage(state) {
		return state.snackbar.message;
	}
}

export const mutations = {
	toggleSidebar (state) {
		state.sidebar = !state.sidebar;
	},
	showSnackbar(state, message) {
		state.snackbar.show = true;
		state.snackbar.message = message;
	},
	hideSnackbar(state) {
		state.snackbar.show = false;
		state.snackbar.message = '';
	},
}
