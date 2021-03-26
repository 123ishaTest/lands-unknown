<template>
  <div class="flex flex-col w-1/4 pl-4">
    Action queue
    <hr>
    <div :key="action.description + '-' + index" v-for="(action, index) in adventurer.actionQueue">
      <lu-action :action="action" :index="index" :isActive="index === 0"
                 @cancel="cancelAction"></lu-action>
      <hr>
    </div>
  </div>
</template>

<script>

import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import LuAction from "@/components/features/adventurer/lu-action";

export default {
  name: "lu-action-queue",
  components: {LuAction},
  props: {
    adventurer: {
      type: Adventurer,
      required: true
    },
  },
  computed: {
    actionQueue() {
      return this.adventurer.actionQueue;
    }
  },
  methods: {
    cancelAction(index) {
      this.adventurer.cancelAction(index);
    }
  },
}
</script>

<style scoped>

</style>
