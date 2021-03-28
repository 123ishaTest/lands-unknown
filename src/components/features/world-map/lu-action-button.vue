<template>
  <button class="btn-small btn-blue has-tooltip cursor-pointer"
          :key="action.description"
          @click="performAction(action)"
          :disabled="!action.canSchedule()"
          :title="action.requirement.hint">
    {{ action.description }}<br>
    <lu-recipe v-if="isRecipeAction" :input="action.input" :output=action.output></lu-recipe>
  </button>
</template>

<script>
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import LuRecipe from "@/components/features/world-map/lu-recipe";
import {RecipeAction} from "@/ig-template/tools/actions/RecipeAction";

export default {
  name: "lu-action-button",
  components: {LuRecipe},
  props: {
    action: {
      type: AbstractAction,
      required: true,
    }
  },
  computed: {
    isRecipeAction() {
      return this.action instanceof RecipeAction;
    }
  },
  methods: {
    performAction() {
      this.$emit('performAction', this.action)
    }
  },

}
</script>

<style scoped>
</style>
