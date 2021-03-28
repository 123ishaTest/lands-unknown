<template>
  <igt-feature>
    <div class="flex flex-row flex-wrap">
      <igt-key-item :key="item.id" v-for="item in items" :item="item"></igt-key-item>
    </div>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import IgtKeyItem from "@/components/features/key-items/igt-key-item";

export default {
  name: "igt-key-items",
  components: {IgtKeyItem, IgtFeature},
  data() {
    return {
      keyItems: App.game.features.keyItems,
    }
  },
  computed: {
    items() {
      return this.keyItems.list;
    }
  },
  mounted() {
    this.keyItems.onKeyItemGain.subscribe((keyItem) => {
      this.$notify(
          {
            title: `Key Item get: ${keyItem.name}`,
            text: keyItem.description,
            type: "success",
            group: "top-left",
          },
          4000
      );
    })
  }
}
</script>

<style scoped>
</style>
