<template>
  <div>
    <v-row dense class="px-4">
      <v-col cols="1">
      </v-col>
      <v-divider vertical class="my-1"></v-divider>
      <v-col cols="7">
        <v-list-item-title class="font-weight-medium caption py-0">Title</v-list-item-title>
      </v-col>
      <v-divider vertical class="my-1"></v-divider>
    </v-row>
    <v-divider></v-divider>
    <v-list
      :max-height="maxHeight"
      min-height="200"
      style="overflow: auto;"
      class="py-0"
      dense
    >
      <v-list-item
        v-for="(item, index) in queue"
        :key="index"
      >
        <v-row dense style="height: 40px">

          <!-- thumnail -->
          <v-col cols="1" class="py-0 my-auto">
            <v-img
              :src="item.thumnail"
              eager
              :aspect-ratio="1"
              contain
              height="35"
            >

            </v-img>
          </v-col>

          <!-- title -->
          <v-col cols="7">
            <v-list-item-content class="py-0">
              <v-list-item-title v-text="item.title" class="text-truncate"></v-list-item-title>
              <v-list-item-subtitle v-text="item.artist" class="text-truncate"></v-list-item-subtitle>
            </v-list-item-content>
          </v-col>

          <!-- btns -->
          <v-col cols="4">
            <!-- TODO love btn -->
            <!-- TODO playlist btn -->
            <!-- TODO delete btn -->
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
const QUEUE = [
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
  {title: "hogehoge", artist: "fugafuga", thumnail: "https://images-na.ssl-images-amazon.com/images/I/51aYItqS1iL._AC_.jpg"},
]

export default {
  props: {
    maxHeight: {
      style: String,
      required: true,
    }
  },
  data: () => ({

  }),
  computed: {
    queue() {
      return QUEUE
    }
  }
}
</script>