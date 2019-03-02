import { mapGetters } from 'vuex'
import UIEvents from '~/constants/events/ui/UIEvents'
import { EventBus } from '~/services/events/EventBus'

export default {
    computed: {
        ...mapGetters({
			formErrors: 'beneficiary/formErrors',
		}),
    },

    watch: {
        formErrors(newErrors) {
            if (newErrors.length)
                EventBus.$emit(UIEvents.VALIDATION_ERROR);
        }
    },

    methods: {
        clearError(field) {
            this.$store.commit('beneficiary/removeFormError', field);
        },

        validationData(field) {
            return this.formErrors
                    .filter(error => error.source.pointer === field)
                    .map(error => error.detail);
        }
    }
}