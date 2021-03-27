<template>
  <div class="btn-small btn-blue has-tooltip cursor-pointer"
       :key="action.description"
       @click="performAction(action)"
       :disabled="!action.canPerform()"
       :title="action.requirement.hint">
    {{ action.description }}
  </div>
</template>

<script>
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";

export default {
  name: "lu-action-button",
  props: {
    action: {
      type: AbstractAction,
      required: true,
    }
  },

  methods: {
    performAction() {
      this.$emit('performAction', this.action)
    }
  },

}
</script>

<style scoped>
</style>
