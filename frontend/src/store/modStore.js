import { isEmpty } from "lodash";
import { defineStore } from "pinia";
import { createStatsConfigComponent } from "../api/component";
import { getInitialState } from "../api/init";

export const useModStore = defineStore("mods", {
  state: () => ({
    isLoaded: false,
    root: {},
    mods: {},
    games: {},
    components: {},
    stats: {},
  }),
  actions: {
    async init() {
      this.isLoaded = false;
      const initialState = await getInitialState();
      if (!isEmpty(initialState)) {
        this.root = initialState.root;
        this.mods = initialState.mods;
        this.games = initialState.games;
        this.components = initialState.components;
        this.stats = initialState.stats;
      }
      this.isLoaded = true;
    },
    async updateComponent(component) {
      if (component.id === "new") {
        const result = await createStatsConfigComponent(
          component,
          this.root.entryModId,
        );
        const config = result.config;
        const stats = result.stats;
        this.components[config.id] = config;
        stats.forEach((s) => (this.stats[s.id] = s));
      } else {
        throw new Error("Component update has not been implemented");
      }
    },
  },
});
