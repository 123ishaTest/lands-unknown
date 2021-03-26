<template>
  <div class="w-56 h-56 border-2 p-4 z-50 bg-gray-500 bg-opacity-50 shadow-xl text-white">
    <div v-if="location != null" class="flex flex-col justify-between">
      <p>{{location.displayName}}</p>
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

  methods: {
    travel() {
      this.$emit('travel', this.location.identifier);
    }
  },

}
</script>

<style scoped>
</style>
