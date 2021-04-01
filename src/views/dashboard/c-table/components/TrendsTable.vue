<template>
  <div style="float: right">
    <el-popover placement="bottom" title="隐藏/显示列" trigger="click">
      <el-checkbox-group v-model="tableList" class="el-ckeckbox-list" @change="checkboxChange">
        <el-checkbox
          v-for="(item, index) in checkList"
          :key="index"
          :label="item.prop"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
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
      list: []
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
        // this.tableList = list
        this.checkList = list
      }
    },
    hideColumnsOptions: {
      immediate: true,
      handler(val) {
        this.tableList = val
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    checkboxChange(val) {
      this.$emit('changeIsFalse', val, this.val)
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
