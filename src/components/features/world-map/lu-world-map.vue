<template>
  <igt-feature>
    I'm a world-map
    <div class="overflow-hidden h-96 w-96">
      <canvas id="world-canvas" class="border-2 pixelated"
              :class="{'cursor-pointer': showPointer}"></canvas>
    </div>
  </igt-feature>
</template>

<script>
import IgtFeature from "@/components/util/igt-feature";
import {TiledWrapper} from "@/ig-template/tools/tiled/TiledWrapper";
import worldMap from '@/assets/tiled/maps/overworld.json'
import Panzoom from '@panzoom/panzoom'

export default {
  name: "lu-world-map",
  components: {IgtFeature},

  data() {
    return {
      tiledWrapper: null,
      path: [],
      currentStep: 0,
      isWalking: false,
      panzoom: null,
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

    this.panzoom = Panzoom(this.tiledWrapper.canvas, {
      // maxScale: 5,
      disableZoom: false,
      minScale: 0.20,
      maxScale: 5,
      contain: 'outside',
      canvas: true,
    })
    this.tiledWrapper.canvas.parentElement.addEventListener('wheel', this.panzoom.zoomWithWheel)

    this.panzoom.zoom(1);


    this.path = [
      [50 + 17, 50 + 11],
      [50 + 17, 50 + 12],
      [50 + 17, 50 + 13],
      [50 + 17, 50 + 14],
      [50 + 18, 50 + 14],
      [50 + 19, 50 + 14],
      [50 + 20, 50 + 14],
      [50 + 20, 50 + 15],
      [50 + 21, 50 + 15],
      [50 + 21, 50 + 16],
      [50 + 22, 50 + 16],
      [50 + 23, 50 + 16],
      [50 + 23, 50 + 17],
      [50 + 23, 50 + 18],
      [50 + 24, 50 + 18],
      [50 + 25, 50 + 18],
      [50 + 25, 50 + 17],
      [50 + 26, 50 + 17],
      [50 + 27, 50 + 17],
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
.pixelated {
  image-rendering: -moz-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
