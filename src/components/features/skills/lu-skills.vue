<template>
  <igt-feature>
    Skills
    <hr>
    <div class="m-2 p-2" :key="skill.id" v-for="skill in skills.skills">
      {{ skill.name }}
      <igt-exp-level :exp-level="skill"></igt-exp-level>
    </div>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level";

export default {
  name: "igt-skills",
  components: {IgtExpLevel, IgtFeature},
  data() {
    return {
      skills: App.game.features.skills,
    }
  },

}
</script>

<style scoped>
</style>
