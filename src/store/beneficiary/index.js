export const state = () => ({
    beneficiaries: [],
    currBeneficiary: {},
    soundclips: [],
    formErrors: []
})

export const getters = {
    currBeneficiary(state) {
        return state.currBeneficiary;
    },
    beneficiaries(state) {
        return state.beneficiaries;
    },
    soundclips(state) {
        return state.soundclips;
    },
    formErrors(state) {
        return state.formErrors;
    }
}

export const mutations = {
    addSoundclip(state, soundclip) {
        state.soundclips.unshift(soundclip);
    },
    setSoundclips(state, soundclips) {
        state.soundclips = soundclips;
    },
    addBeneficiary(state, beneficiary) {
        state.beneficiaries.unshift(beneficiary);
    },
    setBeneficiaries(state, beneficiaries) {
        state.beneficiaries = beneficiaries;
    },
    setCurrBeneficiary(state, beneficiary) {
        state.currBeneficiary = beneficiary;
    },
    setFormErrors(state, errors) {
        state.formErrors = errors;
    },
    removeFormError(state, field) {
        state.formErrors = state.formErrors.filter(error => error.source.pointer !== field);
    }
}
