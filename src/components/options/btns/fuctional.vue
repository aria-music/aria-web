<template>
  <v-menu
    :open-on-hover="hover"
    :open-delay="hover ? 250 : 0"
    transition="scale-transition"
    origin="top right"
    bottom
    left
  >
    <template #activator="{ on }">
      <v-fade-transition mode="out-in">
        <v-btn
          icon
          small
          v-on="on"
          v-show="show"
        ><v-icon>more_vert</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>
    <v-alert
			class="mb-0 py-0 pr-0 pl-2"
			border="left"
			colored-border
			:color="themeColor"
		>
			<v-list shaped dense>
				<v-list-item
					v-for="(item, index) in funcList"
					:key="index"
					class="pl-2"
					@click="settingFunc(item.contents)"
				>
					<v-list-item-title class="mr-4">
						<v-icon class="mb-1 mr-4" small>{{ item.icon }}</v-icon>
						<span>{{ item.text }}</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-alert>
  </v-menu>
</template>
<script>
const like = { content: 'like', text: 'Like',  icon: 'fas fa-heart' }
const addList = { content: 'addList', text: 'Add to Playlist', icon: 'fas fa-plus' }
const removeQueue = { content: 'removeQueue', text: 'Remove', icon: 'far fa-trash-alt' }
const removeList = { content: 'removeList', text: 'Remove', icon: 'far fa-trash-alt' }
const playNext = { content: 'playNext', text: 'Play Next', icon: 'fas fa-play-circle' }
const playNow = { content: 'playNow', text: 'Play Now', icon: 'far fa-play-circle' }

export default {
  props: {
    show: Boolean,
    hover: Boolean,
    like: Boolean,
    addList: Boolean,
    removeQueue: Boolean,
    removeList: Boolean,
    playNext: Boolean,
    playNow: Boolean,
  },
  data: () => ({
    themeColor: "pink lighten-3",
    funcList: [],
  }),
  mounted() {
    this.makeList();
  },
  methods: {
    makeList() {
      if(this.like) this.funcList.push(like)
      if(this.addList) this.funcList.push(addList)
      if(this.removeQueue) this.funcList.push(removeQueue)
      if(this.removeList) this.funcList.push(removeList)
      if(this.playNext) this.funcList.push(playNext)
      if(this.playNow) this.funcList.push(playNow)
    },
  }
}
</script>