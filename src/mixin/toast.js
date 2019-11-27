export default {
  methods: {
    toast(message, options = {}) {
      if(!message) return

      let defualt = {
        icon: "fas fa-plus",
        color: this.theme || "pink darken-1",
        dark: this.$vuetify.theme.dark
      }

      if(options){
        defualt.icon = options.icon || "fas fa-plus"
        defualt.color = options.color || this.theme || "pink darken-1",
        defualt.dark = options.dark || this.$vuetify.theme.dark
      }

      this.$toasted.show(message, defualt)
    }
  }
}