<template>
  <v-menu>
    <v-btn color="primary" dark slot="activator">text</v-btn>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.key" @click="callback">
        <v-list-tile-title>{{ item.key }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
export default {

}
</script>