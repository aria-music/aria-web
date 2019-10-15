<template>
  <v-btn
    icon
    text
  >
    <v-icon
      :small="small"
    >delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    small: {
      default: false,
    }
  },
  data: () => ({
    //
  })
}
</script>