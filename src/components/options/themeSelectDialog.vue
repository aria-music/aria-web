<template>
  <v-dialog
    :value="value"
    @input="$emit('input')"
    scrollable
    max-width="400px"
  >
    <v-card>
      <v-card-title class="font-weight-bold">
        <span class="mr-2 font-weight-bold">Theme Color</span>
        <v-spacer></v-spacer>
        <v-switch
          v-model="dark"
          hide-details
          color="grey darken-1"
          label="dark n light"
          class="my-auto"
          @change="changeDarkNLight(dark)"
        ></v-switch>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-row wrap>
          <v-col
            v-for="(color, index) in colors"
            :key="index"
          >
            <v-card
              :class="`${color}`"
              class="mx-auto"
              width="100"
              height="100"
              @click="changeTheme(color)"
              ripple
            >
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text>:)</v-btn>
        <v-btn color="blue darken-1" text>:)</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
const colors = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "blue-grey",
  "grey",
  "black",
  "white",
]

const chroma = [
  "lighten-5",
  "lighten-4",
  "lighten-3",
  "lighten-2",
  "lighten-1",
  "darken-1",
  "darken-2",
  "darken-3",
  "darken-4",
]

const accents = [
  "accent-1",
  "accent-2",
  "accent-3",
  "accent-4",
]

export default {
  props: ['value'],
  data: () => ({
    dark: false,
    colors,
    chroma,
    accents,
  }),
  methods: {
    changeTheme(newTheme){
      this.$store.commit('changeTheme', newTheme)
    },
    changeDarkNLight(dark) {
      this.$vuetify.theme.dark = dark
      localStorage.dark = dark
    }
  },
  mounted() {
    this.dark = this.$vuetify.theme.dark
  }
}
</script>