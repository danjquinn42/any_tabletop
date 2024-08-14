import { debounce, find } from "lodash";
import { defineStore } from "pinia";
import { ATNodeData } from "../components/editor/types/ATNodeData";
import { create, all } from "mathjs";

const math = create(all);
export const useGraphStore = defineStore("graphs", {
  state: () => ({
    graphs: {
      onlyGraph: {
        name: "only one graph right now",
        id: "onlyGraph",
        nodes: [],
        edges: [],
        layout: {
          editGrid: [],
          viewGrid: [],
        },
      },
    },
  }),
  actions: {
    logGraphs() {
      console.log("all graphs in graphstore", this.graphs);
    },
    storeLocally: debounce((debouncedGraph) => {
      let graphJSON = JSON.stringify(debouncedGraph);
      const kb = (graphJSON.length / 512).toFixed(2);
      console.log(`graph size: ${kb}KB`);
      localStorage.setItem("graph", graphJSON);
    }, 100),
    storeLayoutLocally: debounce(function () {
      const layout = JSON.stringify(this.graphs.onlyGraph.layout);
      const kb = (layout.length / 512).toFixed(2);
      console.log(`layout size: ${kb}KB`);
      localStorage.setItem("layout", layout);
    }, 100),
    loadLocally() {
      const graph = JSON.parse(localStorage.getItem("graph"));
      const layout = JSON.parse(localStorage.getItem("layout"));
      if (graph) {
        graph.nodes = graph.nodes.map((n) => {
          n.data.nodeData = ATNodeData.fromNodeData(n.data.nodeData);
          if (n.data.formula) {
            n.data.nodeData.setAfterUpdateInput(() => {
              const expr = n.data.formula.replace(
                /x/g,
                n.data.nodeData.getInputValue(),
              );
              n.data.nodeData.setOutputValue(math.evaluate(expr));
            });
          }
          return n;
        });
        if (layout) {
          console.log("Layout from storage", layout);
          graph.layout = layout;
        } else {
          graph.layout = { editGrid: [], viewGrid: [] };
        }
        this.graphs.onlyGraph = graph;
      }
    },
    getLocalNode(graphId, nodeId) {
      return find(this.graphs[graphId].nodes, (n) => n.id === nodeId);
    },
  },
});
