<template>
  <igt-feature>
    <div id="canvas-stack" class="w-full relative"
         :style="'height:' + stackHeight + 'px;'">
      <canvas id="world-canvas" class="border-2 pixelated absolute"
              style="z-index: 1"
              :class="{'cursor-pointer': showPointer}"></canvas>
      <canvas id="player-canvas" class="pixelated absolute" style="z-index:2"
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
      currentStep: 0,
      isWalking: false,
      worldPanZoom: null,
      playerPanZoom: null,
      stackHeight: this.updateStackHeight(),
    }
  },
  computed: {
    showPointer() {
      return this.tiledWrapper && this.tiledWrapper.isHoveringOverClickBox;
    }
  },
  methods: {
    updateStackHeight() {
      this.stackHeight = window.innerHeight - 200;
    }
  },
  mounted() {
    window.onresize = () => {
      this.updateStackHeight();
    }
    this.updateStackHeight();

    this.tiledWrapper = new TiledWrapper(
        worldMap,
        document.getElementById('world-canvas'),
        document.getElementById('player-canvas'),
        () => {
          this.tiledWrapper.render();
        },
        () => {
          this.isWalking = true;
        }
    )

    const panZoomOptions = {
      disableZoom: false,
      minScale: 0.8,
      maxScale: 5,
      contain: 'outside',
      canvas: true,
    };
    this.worldPanZoom = Panzoom(this.tiledWrapper.canvas, panZoomOptions)
    this.playerPanZoom = Panzoom(this.tiledWrapper.playerCanvas, panZoomOptions)
    this.tiledWrapper.canvas.parentElement.addEventListener('wheel', this.worldPanZoom.zoomWithWheel)
    this.tiledWrapper.canvas.parentElement.addEventListener('wheel', () => {
      this.tiledWrapper.currentScale = this.worldPanZoom.getScale();
    })
    this.tiledWrapper.playerCanvas.parentElement.addEventListener('wheel', this.playerPanZoom.zoomWithWheel)

    this.worldPanZoom.zoom(1);

    setInterval(() => {
      if (this.isWalking) {
        const position = this.tiledWrapper.paths[0].getWorldPosition(this.currentStep)
        this.tiledWrapper.renderPlayer(position.x, position.y);
        this.currentStep += 0.05
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
