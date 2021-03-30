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
      <div slot="append">
        <div>99999999999</div>
      </div>
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
import { userInfoApi } from '@/api/user'
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
          label: '年龄',
          prop: 'age'
        },
        {
          slots: 'input',
          label: '输入框',
          prop: 'name'
        },
        {
          slots: {
            default: 'select',
            header: 'selectHeader'
          }
        },
        {
          type: 'operate'
        }
      ],
      tableData: [
        {
          name: '王小虎',
          age: 18
        }
      ],
      paginationConfig: {
        total: 30,
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
    // this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userInfoApi({ service: 'quotations' }).then(res => {
        console.log(res)
      })
    },
    selectCurrentRow(selection, row) {
      console.log(this.name, selection, row, this.$refs.CTable)
    },
    pageChange(pageNum, pagePage) {
      console.log(pageNum, pagePage)
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
