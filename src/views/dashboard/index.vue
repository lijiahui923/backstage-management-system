<template>
  <div class="dashboard-container">
    <MyInput v-model="name" :disabled="disabled" clearable>
      <template slot="prepend">Http://</template>
      <i
        slot="suffix"
        class="el-icon-edit el-input__icon"
      />
    </MyInput>
    <CTable
      ref="CTable"
      :height="500"
      :columns="columns"
      :data="tableData"
      :pagination-config="paginationConfig"
      @select="selectCurrentRow"
      @pageChange="pageChange"
    >
      <template v-slot:expand="{ row }" type="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
      <template slot="append">
        <div>99999999999</div>
      </template>
      <template v-slot:status="{ row }">
        <el-button v-if="row.status === 'draft'" type="success" icon="el-icon-check" circle />
        <el-button v-else-if="row.status === 'deleted'" type="info" icon="el-icon-message" circle />
        <el-button v-else type="warning" icon="el-icon-star-off" circle />
      </template>
      <template v-slot:input>
        <MyInput v-model="name" :disabled="disabled">
          <template slot="prepend">Http://</template>
          <i
            slot="suffix"
            class="el-icon-edit el-input__icon"
          />
        </MyInput>
      </template>
      <template v-slot:select>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template v-slot:selectHeader>
        <MyInput v-model="name" :disabled="disabled">
          <template slot="prepend">Http://</template>
          <i
            slot="suffix"
            class="el-icon-edit el-input__icon"
          />
        </MyInput>
      </template>
      <template v-slot:operate="{ row, $index }">
        <el-button type="primary" @click="clickBtn(row, $index)">主要按钮</el-button>
      </template>
    </CTable>
    <el-button type="primary" @click="clickPrimary">按钮</el-button>
  </div>
</template>

<script>
import { getList } from '@/api/table'
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
          type: 'index'
        },
        {
          label: '编号',
          prop: 'id'
        },
        {
          label: '作者',
          prop: 'author'
        },
        {
          label: '时间',
          prop: 'display_time'
        },
        {
          label: '页数',
          prop: 'pageviews'
        },
        {
          label: '状态',
          prop: 'status',
          slots: 'status'
        },
        {
          label: '书名',
          prop: 'title'
        },
        {
          slots: 'input',
          label: '输入框',
          prop: 'name',
          width: 200
        },
        {
          slots: {
            default: 'select',
            header: 'selectHeader'
          },
          width: 200
        },
        {
          type: 'operate',
          width: 200
        }
      ],
      tableData: [],
      paginationConfig: {
        total: 0,
        pages: 10,
        currentPage: 1
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      oldTime: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const parmas = {
        currentPage: this.paginationConfig.currentPage,
        pages: this.paginationConfig.pages
      }
      getList(parmas).then(res => {
        this.tableData = res.data.rows
        this.paginationConfig.total = res.data.total
      })
    },
    selectCurrentRow(selection, row) {
      console.log(this.name, selection, row, this.$refs.CTable)
    },
    pageChange(currentPage, pages) {
      this.paginationConfig.pages = pages
      this.paginationConfig.currentPage = currentPage
      this.getList()
    },
    clickBtn(row, $index) {
      console.log(row.name, $index)
    },
    clickPrimary() {
      if (this.oldTime === '') {
        this.oldTime = new Date().getTime()
        console.log(1)
      } else {
        const newDate = new Date().getTime()
        console.log(newDate - this.oldTime)
        if (newDate - this.oldTime > 3000) {
          this.oldTime = new Date().getTime()
          console.log(2)
        } else {
          console.log(3)
        }
      }
    },
    sortMethod(a, b) {
      console.log(a, b)
    },
    changeIsFalse(val) {
      console.log(val)
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
