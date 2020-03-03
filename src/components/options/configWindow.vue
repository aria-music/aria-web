<template>
    <v-dialog
        :value="value"
        @input="close"
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
                <v-btn @click="close" text color="blue">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: ["value"],
    data: () => ({
        endpoint: ""
    }),
    computed: mapState({
        currentEndpoint: "addr",
        themeColor: "theme"
    }),
    methods: {
        ...mapMutations(["changeAddr"]),
        update() {
            this.changeAddr(this.endpoint)
            this.close()
        },
        close() {
            this.endpoint = ""
            this.$emit("input")
        }
    }
}
</script>
