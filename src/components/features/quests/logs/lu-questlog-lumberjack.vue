<template>
  <div class="p-4 w-full bg-orange-400 border-2 flex flex-col">
    <p class="text-lg font-semibold text-center mb-2">{{ quest.name }}</p>
    <hr class="mb-2">
    <div class="flex flex-col text-center">
      <p :class="{'line-through': quest.isStarted}">I've heard rumors that the lumberjack could use some help...</p>
      <p v-if="progress === Step.AskPermissionFromKing">I should talk to the King to ask for permission to chop in the forest</p>
      <p v-if="progress > Step.AskPermissionFromKing" class="line-through">I have talked to the king and gotten
        permission to chop wood</p>
      <p v-if="progress === Step.BackToLumberjack">I'm sure the Lumberjack will be glad to hear this news.</p>
      <p v-if="progress === Step.GatherWood">I can Chop Wood by clicking the button near the Lumberjack</p>
      <p v-if="progress === Step.GatherWood">I have chopped {{gatheringProgress}} Wood</p>
      <p v-if="progress > Step.GatherWood" class="line-through">I have successfully chopped 25 wood, and I'm not
        even exhausted.</p>
      <p v-if="progress === Step.WoodGathered">I should probably let the Lumberjack know...</p>
      <p v-if="progress === Step.GetBoatTicketFromKing">The Lumberjack mentioned the King could give me a
        reward...</p>
      <p v-if="quest.isCompleted">I have completed the quest and gotten a Boat Ticket from the King. All is well</p>
    </div>


  </div>


</template>

<script>
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {LumberjackQuestStepId} from "@/lands-unknown/quests/lumberjack/LumberjackQuestStepId";

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
      Step: LumberjackQuestStepId,
    }
  },
  computed: {
    gatheringProgress() {
      return this.quest.steps.find(quest => {
        return quest.id === LumberjackQuestStepId.GatherWood
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
