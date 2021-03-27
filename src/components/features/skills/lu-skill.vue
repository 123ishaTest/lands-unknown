<template>
  <div>

    <div class="relative pt-1">
      <div class="flex justify-between">
        <p>{{ skill.name }}. {{ skill.getLevel() }} / {{ skill.maxLevel }}</p>
        <p>{{ progress.actual | numberFormat }} / {{ progress.target  | numberFormat }}</p>
      </div>
      <igt-progress-bar :percentage="progressPercentage"
                        :fg-class="skill.fgColor"
                        bg-class="bg-gray-300"
      >
      </igt-progress-bar>

    </div>
  </div>
</template>

<script>
import IgtProgressBar from "@/components/util/igt-progress-bar";
import {Skill} from "@/lands-unknown/features/skills/Skill";

export default {
  name: "lu-skill",
  components: {IgtProgressBar},
  props: {
    skill: {
      type: Skill,
      required: true,
    },
  },
  computed: {
    progress() {
      return this.skill.getLevelProgress();
    },
    progressPercentage() {
      return this.progress.getPercentage();
    }
  },

}
</script>

<style scoped>

</style>
