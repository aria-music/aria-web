<template>
  <v-list
    :max-height="maxHeight"
    :min-height="200"
    style="overflow: auto"
    class="py-0 queue"
    dense
  >
    <v-list-item-group>
      <v-list-item
        v-for="(item, index) in queue"
        :key="index"
      >
        <v-hover #default="{ hover }">
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
            <v-col cols="7" class="py-0 my-auto">
              <v-list-item-content class="py-0">
                <v-list-item-title v-text="item.title" class="text-truncate"></v-list-item-title>
                <v-list-item-subtitle v-text="item.artist" class="text-truncate"></v-list-item-subtitle>
              </v-list-item-content>
            </v-col>

            <!-- btns -->
            <v-col cols="4" class="py-0 align-center">
              <div v-show="hover">
                <!-- love btn -->
                <lovebtn small/>

                <!-- delete btn -->
                <deletebtn small/>

                <!-- info btn -->
                <infobtn small/>
              </div>
            </v-col>
          </v-row>
        </v-hover>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import lovebtn from '../btns/love'
import deletebtn from '../btns/delete'
import infobtn from '../btns/info'

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
  components: {
    lovebtn,
    deletebtn,
    infobtn,
  },
  data: () => ({
    //
  }),
  computed: {
    queue() {
      return QUEUE
    },
  }
}
</script>
<style lang="scss" scoped>
.queue {
  &::-webkit-scrollbar {
    overflow:hidden;
    width:1px;
    background:#fafafa;

    &:horizontal {
      height:1px;
    }
  }

  &::-webkit-scrollbar-button {
    display:none;
  }

  &::-webkit-scrollbar-piece {
    background:#eee;
    &:start {
      background:#eee;
    }
  }

  &::-webkit-scrollbar-thumb {
    background:#333;
  }

  &::-webkit-scrollbar-corner {
    background:#333;
  }
}
</style>