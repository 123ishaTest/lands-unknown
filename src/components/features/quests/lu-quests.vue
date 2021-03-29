<template>
  <igt-feature>
    Quests go here
    <lu-quest-preview :quest="quest" v-for="quest in quests.list" :key="quest.id"></lu-quest-preview>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import LuQuestPreview from "@/components/features/quests/lu-quest-preview";

export default {
  name: "lu-quests",
  components: {LuQuestPreview, IgtFeature},
  data() {
    return {
      quests: App.game.features.quests,
    }
  },
}
</script>

<style scoped>
</style>
