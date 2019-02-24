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
        }
    },

	data() {
        return {
            show: false
        }
	},
	
	computed: {
	},

	methods: {
        save() {
            EventBus.$emit(this.saveEvent);
        },
        
        open() {
            this.show = true;
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
	}
}
</script>

<template>
<v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">	
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="show = false">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click="save()">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <slot name="input-content"></slot>
        </v-card-text>
    </v-card>
</v-dialog>
</template>
