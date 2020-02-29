<template>
    <v-dialog
        v-model="isShown"
        max-width="400"
        persistent
    >
        <v-card>
            <v-card-title class="mr-2 font-weight-bold">
                <v-icon left>fa fa-cog</v-icon>
                Aria Core Server Endpoint
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                    clearable
                    @keydown.stop
                    @keydown.enter="update"
                    label="Websocket"
                    prefix="wss://"
                    :color="themeColor"
                    :placeholder="currentEndpoint"
                    v-model="endpoint"
                ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="update" text :color="themeColor">Save</v-btn>
                <v-btn @click="flush" text color="blue">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: ["show"],
    data: () => ({
        isShown: false,
        endpoint: ""
    }),
    computed: mapState({
        currentEndpoint: "addr",
        themeColor: "theme"
    }),
    watch: {
        show: function() {
            setTimeout(() => {
                this.isShown = true
            }, 0)
        }
    },
    methods: {
        ...mapMutations(["changeAddr"]),
        update() {
            this.changeAddr(this.endpoint)
            this.flush()
        },
        flush() {
            this.endpoint = ""
            this.isShown = false
        }
    }
}
</script>
