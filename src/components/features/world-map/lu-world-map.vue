<template>
  <igt-feature>
    <div class="flex flex-row relative">
      <lu-location-highlight
          :cannot-travel-reason="cannotTravelReason"
          :can-travel="canTravelToHighLight"
          :npcs="highlightedNpcs"
          @talk="talk"
          @travel="travel"
          @action="performAction"
          class="absolute" :location="highlightedLocation">

      </lu-location-highlight>

      <igt-dialog-handler ref="dialogHandler" class="absolute bottom-0"></igt-dialog-handler>

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
import {TravelType} from "@/ig-template/features/world-map/roads/TravelType";
import IgtDialogHandler from "@/components/tools/dialog/igt-dialog-handler";

export default {
  name: "lu-world-map",
  components: {IgtDialogHandler, LuLocationHighlight, LuActionQueue, IgtFeature},

  data() {
    return {
      showPlannedRoadsSetting: App.game.features.settings.showPlannedRoads,
      cannotTravelReason: "",
      canTravelToHighLight: false,
      highlightedLocation: null,
      highlightedNpcs: [],
      npcs: App.game.features.npcs,
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
    talk(npc) {
      if (!this.worldMap.playerLocation.equals(this.highlightedLocation.identifier)) {
        this.travel(this.highlightedLocation.identifier);
        return;
      }
      this.$refs.dialogHandler.talk(npc);
    },
    performAction(action, repeat, location) {
      if (!this.adventurer.getPlayerLocationAtEndOfQueue().equals(location)) {
        this.travel(location);
      }
      this.adventurer.addAction(action, repeat);
    },
    showHighlight(identifier) {
      this.highlightedLocation = this.worldMap.getLocation(identifier)
      this.highlightedNpcs = this.highlightedLocation.npcs.map(id => {
        return this.npcs.getNpc(id)
      })
      this.canTravelToHighLight = this.worldMap.areConnected(this.adventurer.getPlayerLocationAtEndOfQueue(), identifier)
      this.cannotTravelReason = this.worldMap.getCannotTravelReason(this.adventurer.getPlayerLocationAtEndOfQueue(), identifier)
    },
    updateStackHeight() {
      this.stackHeight = window.innerHeight - 200;
    }
  },
  watch: {
    currentLocation(newLocation) {
      this.tiledWrapper.renderPlayer(newLocation.worldPosition.x, newLocation.worldPosition.y);
    },
    playerPosition(newPosition) {
      // TODO refresh less often
      if (newPosition.x === 0 && newPosition.y === 0) {
        return;
      }

      const queue = this.adventurer.actionQueue;
      let shouldRender = false;

      const plannedRoads = []
      queue.forEach(action => {
        if (!(action instanceof TravelAction) || action.isFinished) {
          return;
        }
        shouldRender = true;
        if (this.showPlannedRoadsSetting.value) {
          plannedRoads.push(action.getRemainingPoints());
        }
      });

      if (shouldRender) {
        const travelType = this.firstActionIsTravel ? (queue[0].road.travelType) : TravelType.Walk;
        this.tiledWrapper.renderPlayer(newPosition.x, newPosition.y, plannedRoads, travelType);
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
          this.tiledWrapper.renderPlayer(this.currentLocation.worldPosition.x, this.currentLocation.worldPosition.y);
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
