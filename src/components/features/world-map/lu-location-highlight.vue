<template>
  <div class="w-64 h-96 border-2 p-4 z-30 bg-gray-500 bg-opacity-50 shadow-xl text-white">
    <div v-if="location != null" class="flex flex-col h-full justify-between">
      <p class="text-center">{{ location.displayName }}</p>

      <div v-if="hasActions" class="flex flex-row items-center">
        <p class="pr-4"><span class="fa fa-times"></span></p>
        <input type="number" min="1" class="input-primary w-full" v-model="selectedAmount"/>
      </div>
      <div class="flex flex-row flex-wrap">
        <template v-for="action in actions">

          <lu-action-button
              :key="action.description"
              @performAction="performAction"
              :action="action"
          >
          </lu-action-button>
        </template>
      </div>


      <div :key="facility[0]" v-for="facility in facilities">
        <lu-facility @performAction="performAction" :facility-type="facility[0]" :actions="facility[1]"></lu-facility>
      </div>

      <div v-if="hasNpcs">
        <div>Npcs</div>
        <hr>
        <div class="flex flex-row flex-wrap">
          <button class="btn btn-blue" v-for="npc in npcs" :key="npc.id"
                  @click="talk(npc)">
            {{ npc.name }}
          </button>
        </div>
      </div>

      <div class="mt-auto">
        <button class="btn btn-green w-full" @click="travel" :disabled="!canTravel" :title="cannotTravelReason">
          <span class="fa fa-route"></span>
          Travel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import LuActionButton from "@/components/features/world-map/lu-action-button";
import LuFacility from "@/components/features/world-map/lu-facility";

export default {
  name: "lu-location-highlight",
  components: {LuActionButton, LuFacility},
  props: {
    npcs: {
      type: Array,
      requires: true,
    },
    cannotTravelReason: {
      type: String,
      required: true,
    },
    canTravel: {
      type: Boolean,
      required: true,
    },
    location: {
      type: WorldLocation,
      default: null
    },
  },
  data() {
    return {
      selectedAmount: 1,
      amountOptions: [1, 10, 100, Infinity]
    };
  },
  computed: {
    facilities() {
      return Object.entries(this.location.facilities);
    },
    hasActions() {
      return this.actions.length > 0 || this.facilities.length > 0;
    },
    hasNpcs() {
      return this.npcs.length > 0;
    },
    actions() {
      return this.location.possibleActions.filter(action => {
        return action.canSee();
      });
    }
  },
  methods: {
    performAction(action) {
      this.$emit('action', action, this.selectedAmount, this.location.identifier);
      this.selectedAmount = 1;
    },
    travel() {
      this.$emit('travel', this.location.identifier);
    },
    talk(npc) {
      this.$emit('talk', npc);
    }
  },

}
</script>

<style scoped>
</style>
