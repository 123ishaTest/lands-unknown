<template>
  <div class="p-4 w-full bg-orange-400 border-2 flex flex-col">
    <p class="text-lg font-semibold text-center mb-2">{{ quest.name }}</p>
    <hr class="mb-2">
    <div class="flex flex-col text-center">
      <p :class="{'line-through': quest.isStarted}">I've heard rumors that the lumberjack could use some help...</p>
      <p v-if="progress === QuestStepId.AskPermissionFromKing">I should talk to the King to ask for permission to chop in the forest</p>
      <p v-if="progress > QuestStepId.AskPermissionFromKing" class="line-through">I have talked to the king and gotten
        permission to chop wood</p>
      <p v-if="progress === QuestStepId.BackToLumberjack">I'm sure the Lumberjack will be glad to hear this news.</p>
      <p v-if="progress === QuestStepId.GatherWood">I can Chop Wood by clicking the button near the Lumberjack</p>
      <p v-if="progress === QuestStepId.GatherWood">I have chopped {{gatheringProgress}} Wood</p>
      <p v-if="progress > QuestStepId.GatherWood" class="line-through">I have successfully chopped 25 wood, and I'm not
        even exhausted.</p>
      <p v-if="progress === QuestStepId.WoodGathered">I should probably let the Lumberjack know...</p>
      <p v-if="progress === QuestStepId.GetBoatTicketFromKing">The Lumberjack mentioned the King could give me a
        reward...</p>
      <p v-if="quest.isCompleted">I have completed the quest and gotten a Boat Ticket from the King. All is well</p>
    </div>


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
    gatheringProgress() {
      return this.quest.steps.find(quest => {
        return quest.id === QuestStepId.GatherWood
      }).getProgress();
    },
    progress() {
      if (this.quest.isCompleted) {
        return Infinity;
      }
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
