<template>
  
</template>
<script>
import { mapState } from 'vuex'

export default {
  components: {

  },
  props: {
    theme: String
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState(["searchData"]),
    searchItem() {
      return decodeURIComponent(this.$route.params.item)
    },
  }
}
</script>