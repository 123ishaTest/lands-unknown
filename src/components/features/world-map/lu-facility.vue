<template>
  <div>
    <p>{{ facilityType }}</p>
    <hr>
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

  </div>

</template>

<script>
import LuActionButton from "@/components/features/world-map/lu-action-button";

export default {
  name: "lu-facility",
  components: {LuActionButton},
  props: {
    facilityType: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      required: true,
    }
  },

  methods: {
    performAction(action) {
      this.$emit('performAction', action)
    }
  },

}
</script>

<style scoped>
</style>
