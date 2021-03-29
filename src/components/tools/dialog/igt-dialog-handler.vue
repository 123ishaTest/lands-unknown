<template>
  <div class="w-1/2 h-48 border-2 p-4 z-30 bg-gray-500 bg-opacity-50 shadow-xl text-white">
    <div v-if="hasHandler">

      <div v-if="isDialog">
        <p>{{ dialogText.speaker }}: {{ dialogText.text }}</p>
        <button class="btn btn-green" @click="next">Next</button>
      </div>
      <div v-else-if="isDecision">
        <p>{{ decisionDescription.speaker }}: {{ decisionDescription.text }}</p>
        <ol>
          <li v-for="(option, index) of decisionOptions" :key="option.label">
            <button class="btn btn-green" @click="selectOption(index)" :disabled="!option.canAccess()">
              <span v-if="!option.canAccess()"> <s> {{ option.label }}</s></span>
              <span v-else> {{ option.label }}</span>
            </button>
          </li>
        </ol>
      </div>
    </div>
    <div v-else>
      Start talking
    </div>
    <br>

  </div>
</template>

<script>
import {DialogHandler} from "@/ig-template/tools/dialog/DialogHandler";
import {DialogType} from "@/ig-template/tools/dialog/DialogType";
import {Npc} from "@/ig-template/features/npcs/Npc";

export default {
  name: "igt-dialog-handler",
  data() {
    return {
      handler: new DialogHandler(),
    }
  },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
  methods: {
    next() {
      this.handler.next();
    },
    selectOption(index) {
      this.handler.selectOption(index);
    }
  },
  computed: {
    hasHandler() {
      return this.handler != null;
    },
    dialogText() {
      if (!this.isDialog) {
        return "";
      }
      return this.handler.dialog.getDialogText();
    },
    decisionDescription() {
      return this.isDecision ? this.handler.decision.description : "";
    },
    decisionOptions() {
      if (!this.isDecision) {
        return [];
      }
      return this.handler.decision.options;
    },
    isDecision() {
      return this.handler.type === DialogType.Decision;
    },
    isDialog() {
      return this.handler.type === DialogType.Dialog;
    }
  },
  mounted() {
    this.handler.start(this.npc.dialog);

  }
}
</script>

<style scoped>
</style>
