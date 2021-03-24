<template>
  <igt-feature>
    I'm a world-map
    <canvas id="world-canvas" width="2000" height="2000" class="border-2"
            :class="{'cursor-pointer': showPointer}"></canvas>
    <div v-html="renderedCanvas"></div>
  </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import {TiledWrapper} from "@/ig-template/tools/tiled/TiledWrapper";
import worldMap from '@/assets/tiled/maps/overworld.json'

export default {
  name: "lu-world-map",
  components: {IgtFeature},

  data() {
    return {
      tiledWrapper: null,
      renderedCanvas: {},
    }
  },
  computed: {
    showPointer() {
      return this.tiledWrapper && this.tiledWrapper.isHoveringOverClickBox;
    }
  },
  mounted() {
    this.tiledWrapper = new TiledWrapper(
        worldMap,
        document.getElementById('world-canvas'),
        () => {
          this.tiledWrapper.render();
        }
    )
  }
}
</script>

<style scoped>

</style>
