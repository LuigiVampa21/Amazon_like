<template>
<div>
  <h1>{{ name }}</h1>
  <button @click="onClick()"></button>
</div>
</template>

<script>
export default({
  data() {
    return {
      name:'About'
    }
  },
  methods: {
    onClick(){
      alert(this.name)
    }
  }
})
</script>

