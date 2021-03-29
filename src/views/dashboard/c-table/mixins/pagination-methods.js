const METHODS_NAMES = [
  'size-change',
  'current-change',
  'prev-click',
  'next-click'
]

const methods = {}
METHODS_NAMES.forEach(name => {
  methods[name] = function(...args) {
    const ref_mTable = this.$refs[this.elTableRef]
    if (ref_mTable && ref_mTable[name]) {
      ref_mTable[name](...args)
    }
  }
})
