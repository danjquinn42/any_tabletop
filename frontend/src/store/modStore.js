import { defineStore } from "pinia";

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
      // work goes here
      this.isLoaded = true;
    },
  },
});
