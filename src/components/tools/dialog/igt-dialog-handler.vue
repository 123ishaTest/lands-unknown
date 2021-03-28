<template>
  <div>
    <div v-if="hasHandler">

      <div v-if="isDialog">
        <p>{{ dialogText.speaker }}: {{ dialogText.text }}</p>
        <button class="btn btn-green" @click="next">Next</button>
      </div>
      <div v-else-if="isDecision">
        <p>{{decisionDescription.speaker}}: {{decisionDescription.text}}</p>
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
    <button class="btn btn-blue" @click="talk">Talk to the Wise Old Woman</button>

  </div>
</template>

<script>
import {DialogHandler} from "@/ig-template/tools/dialog/DialogHandler";
import {WiseOldWoman} from "@/ig-template/features/npcs/WiseOldWoman";
import {DialogType} from "@/ig-template/tools/dialog/DialogType";

export default {
  name: "igt-dialog-handler",
  data() {
    return {
      handler: new DialogHandler(),
    }
  },
  methods: {
    talk() {
      const wiseOldWoman = new WiseOldWoman()
      this.handler.start(wiseOldWoman.dialog);
    },
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
  }
}
</script>

<style scoped>
</style>
