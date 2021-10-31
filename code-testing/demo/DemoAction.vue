<template>
  <div style="margin: 40px 20px;">
    支持自定义渲染列
    <TestTable
      :data="data"
      :columns="columns"
      :options="options"
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
for(let i = 1; i < 6; i++) {
  const item = {
    id: i,
    name: 'yy' + i,
    age: Math.floor(Math.random() * 40) + 10,
    height: Math.floor(Math.random() * 30) + 160,
    city: 'beijing' + i,
  }
  res.push(item)
}
data.value = res.slice(0)

const columns = ref([
  {
    field: 'name',
    title: '名字',
  }, {
    field: 'action',
    title: '操作',
  },
])

const options = {
  height: '400px',
}

const onClick = (record: unknown) => {
  console.log(record)
  console.log('点击编辑按钮')
}
</script>
