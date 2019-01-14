export const state = () => ({
    beneficiaries: [],
    currBeneficiary: {},
    soundclips: []
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
    }
}

export const mutations = {
    addSoundclip(state, soundclip) {
        state.soundclips.unshift(soundclip);
    },
    setSoundclips(state, soundclips) {
        state.soundclips = soundclips;
    },
    setBeneficiaries(state, beneficiaries) {
        state.beneficiaries = beneficiaries;
    },
    setCurrBeneficiary(state, beneficiary) {
        state.currBeneficiary = beneficiary;
    }
}
