<template>
  <div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Lands Unknown">

      <igt-sidebar-category name="Features"></igt-sidebar-category>

      <igt-tab name="World Map" :selected="true">
        <lu-world-map></lu-world-map>
      </igt-tab>

      <igt-tab name="Quests">
        <lu-quests></lu-quests>
      </igt-tab>

      <igt-tab name="Skills">
        <igt-skills></igt-skills>
      </igt-tab>

      <igt-tab name="Inventory">
        <igt-inventory></igt-inventory>
      </igt-tab>

      <igt-tab name="Key Items">
        <igt-key-items></igt-key-items>
      </igt-tab>

      <igt-tab name="Achievements">
        <igt-achievements :achievements-feature="game.features.achievements"></igt-achievements>
      </igt-tab>


      <igt-tab name="Settings">
        <igt-settings></igt-settings>
      </igt-tab>

      <igt-sidebar-category name="Other"></igt-sidebar-category>

      <igt-tab name="Developer Panel" v-if="showDevPanel">
        <igt-developer-panel></igt-developer-panel>
      </igt-tab>

      <igt-sidebar-category name="Socials"></igt-sidebar-category>
      <igt-sidebar-external-link name="Discord" link="https://discord.gg/WUYDqct2Ef"
                                 image="socials/discord.png"></igt-sidebar-external-link>
      <igt-sidebar-external-link name="GitHub" link="https://github.com/123ishaTest/lands-unknown"
                                 image="socials/github.png"></igt-sidebar-external-link>
    </igt-sidebar>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtSidebar from "@/components/util/sidebar/igt-sidebar-layout";
import IgtTab from "@/components/util/igt-tab";
import IgtAchievements from "@/components/features/achievements/igt-achievements";
import IgtNotifications from "@/components/util/igt-notifications";
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";
import IgtInventory from "@/components/features/inventory/igt-inventory";
import LuWorldMap from "@/components/features/world-map/lu-world-map";
import IgtSkills from "@/components/features/skills/lu-skills";
import IgtKeyItems from "@/components/features/key-items/igt-key-items";
import LuQuests from "@/components/features/quests/lu-quests";

export default {
  components: {
    LuQuests,
    IgtKeyItems,
    IgtSkills,
    LuWorldMap,
    IgtInventory,
    IgtSettings,
    IgtSidebarExternalLink,
    IgtSidebarCategory, IgtDeveloperPanel, IgtNotifications, IgtAchievements, IgtTab, IgtSidebar
  },
  data() {
    return {
      game: App.game
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return App.game.features.settings.darkMode.value;
    }
  },
}
</script>

<style>
</style>
