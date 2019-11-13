<template>
  
</template>
<script>
import { mapState } from 'vuex'

export default {
  components: {

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