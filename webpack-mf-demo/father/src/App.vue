<template>
  <div style="color: blue">
    <h2>father APP</h2>
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
