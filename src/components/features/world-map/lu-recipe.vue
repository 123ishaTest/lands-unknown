<template>
  <div>
      <span :key="itemAmount.id" v-for="itemAmount in input">
        {{ itemAmount.amount }} {{ itemAmount.id }}
      </span>
    <span v-if="hasInput && hasOutput">--></span>
    <span :key="itemAmount.id" v-for="itemAmount in output">
      {{ itemAmount.amount }} {{ itemAmount.id }}
    </span>
  </div>
</template>

<script>

export default {
  name: "lu-recipe",
  props: {
    input: {
      type: Array,
      required: true,
    },
    output: {
      type: Array,
      required: true,
    }
  },

  computed: {
    hasInput() {
      return this.input.length > 0;
    },
    hasOutput() {
      return this.output.length > 0;
    }
  },


}
</script>

<style scoped>
</style>
