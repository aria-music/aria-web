export default {
  data(){
    return {
      lazy: 0
    }
  },
  methods: {
    lazyload(list) {
      const length = list.length
      const interval = setInterval(() => {
        this.lazy = this.lazy + 10
        if (this.lazy > length) clearInterval(interval)
      }, 25);
    }
  },
}