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
      path: [],
      currentStep: 0,
      isWalking: false,
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
          this.tiledWrapper.renderPlayer(this.path[this.currentStep][0], this.path[this.currentStep][1])

        },
        () => {
          this.isWalking = true;
        }
    )

    this.path = [
      [17, 11],
      [17, 12],
      [17, 13],
      [17, 14],
      [18, 14],
      [19, 14],
      [20, 14],
      [20, 15],
      [21, 15],
      [21, 16],
      [22, 16],
      [23, 16],
      [23, 17],
      [23, 18],
      [24, 18],
      [25, 18],
      [25, 17],
      [26, 17],
      [27, 17],
    ]


    setInterval(() => {
      if (this.isWalking) {
        this.tiledWrapper.renderPlayer(this.path[this.currentStep][0], this.path[this.currentStep][1])
        this.currentStep = Math.min(this.currentStep + 1, this.path.length - 1);
      }
    }, 500)
  }
}
</script>

<style scoped>

</style>
