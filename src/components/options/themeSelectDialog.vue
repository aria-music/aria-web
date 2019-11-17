<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="400px"
  >
    <v-card>
      <v-card-title class="font-weight-bold">
        <span class="mr-2 font-weight-bold">Theme Color</span>
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
        <v-btn color="blue darken-1" text>Close</v-btn>
        <v-btn color="blue darken-1" text>Save</v-btn>
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

export default {
  props: {
    show: Boolean
  },
  data: () => ({
    dialog: false,
    colors: colors
  }),
  methods: {
    changeTheme(newTheme){
      this.$store.commit('changeTheme', newTheme)
    }
  },
  watch: {
    show: function(){
      setTimeout(() => {
        this.dialog = true
      }, 0);
    }
  },
}
</script>