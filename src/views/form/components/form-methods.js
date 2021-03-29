const METHOD_NAMES = [
  'validate',
  'validateField',
  'resetFields',
  'clearValidate'
]

const methods = {}

// 生成表单方法
METHOD_NAMES.forEach(name => {
  methods[name] = function(...args) {
    const { DynamicFormREF } = this.$refs
    if (DynamicFormREF && DynamicFormREF[name]) {
      DynamicFormREF[name](...args)
    }
  }
})

export default { methods }
