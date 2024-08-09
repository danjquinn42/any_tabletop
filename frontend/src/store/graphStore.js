import { defineStore } from "pinia";
import { ATNodeData } from "../components/graph/types/ATNodeData";
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
      console.log("all graphs in graphstore", this.graphs);
    },
    storeLocally(graph) {
      // search "TODO remove local storage"
      let graphJSON = JSON.stringify(graph);
      console.log("graph size: ", graph.length);
      localStorage.setItem("graph", graphJSON);
    },
    loadLocally() {
      const graph = JSON.parse(localStorage.getItem("graph"));
      if (graph) {
        graph.nodes = graph.nodes.map((n) => {
          n.data.nodeData = ATNodeData.fromNodeData(n.data.nodeData);
          return n;
        });
        this.graphs.onlyGraph = graph;
      }
    },
  },
});
