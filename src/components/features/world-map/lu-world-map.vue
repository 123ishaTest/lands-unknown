<template>
  <igt-feature>
    <span>Location: {{ worldMap.playerLocation }} End: {{ adventurer.getPlayerLocationAtEndOfQueue() }}</span>

    <div class="flex flex-row">
      <lu-location-highlight
          @travel="travel"
          @action="performAction"
          class="absolute" :location="highlightedLocation">

      </lu-location-highlight>

      <div id="canvas-stack" class="w-full relative"
           :style="'height:' + stackHeight + 'px;'">
        <canvas id="world-canvas" class="pixelated absolute z-10"
                :class="{'cursor-pointer': showPointer}">
        </canvas>
        <canvas id="player-canvas" class="pixelated absolute z-20"
                :class="{'cursor-pointer': showPointer}"></canvas>
      </div>

      <lu-action-queue class="flex-init" :adventurer="adventurer"></lu-action-queue>
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
import LuActionQueue from "@/components/features/adventurer/lu-action-queue";
import LuLocationHighlight from "@/components/features/world-map/lu-location-highlight";

export default {
  name: "lu-world-map",
  components: {LuLocationHighlight, LuActionQueue, IgtFeature},

  data() {
    return {
      highlightedLocation: null,
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
      return this.worldMap.getCurrentLocation();
    },
    showPointer() {
      return this.tiledWrapper && this.tiledWrapper.isHoveringOverClickBox;
    }
  },
  methods: {
    travel(identifier) {
      this.worldMap.moveToLocation(identifier);
    },
    performAction(action, repeat, location) {
      if (!this.adventurer.getPlayerLocationAtEndOfQueue().equals(location)) {
        this.travel(location);
      }
      this.adventurer.addAction(action, repeat);
    },
    showHighlight(identifier) {
      const location = this.worldMap.getLocation(identifier)
      this.highlightedLocation = location;
      console.log(location);
    },
    updateStackHeight() {
      this.stackHeight = window.innerHeight - 200;
    }
  },
  watch: {
    currentLocation(newLocation) {
      this.tiledWrapper.renderPlayer(newLocation.worldPosition.x, newLocation.worldPosition.y, this.worldMap.roads, new Array(this.worldMap.roads.length).fill(false));
    },
    playerPosition(newPosition) {
      // TODO refresh less often
      if (newPosition.x === 0 && newPosition.y === 0) {
        return;
      }

      const queue = this.adventurer.actionQueue;
      const roads = this.worldMap.roads
      let shouldRender = false;
      const isPlanned = this.worldMap.roads.map(road => {
        const action = queue.find(action => {
          if (action instanceof TravelAction) {
            if (action.isFinished) {
              return false;
            }
            if (action.road.identifier.equals(road.identifier)) {
              shouldRender = true;
              return true;
            }
          }
          return false
        })
        return action != null;
      })
      if (shouldRender) {
        this.tiledWrapper.renderPlayer(newPosition.x, newPosition.y, roads, isPlanned);
      }
    }

  },
  mounted() {
    window.onresize = () => {
      this.updateStackHeight();
    }
    this.updateStackHeight();

    const worldCanvas = document.getElementById('world-canvas');
    const playerCanvas = document.getElementById('player-canvas');

    if (!worldCanvas || !playerCanvas) {
      console.warn("Could not load canvases");
      return;
    }

    this.tiledWrapper = new TiledWrapper(
        worldMap,
        worldCanvas,
        playerCanvas,
        () => {
          this.tiledWrapper.render();
          this.tiledWrapper.renderPlayer(this.currentLocation.worldPosition.x, this.currentLocation.worldPosition.y, this.worldMap.roads, new Array(this.worldMap.roads.length).fill(false));
        },
        (clickBox) => {
          const townId = clickBox.properties[0].value;
          this.showHighlight(new TownLocationIdentifier(townId));
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
