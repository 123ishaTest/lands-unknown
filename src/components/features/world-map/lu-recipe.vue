<template>
  <span>
    <span v-if="hasInput">
    <span :key="itemAmount.id" v-for="itemAmount in input">
      {{ itemAmount.amount }} {{ itemAmount.id }}
    </span>
    -->
      </span>
        <span :key="itemAmount.id" v-for="itemAmount in output">
      {{ itemAmount.amount }} {{ itemAmount.id }}
    </span>
  </span>
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
    }
  },


}
</script>

<style scoped>
</style>
