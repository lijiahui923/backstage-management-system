const Mock = require('mockjs')

const data = Mock.mock({
  'items|25': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const { currentPage, pages } = config.query
      const dataList = data.items
      var [index, size, total] = [currentPage, pages, dataList.length]
      var len = total / size
      var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
      var newDataList = dataList.slice((index - 1) * size, (index) * size)
      return {
        code: 20000,
        data: {
          'pageIndex': index,
          'pageSize': size,
          'rows': newDataList,
          'total': total,
          'totalPages': totalPages
        }
      }
    }
  }
]

