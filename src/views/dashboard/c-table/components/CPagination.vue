<template>
  <div>
    <el-pagination
      style="text-align: right"
      background
      :layout="layout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      v-bind="paginationProps"
      @prev-click="onPrevClick"
      @next-click="onNextClick"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CPagination',
  inheritAttrs: false,
  props: {
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 15, 30, 50, 100, 150, 200, 300]
    }
  },
  data() {
    return {
      pNum: 1,
      pSize: 10,
      height: 36,
      paginationProps: {}
    }
  },
  watch: {
    $attrs: {
      immediate: true,
      deep: true,
      handler({ total, currentPage, pages }) {
        let props = Object.assign({}, { total, currentPage, pages })
        if (typeof total === 'string') {
          this.paginationProps.total = Number(total)
        }
        this.pNum = currentPage
        this.pSize = pages
        this.paginationProps = props
      }
    }
  },
  created() {
    let { $attrs } = this
    this.pNum = $attrs.currentPage
    this.pSize = $attrs.pages
  },
  methods: {
    // 每页条数发生改变
    onSizeChange(pageSize) {
      this.pSize = pageSize
      this.$emit('size-change', pageSize)
      this.$emit('update:pageSize', pageSize)
      if (this.pNum > Math.ceil(this.paginationProps.total / pageSize)) return
      this.change()
    },
    // 修改当前的页码
    onCurrentChange(currentPage) {
      this.pNum = currentPage
      this.$emit('current-change', currentPage)
      this.$emit('update:currentPage', currentPage)
      this.change()
    },
    // 上一页
    onPrevClick(pageNum) {
      this.$emit('prev-click', pageNum)
    },
    // 下一页
    onNextClick(pageNum) {
      this.$emit('next-click', pageNum)
    },
    change() {
      this.$emit('pageChange', this.pNum, this.pSize)
    }
  }
}
</script>
