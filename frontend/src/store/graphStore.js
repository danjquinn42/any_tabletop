import { defineStore } from "pinia";
export const useGraphStore = defineStore("graphs", {
  state: () => ({
    graphs: {
      onlyGraph: {
        name: "only one graph right now",
        id: "onlyGraph",
        nodes: [],
        edges: [],
      },
    },
  }),
  actions: {
    logGraphs() {
      console.log("graphs in graphStore", this.graphs);
    },
  },
});
