<template>
  <div class="p-4 w-full bg-orange-400 border-2 flex flex-col">
    <p class="text-lg font-semibold text-center">{{ quest.name }}</p>
    <p>I've heard rumors that the lumberjack could use some help...</p>
    <p v-if="progress >= QuestStepId.Intro">I should talk to the King</p>
    <p v-if="progress > QuestStepId.AskPermissionFromKing" class="line-through">I have talked to the king</p>
  </div>


</template>

<script>
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";

export default {
  name: "lu-questlog-lumberjack",
  props: {
    quest: {
      type: LumberjackQuest,
      required: true,
    },
  },
  data() {
    return {
      QuestStepId: QuestStepId
    }
  },
  computed: {
    progress() {
      return this.quest.currentStep?.id ?? -1;
    },
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
