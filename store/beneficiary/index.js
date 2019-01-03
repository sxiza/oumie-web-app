export const state = () => ({
    beneficiaries: [],
    currBeneficiary: {}
})

export const getters = {
    currBeneficiary(state) {
        return state.currBeneficiary;
    },
    beneficiaries(state) {
        return state.beneficiaries;
    }
}

export const mutations = {
    setBeneficiaries(state, beneficiaries) {
        state.beneficiaries = beneficiaries;
    },
    setCurrBeneficiary(state, beneficiary) {
        state.currBeneficiary = beneficiary;
    }
}
