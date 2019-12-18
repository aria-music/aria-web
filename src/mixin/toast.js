export default {
  methods: {
    toast(message, options = {}) {
      if(!message) return

      let defualt = Object.assign({}, options)

      if(options){
        defualt.icon = options.icon || "fas fa-plus"
        defualt.color = options.color || this.theme || "pink darken-1"
        defualt.dark = options.dark || true
      }

      this.$toasted.show(message, defualt)
    }
  }
}
