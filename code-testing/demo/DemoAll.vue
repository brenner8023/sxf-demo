<template>
  <div style="margin: 40px 20px;">
    同时有分页,排序,自定义渲染列
    <TestTable
      :data="data"
      :columns="columns"
      :options="options"
      :plugin="plugin"
      @paging-change="onPagingChange"
    >
      <template #action="{ record }">
        <button @click="onClick(record)">
          编辑
        </button>
      </template>
    </TestTable>
  </div>
</template>

<script lang="ts" setup>
import { TestTable } from '../src/table'
import { ref } from '@vue/composition-api'

const data = ref<Record<string, string | number>[]>([])

const res: Record<string, string | number>[] = []
for(let i = 1; i < 100; i++) {
  const item = {
    id: i,
    name: 'yy' + i,
    age: Math.floor(Math.random() * 40) + 10,
    height: Math.floor(Math.random() * 30) + 160,
    city: 'beijing' + i,
  }
  res.push(item)
}
data.value = res.slice(0, 5)

const columns = ref([
  {
    field: 'name',
    title: '名字',
  }, {
    field: 'age',
    title: '年龄',
    sortFn: (prevRecord, currRecord) => {
      return prevRecord.age - currRecord.age
    },
  }, {
    field: 'city',
    title: '城市',
  }, {
    field: 'height',
    title: '身高',
    sortFn: (prevRecord, currRecord) => {
      return prevRecord.height - currRecord.height
    },
  }, {
    field: 'action',
    title: '操作',
  },
])

const options = {
  height: '400px',
}

const plugin = {
  paging: {
    pageSize: [5, 6],
    total: 99,
  },
}

const onPagingChange = ({ pageStart, pageLimit }: Record<string, number>) => {
  console.log(pageStart, pageLimit)

  data.value = res.slice(pageStart - 1, pageStart - 1 + pageLimit)
}
</script>
