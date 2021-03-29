<template>
  <!-- <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="a">
      <div class="b">s</div>
    </div>
  </div> -->
  <div class="app-container">
    <!-- <custom-ele></custom-ele> -->
  </div>
</template>

<script>
// import { getList } from '@/api/table'
// import XEUtils from 'xe-utils'
// import customEle from './child1'
export default {
  // components: {
  //   customEle
  // },
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      level: 1
      // list: null,
      // listLoading: false
    }
  },
  // render(h) {
  //   return h()
  // },
  created() {
    // this.fetchData()
  },
  methods: {
    // getFruit(fruits) {
    //   console.log(fruits?.[1]?.[1])
    // },
    fetchData() {
      // const arr = ['_a'], str = '12'
      // arr = arr.toString()
      // arr = str
      // console.log(arr)
      // [arr.toString, str] = [str, arr.push(arr)]
      // const x = ['a','b'], y =['b', 'c']
      // const k = [...x, ...y]
      // const hash = {}
      // k.forEach(item => {
      //   // console.log(item)
      //   if(item === 'b') {
      //     hash[item] = true
      //   } else {
      //     hash[item] = false
      //   }
      // })
      // console.log(hash)
      // const jk = k.map(item => {
      //   if (item === 'b') {
      //     item = false
      //   } else {
      //     item = true
      //   }
      //   console.log(item)
      // })
      // const x = ['a','b'], y =['b', 'c']
      // const z = [...x, ...y]
      // console.log(new Set(z).Object.entries(z))
      // this.getFruit([['🍊', '🍌'], ['🍍']])
      // this.getFruit()
      // this.getFruit([['🍍'], ['🍊', '🍌']])
      // const animals = {}
      // let dog = { emoji: '🐶' }
      // let cat = { emoji: '🐈' }

      // animals[dog] = { ...dog, name: 'Mara' }
      // animals[cat] = { ...cat, name: 'Sara' }

      // console.log(animals)
      // const p1 = Promise.resolve('first')
      // const p2 = Promise.resolve('second')
      // const p3 = Promise.reject('third')
      // const p4 = Promise.resolve('fourth')
      // const runPromises = async function() {
      //   const res1 = await Promise.all([p1, p2])
      //   const res2 = await Promise.all([p3, p4])
      //   return [res1, res2]
      // }
      // runPromises()
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))

      // const user = {
      //   email: 'my@email.com',
      //   updateEmail: email => {
      //     this.email = email
      //   }
      // }
      // user.updateEmail('new@email.com')
      // console.log(user.email)

      // const animals = {}
      // let dog = { emoji: '狗' }
      // // let cat = { emoji: '猫' }
      // console.log(...dog)
      // animals[dog] = {...}
      // const x = ['a','b'], y =['b', 'c']
      // console.log(Object)
      // const obj = {a: '1', b: 2}
      // console
      // const keys = ['name', 'age']
      // const values = ['lydia', 22]
      // Object.fromEntries()
      // let a=['_a'], b='Bx'
      // JSON.stringify(a)
      // [JSON.stringify(a), b] = [b ,JSON.stringify(a)]
      // console.log(a, b)
      // const x = [0], y = x
      // y[0] = '0'
      // console.log(x[0] ? true : false)

      // const x = ['a','b'], y =['b', 'c']
      // const k = [...x, ...y]
      // const jk = k.map(item => {
      //   if (item === 'b') {
      //     item = false
      //   } else {
      //     item = true
      //   }
      //   console.log(item)
      // })
      // console.log(jk)
      // const l = new Set(k)
      // l.map(item => {
      //   console.log(item)
      // })
      // console.log(l)
      // const brid = {
      //   size: 'small'
      // }
      // const mouse = {
      //   name: 'Mick',
      //   small: true
      // }
      // console.log(mouse[bird.size])
      // console.log(XEUtils.isNaN(111))
      // this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
<style scoped>
.a {
  width: 100vw;
  height: 100vh;
  min-width: 20px;
  min-height: 20px;
}
.b {
  width: 10px;
  height: 20%;
}
</style>