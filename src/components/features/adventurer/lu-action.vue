<template>
  <div>
    <div class="flex flex-col">
      <div class="flex flex-row items-center justify-between">
        <span class="fa text-center" :class="action.icon"></span>
        <span class="text-xs p-2">{{ action.description }}
              <span v-if="action.repeat > 0">({{ action.repeat }})</span>
        </span>
        <span class="fa fa-times text-red-400 cursor-pointer" @click="cancel"></span>

      </div>
      <igt-progress-bar v-if="isActive" :percentage="action.getProgress().getPercentage()"></igt-progress-bar>
    </div>
  </div>
</template>

<script>
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import IgtProgressBar from "@/components/util/igt-progress-bar";

export default {
  name: "lu-action",
  components: {IgtProgressBar},
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    action: {
      type: AbstractAction,
      required: true
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel', this.index)
    }
  },

}
</script>

<style scoped>
</style>
