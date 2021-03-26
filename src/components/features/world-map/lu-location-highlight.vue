<template>
  <div class="w-64 h-64 border-2 p-4 z-50 bg-gray-500 bg-opacity-50 shadow-xl text-white">
    <div v-if="location != null" class="flex flex-col justify-between">
      <p>{{ location.displayName }}</p>

      <div v-if="hasActions" class="flex flex-row items-center justify-between">
        <p class="pr-4">Repeat</p>
        <input type="number" class="input-primary w-full" v-model="selectedRepeat"/>
      </div>
      <div :key="action.description" v-for="action in actions" class="flex flex-row flex-wrap">
        <button class="btn btn-blue" @click="performAction(action)">{{ action.description }}</button>
      </div>

      <button class="btn btn-blue" @click="travel">Travel</button>
    </div>
  </div>
</template>

<script>
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";

export default {
  name: "lu-location-highlight",
  props: {
    location: {
      type: WorldLocation,
      default: null
    },
  },
  data() {
    return {
      selectedRepeat: 0
    };
  },
  computed: {
    hasActions() {
      return this.location.possibleActions.length > 0;
    },
    actions() {
      return this.location.possibleActions;
    }
  },
  methods: {
    performAction(action) {
      this.$emit('action', action, this.selectedRepeat, this.location.identifier);
      this.selectedRepeat = 0;
    },
    travel() {
      this.$emit('travel', this.location.identifier);
    }
  },

}
</script>

<style scoped>
</style>
