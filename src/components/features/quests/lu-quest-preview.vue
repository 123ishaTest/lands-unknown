<template>
  <div class="w-full h-48 bg-gray-400 border-2 flex flex-col">
    <p>{{quest.id}}</p>
    <p>{{quest.description}}</p>
    <p>Status: {{status}}</p>
    <button class="btn btn-green" @click="startQuest">Start</button>
  </div>


</template>

<script>
import {Quest} from "@/lands-unknown/quests/Quest";

export default {
  name: "lu-quest-preview",
  props: {
    quest: {
      type: Quest,
      required:true,
    },
  },
  computed: {
    status() {
      return this.quest.status;
    }
  },
  methods: {
    startQuest() {
      this.quest.start();
    }
  },
}
</script>

<style scoped>
</style>
