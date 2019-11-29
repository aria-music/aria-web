export default {
  methods: {
    toast(message, options = {}) {
      if(!message) return

      let defualt = {}

      if(options){
        defualt.icon = options.icon || "fas fa-plus"
        defualt.color = options.color || this.theme || "pink darken-1"
        if (typeof options.dark === 'boolean')
          defualt.dark = options.dark
        else
          defualt.dark = this.$vuetify.theme.dark
      }

      this.$toasted.show(message, defualt)
    }
  }
}
