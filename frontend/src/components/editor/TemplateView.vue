<template>
  <el-container>
    <el-aside class="aside">
      <div class="empty-padder"></div>
      <el-scrollbar class="scrollbar" always height="100vh">
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-card>
        <grid-layout
            class="grid-layout"
            :layout.sync="layout"
            :col-number="colCount"
            :row-height="48"
            :is-draggable="true"
            :is-resizable="true"
            :use-css-transforms="true"
        >
          <grid-item
              class="layout-item"
              v-for="item in layout"
              :static="item.static"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
          >
            <component v-if="item.component"
                       :is="item.component"
                       v-bind="item.props"
                       class="comp"
            ></component>
          </grid-item>
        </grid-layout>

      </el-card>
      <div class="empty-padder"></div>
      <el-card></el-card>
    </el-main>

  </el-container>
</template>

<script>
import {ElAside, ElCard, ElContainer, ElMain, ElScrollbar} from "element-plus";
import { reactive } from "vue";
import {GridItem, GridLayout} from "vue3-grid-layout"
import DisplayData from "./elements/DisplayData.vue";
import {useGraphStore} from "../../store/graphStore";

export default {
  name: "TemplateView",
  components: {ElScrollbar, ElCard, ElAside, ElMain, ElContainer, GridItem, GridLayout, DisplayData},
  props: {
    templateTypes: {},
  },
  setup() {
    const graphStore = useGraphStore();

    return {graphStore};
  },
  data() {
    return {
      layout: [],
      colCount: 6,
    };
  },
  mounted() {
    this.graphStore.graphs.onlyGraph.nodes.forEach((node, index) => {
      const width = 4;
      const height = 1;
      const row = index * width % this.colCount;
      const column = Math.floor(index / this.colCount * height);
      if (this.templateTypes[node.type]) {
        this.layout.push(
            {
              x: row,
              y: column,
              w: width,
              h: height,
              i: index,
              static: false,
              component: this.templateTypes[node.type],
              props: {
                id: node.id,
                data: reactive(node.data)
              }
            }
        );
      }
    })
  }
}
</script>

<style>
.vue-resizable-handle {
  width: 1rem !important;
  height: 1rem !important;
  background: none !important;
  box-sizing: border-box !important;
  border-right: 4px solid var(--el-border-color-dark);
  border-bottom: 4px solid var(--el-border-color-dark);
  border-top: 4px solid transparent;
  border-left: 4px solid transparent;
}

</style>


<style>

.aside {
  overflow: hidden;
  width: 16rem;
}

.scrollbar {
  padding-left: 0.5rem;
  overflow: hidden;
}

.empty-padder {
  height: 10vh;
}

.grid-layout {
  min-height: 30rem;
}

.layout-item {
  height: content-box;
  width: fit-content;
  min-height: 24px;
  background-color: var(--el-bg-color);
  border: 2px dotted var(--el-border-color);
}

.comp {
  min-height: 24px;
}

</style>