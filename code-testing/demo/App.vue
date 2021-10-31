<template>
  <div class="demo-app-wrap">
    <DemoBase />
    <DemoAction />
    <DemoSort />
    <DemoPaging />
    <DemoAll />
    <TestTable :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import { TestTable } from '../src/table'
import DemoAction from './DemoAction.vue'
import DemoBase from './DemoBase.vue'
import DemoSort from './DemoSort.vue'
import DemoPaging from './DemoPaging.vue'
import DemoAll from './DemoAll.vue'

const columns = [
  {
    field: 'name',
    title: '名字',
  }, {
    field: 'age',
    title: '年龄',
  }, {
    field: 'city',
    title: '城市',
  }, {
    field: 'height',
    title: '身高',
  },
]
</script>

<style>
  .demo-app-wrap {
    padding: 32px;
  }
</style>
