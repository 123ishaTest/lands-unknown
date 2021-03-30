<template>
  <div v-if="inConversation" class="w-1/2 h-48 border-2 p-4 z-30 bg-gray-500 bg-opacity-50 shadow-xl text-white">


    <div v-if="isDialog" class="flex flex-col items-center justify-between h-full">
      <p class="font-semibold">{{ dialogText ? dialogText.speaker: 'null' }}
      <p>
      <p class="flex-grow text-center">{{ dialogText ? dialogText.text : 'null' }}</p>
      <button class="btn btn-green" @click="next">Next</button>
    </div>
    <div v-else-if="isDecision" class="flex flex-col items-center justify-between">
      <p class="font-semibold">{{ decisionDescription.speaker }}
      <p>
      <p>{{ decisionDescription.text }}</p>
      <ol>
        <li v-for="(option, index) of decisionOptions" :key="option.label">
          <button class="btn btn-green w-full" @click="selectOption(index)" :disabled="!option.canAccess()">
            <span v-if="!option.canAccess()"> <s> {{ option.label }}</s></span>
            <span v-else> {{ option.label }}</span>
          </button>
        </li>
      </ol>
    </div>

  </div>
</template>

<script>
import {DialogHandler} from "@/ig-template/tools/dialog/DialogHandler";
import {DialogType} from "@/ig-template/tools/dialog/DialogType";

export default {
  name: "igt-dialog-handler",
  data() {
    return {
      handler: new DialogHandler(),
      npc: null
    }
  },
  props: {},
  methods: {
    talk(npc) {
      this.npc = npc;
      this.handler.start(this.npc.dialog);
    },
    clear() {
      this.handler.end()
    },
    next() {
      this.handler.next();
    },
    selectOption(index) {
      this.handler.selectOption(index);
    }
  },
  computed: {
    inConversation() {
      return this.handler != null && (this.handler.dialog != null || this.handler.decision != null);
    },
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
}
</script>

<style scoped>
</style>
