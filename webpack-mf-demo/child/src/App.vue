<template>
  <div style="color: green">
    <h2>child APP</h2>
    <div>数字：{{ counter }}</div>
    <button @click="__onBtnAddClick()">加</button>
    <button @click="__onBtnMinusClick()">减</button>
  </div>
</template>

<script>
export default {
    name: "App",
    data () {
      return {
        counter: 0
      };
    },
    methods: {
      __onBtnAddClick () {
        this.counter++;
      },
      __onBtnMinusClick () {
        this.counter--;
      }
    }
}
</script>
