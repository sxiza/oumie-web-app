export const state = () => ({
	beneficiaries: []
})

export const getters = {
    beneficiaries(state) {
        return state.beneficiaries;
    }
}

export const mutations = {
    setBeneficiaries(state, beneficiaries) {
        state.beneficiaries = beneficiaries;
    }
}
