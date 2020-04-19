export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    handleChange (val) {
      if (this.item && this.item.onChange) {
        this.item.onChange(val)
      }
    }
  }
}
