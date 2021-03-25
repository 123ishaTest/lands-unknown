<template>
  <igt-feature>
    <div class="flex flex-col">
      <div :key="action.description + '-' + index" v-for="(action, index) in adventurer.actionQueue">
        {{ action.description }}
        <igt-progress-bar v-if="index === 0" :percentage="action.getProgress().getPercentage()"></igt-progress-bar>
      </div>

    </div>
    <p>Location {{ currentLocation }}</p>
    <div id="canvas-stack" class="w-full relative"
         :style="'height:' + stackHeight + 'px;'">
      <canvas id="world-canvas" class="pixelated absolute"
              style="z-index: 1"
              :class="{'cursor-pointer': showPointer}"></canvas>
      <canvas id="player-canvas" class="pixelated absolute" style="z-index:2"
              :class="{'cursor-pointer': showPointer}"></canvas>
    </div>
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"

import IgtFeature from "@/components/util/igt-feature";
import {TiledWrapper} from "@/ig-template/tools/tiled/TiledWrapper";
import worldMap from '@/assets/tiled/maps/overworld.json'
import Panzoom from '@panzoom/panzoom'
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TravelAction} from "@/ig-template/features/world-map/TravelAction";
import IgtProgressBar from "@/components/util/igt-progress-bar";

export default {
  name: "lu-world-map",
  components: {IgtProgressBar, IgtFeature},

  data() {
    return {
      worldMap: App.game.features.worldMap,
      adventurer: App.game.features.adventurer,
      tiledWrapper: null,
      currentStep: 0,
      worldPanZoom: null,
      playerPanZoom: null,
      stackHeight: this.updateStackHeight(),
    }
  },
  computed: {
    playerPosition() {
      if (this.firstActionIsTravel) {
        return this.adventurer.actionQueue[0].getWorldPosition()
      }
      return {x: 0, y: 0};
    },
    firstActionIsTravel() {
      if (this.adventurer.actionQueue.length === 0) {
        return false;
      }
      return this.adventurer.actionQueue[0] instanceof TravelAction;
    },
    currentLocation() {
      return this.worldMap.playerLocation;
    },
    showPointer() {
      return this.tiledWrapper && this.tiledWrapper.isHoveringOverClickBox;
    }
  },
  methods: {
    updateStackHeight() {
      this.stackHeight = window.innerHeight - 300;
    }
  },
  watch: {
    playerPosition(newPosition) {
      // TODO refresh less often
      if (newPosition.x === 0 && newPosition.y === 0) {
        return;
      }
      const roads = this.worldMap.roads
      const queue = this.adventurer.actionQueue;
      const isPlanned = this.worldMap.roads.map(road => {
        const action = queue.find(action => {
          if (action instanceof TravelAction) {
            if (action.road.identifier.equals(road.identifier)) {
              return true;
            }
          }
          return false
        })
        return action != null;

      })
      this.tiledWrapper.renderPlayer(newPosition.x, newPosition.y, roads, isPlanned);
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
          this.tiledWrapper.renderPlayer(-1, -1, this.worldMap.roads, new Array(this.worldMap.roads.length).fill(false));
        },
        (clickBox) => {
          const townId = clickBox.properties[0].value;
          this.worldMap.moveToLocation(new TownLocationIdentifier(townId));
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
