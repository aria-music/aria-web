<template>
  <v-card
    max-height="100%"
    class="pl-2"
    :color="theme"
  >
    <v-card
      max-height="100%"
    >
      <!-- -201... -->
      <v-list
        v-if="isContentsExist"
        :height="size.height - 201"
        class="scroller"
        style="overflow: auto"
      >
        <v-list-item-group>
          <v-fade-transition group>
            <v-list-item
              v-for="(item, index) in contents"
              :key="index"
              :ripple="false"
              class="pa-0"
            >
              <v-hover #default="{ hover }">
                <v-row
                  dense
                  class="ma-0"
                  style="height: 40px"
                >
                <v-col>
                  <div>
                    {{item.title}}
                  </div>
                </v-col>
                </v-row>
              </v-hover>
            </v-list-item>
          </v-fade-transition>
        </v-list-item-group>
      </v-list>
      <div
        v-else
        class="py-5 text-center headline font-weight-bold"
      >No Tracks : )</div>
    </v-card>
  </v-card>
</template>
<script>
export default {
  props: {
    contents: {
      type: Array,
      default: []
    },
    theme: String,
    size: Object,
  },
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
    isContentsExist() {
      return this.contents.length > 0
    }
  },
}
</script>
<style lang="scss" src="@/components/options/scss/scroller.scss">