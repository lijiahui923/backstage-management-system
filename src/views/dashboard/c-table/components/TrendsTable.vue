<template>
  <div style="float: right">
    <el-popover v-model="visible" placement="bottom" title="隐藏/显示列" trigger="click">
      <el-checkbox-group v-model="tableList" class="el-ckeckbox-list">
        <el-checkbox
          v-for="(item, index) in checkList"
          :key="index"
          :label="item.prop"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
      <el-button @click="handleConfirm">确定</el-button>
      <el-button
        slot="reference"
        type="button"
        size="small"
      ><i class="el-icon-arrow-down el-icon-menu" /></el-button>
    </el-popover></div>
</template>

<script>
/**
@description:
@createTime:2021-03-31
@create:lijiahui
*/
export default {
  name: 'TrendsTable',
  components: {},
  props: {
    columnList: {
      type: Array,
      default: () => []
    },
    checked: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableList: [],
      checkList: [],
      result: [],
      list: [],
      visible: false
    }
  },
  computed: {},
  watch: {
    checked: {
      immediate: true,
      handler(checked) {
        this.tableList = checked
      }
    },
    columnList: {
      immediate: true,
      handler(list) {
        this.checkList = list
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    checkboxChange(val) {
        console.log('checkboxChange显示隐藏列', val, this.tableList)
      this.$emit('changeIsFalse', val)
    },
    handleConfirm() {
        this.$emit('input', this.tableList)
        this.$emit('confirm', this.tableList)
         this.$emit('changeIsFalse', this.tableList)
         this.visible = false
    }
  }
}
</script>
<style lang='scss' scoped>
.el-ckeckbox-list {
    display: flex;
    flex-direction: column;
}
</style>
