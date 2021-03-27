<template>
  <igt-feature>
    Skills
    <hr>
    <div class="flex flex-col">
      <div class="m-2 p-2" :key="skill.id" v-for="skill in skills.skills">
        <lu-skill :skill="skill"></lu-skill>
      </div>
    </div>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import LuSkill from "@/components/features/skills/lu-skill";

export default {
  name: "igt-skills",
  components: {LuSkill, IgtFeature},
  data() {
    return {
      skills: App.game.features.skills,
    }
  },

  mounted() {
    this.skills.skills.forEach(skill => {
      skill.onLevelUp.subscribe(skill => {
        this.$notify(
            {
              title: `${skill.name} Level up`,
              text: `You are now level ${skill.getLevel()}`,
              type: "success",
              group: "top-left",
            },
            4000
        );
      });
    });
  }
}
</script>

<style scoped>
</style>
