<template>
  <v-card :height="size.height - 200">
    <v-card-title primary-title>
      {{ searchItem }}
    </v-card-title>
    <searchList
      :theme="theme"
      :maxHeight="maxHeight"
      :maxWidth="maxWidth"
    />
  </v-card>
</template>
<script>
import searchList from '@/components/options/queue/searchList'
export default {
  components: {
    searchList
  },
  props: {
    theme: String,
    size: Object
  },
  data: () => ({
    //
  }),
  computed: {
    searchItem() {
      return decodeURIComponent(this.$route.params.item)
    },
    maxHeight() {
      return this.size.height - 250
    },
    maxWidth() {
      return this.size.width
    }
  },
}
</script>