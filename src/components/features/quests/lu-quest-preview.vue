<template>
  <div class="p-4 border-2 no-select" :class="color">
    <p class="text-gray-800">{{ quest.name }}</p>
  </div>


</template>

<script>
import {AbstractQuest} from "@/lands-unknown/quests/AbstractQuest";
import {QuestStatus} from "@/lands-unknown/quests/QuestStatus";

export default {
  name: "lu-quest-preview",
  props: {
    quest: {
      type: AbstractQuest,
      required: true,
    },
  },
  computed: {
    color() {
      switch (this.status) {
        case QuestStatus.NotStarted:
          return 'bg-red-500 hover:bg-red-400';
        case QuestStatus.Started:
          return 'bg-yellow-500 hover:bg-yellow-400';
        case QuestStatus.Finished:
          return 'bg-green-500 hover:bg-green-400';
        default:
          return 'bg-gray-500 hover:bg-gray-400';
      }
    },
    status() {
      return this.quest.status;
    }
  },
}
</script>

<style scoped>
</style>
