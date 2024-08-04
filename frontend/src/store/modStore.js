import { isEmpty } from "lodash";
import { defineStore } from "pinia";
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
  },
});
