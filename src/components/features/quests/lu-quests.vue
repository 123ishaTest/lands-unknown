<template>
  <igt-feature>
    <lu-quest-preview :quest="quest" v-for="quest in quests.list" :key="quest.id"></lu-quest-preview>
    <lu-questlog-lumberjack :quest="lumberjack"></lu-questlog-lumberjack>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import LuQuestPreview from "@/components/features/quests/lu-quest-preview";
import LuQuestlogLumberjack from "@/components/features/quests/logs/lu-questlog-lumberjack";
import {QuestId} from "@/lands-unknown/quests/QuestId";

export default {
  name: "lu-quests",
  components: {LuQuestlogLumberjack, LuQuestPreview, IgtFeature},
  data() {
    return {
      quests: App.game.features.quests,
    }
  },
  computed: {
    lumberjack() {
      return this.quests.getQuest(QuestId.Lumberjack);
    }
  },
  mounted() {
    this.quests.onQuestCompleted.subscribe(quest => {
      this.$notify(
          {
            title: `Quest completed!`,
            text: quest.name,
            type: "success",
            group: "top-left",
          },
          6000
      );
    })
  }
}
</script>

<style scoped>
</style>
