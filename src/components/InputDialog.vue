<script>
import { EventBus } from '~/services/events/EventBus'
import UIEvents from '~/constants/events/ui/UIEvents'

export default {
    props: {
        openEvent: {
            type: String,
            default: UIEvents.INPUT_DIALOG_OPEN
        },
        saveEvent: {
            type: String,
            default: UIEvents.INPUT_DIALOG_SAVE
        },
        closeEvent: {
            type: String,
            default: UIEvents.INPUT_DIALOG_CLOSE
        }
    },

	data() {
        return {
            show: false,
            saveLoading: false
        }
	},
	
	computed: {
	},

	methods: {
        save() {
            this.saveLoading = true;
            EventBus.$emit(this.saveEvent);
        },
        
        open() {
            this.saveLoading = false;
            this.show = true;
        },

        close() {
            this.saveLoading = false;
            this.show = false;
        }
    },

	async asyncData(context) {
		// called every time before loading the component
		// as the name said, it can be async
		// Also, the returned object will be merged with your data object

		return { };
	},

	async fetch({ store }) {
		
	},
	
	created() {
	},

	mounted() {
        EventBus.$on(this.openEvent, this.open);
        EventBus.$on(this.closeEvent, this.close);
        EventBus.$on(UIEvents.VALIDATION_ERROR, () => this.saveLoading = false)
	}
}
</script>

<template>
<v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">	
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn 
                    dark 
                    flat 
                    :loading="saveLoading"
                    @click="save">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <slot name="input-content"></slot>
        </v-card-text>
    </v-card>
</v-dialog>
</template>
