<template>
  <v-card
    :height="80"
    class="pl-2 pt-1 mb-3"
    :color="theme"
  >
    <v-card
      height="100%"
      class="pa-4"
    >
      <v-text-field
        v-model="searchVlaue"
        label="Search..."
        prepend-inner-icon="search"
        :color="theme"
        outlined
        dense
        @focus="stopEvents()"
        @blur="addEvents()"
      ></v-text-field>
    </v-card>
  </v-card>
</template>
<script>
export default {
  props: {
    theme: String,
    isContentsExist: Boolean,
  },
  watch: {
    searchVlaue: function(newSearchVlaue) {
      this.$emit('setSearchValue', newSearchVlaue)
    }
  },
  methods: {
    stopEvents() {
      this.$store.commit('removeEvents')
    },
    addEvents() {
      this.$store.commit('addEvents')
    }
  },
  data: () => ({
    isActive: false,
    searchVlaue: ""
  })
}
</script>