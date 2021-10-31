<template>
  <div>
    <h1>grandfather APP</h1>
    <Father />
  </div>
</template>

<script>
export default {
    name: "App",

    components: {
      Father: () => import('sxf_father_app/App')
    },

    data () {
      return {};
    }
}
</script>
