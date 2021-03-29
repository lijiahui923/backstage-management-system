<template>
  <div class="dashboard-container">
    <!-- <MyInput v-model="name" :disabled="disabled">
      <template slot="prepend">Http://</template>
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix">
      </i>
    </MyInput> -->
    <!-- <el-input v-model="inputVal" /> -->
    <CTable :columns="columns" :data="tableData" @select="selectCurrentRow" :paginationConfig="paginationConfig">
      <template v-slot:expand="props" type="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
      <div slot="append" style="height: 30px">
        <div>99999999999</div>
      </div>
    </CTable>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import MyInput from './MyInput'
import CTable from './c-table'
export default {
  name: 'Dashboard',
  components: { CTable },
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  watch: {
    // name: {
    //   handler(val) {
    //     console.log(val)
    //   },
    //   immediate: true
    // }
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      // name: '123',
      // disabled: false
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
        }
      ],
      tableData: [
        {
          name: '王小虎'
        }
      ],
      paginationConfig: {
        total: 30,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  // mounted() {
  //   console.log(this.$refs.MyInput)
  // },
  created() {
    // this.getRef()
  },
  methods: {
    selectCurrentRow(selection, row) {
      console.log(selection, row)
    }
    // getRef() {
    //   console.log(this.$refs.MyInput)
    // }
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
