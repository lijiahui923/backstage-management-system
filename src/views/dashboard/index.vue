<template>
  <div class="dashboard-container">
    <MyInput v-model="name" :disabled="disabled">
      <template slot="prepend">Http://</template>
      <i
        slot="suffix"
        class="el-icon-edit el-input__icon"
      />
    </MyInput>
    <CTable :columns="columns" :data="tableData" :pagination-config="paginationConfig" @select="selectCurrentRow" @pageChange="pageChange">
      <template v-slot:expand="{ row }" type="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
      <div slot="append">
        <div>99999999999</div>
      </div>
      <template v-slot:operate="{ row, $index }">
        <el-button type="primary" @click="clickBtn(row, $index)">主要按钮</el-button>
      </template>
    </CTable>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import MyInput from './MyInput'
import CTable from './c-table'
export default {
  name: 'Dashboard',
  components: { CTable, MyInput },
  data() {
    return {
      name: '123',
      disabled: false,
      columns: [
        {
          type: 'selection'
        },
        {
          type: 'expand'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          type: 'operate'
        }
      ],
      tableData: [
        {
          name: '王小虎'
        }
      ],
      paginationConfig: {
        total: 30,
        pages: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    selectCurrentRow(selection, row) {
      console.log(this.name, selection, row)
    },
    pageChange(pageNum, pagePage) {
      console.log(pageNum, pagePage)
    },
    clickBtn(row, $index) {
      console.log(row.name, $index)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
