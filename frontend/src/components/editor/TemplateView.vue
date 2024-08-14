<template>
  <el-container>
    <el-aside class="aside">
      <div class="empty-padder"></div>
      <el-scrollbar class="scrollbar" always height="100vh">
        <!-- Draggable Components -->
        <div
          v-for="(node, index) in nodeMap"
          :key="node.id"
          class="draggable-element"
          draggable="true"
          @dragstart="dragStart(node, index)"
          :id="node.id"
        >
          <component
            v-if="templateTypes[node.type]"
            :is="templateTypes[node.type]"
            :data="node.data"
            :id="node.id"
            class="comp"
          ></component>
        </div>
      </el-scrollbar>
    </el-aside>

    <el-main>
      <el-card
        v-if="modelView === 'form'"
        body-class="at-card-body"
        @dragover.prevent
        @drop="(e) => onDrop(e, 'editGrid')"
      >
        <grid-layout
          class="grid-layout"
          ref="editGrid"
          :layout.sync="graphStore.graphs.onlyGraph.layout.editGrid"
          :colNum="colCount"
          :rowHeight="rowHeight"
          :isDraggable="true"
          :isResizable="true"
          :use-css-transforms="true"
        >
          <grid-item
            class="layout-item"
            v-for="item in graphStore.graphs.onlyGraph.layout.editGrid"
            :static="item.static"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
          >
            <el-icon
              @click="removeComponent(item, 'editGrid')"
              class="trash-icon"
              :size="15"
              ><Delete
            /></el-icon>
            <component
              v-if="templateTypes[nodeMap[item.i]?.type]"
              :is="templateTypes[nodeMap[item.i].type]"
              v-bind="{
                id: item.i,
                data: nodeMap[item.i].data,
                type: nodeMap[item.i].type,
              }"
              class="comp"
            ></component>
          </grid-item>
        </grid-layout>
      </el-card>

      <!--      <el-card-->
      <!--        v-if="modelView === 'display'"-->
      <!--        body-class="at-card-body"-->
      <!--        @dragover.prevent-->
      <!--        @drop="(e) => onDrop(e, 'viewGrid')"-->
      <!--      >-->
      <!--        <grid-layout-->
      <!--          class="grid-layout"-->
      <!--          ref="viewGrid"-->
      <!--          :layout.sync="graphStore.graphs.onlyGraph.layout.viewGrid"-->
      <!--          :col-number="colCount"-->
      <!--          :row-height="60"-->
      <!--          :is-draggable="true"-->
      <!--          :is-resizable="true"-->
      <!--          :use-css-transforms="true"-->
      <!--        >-->
      <!--          <grid-item-->
      <!--            class="layout-item"-->
      <!--            v-for="item in graphStore.graphs.onlyGraph.layout.viewGrid"-->
      <!--            :static="item.static"-->
      <!--            :x="item.x"-->
      <!--            :y="item.y"-->
      <!--            :w="item.w"-->
      <!--            :h="item.h"-->
      <!--            :i="item.i"-->
      <!--            :key="item.i"-->
      <!--          >-->
      <!--            <el-icon-->
      <!--              @click="removeComponent(item, 'viewGrid')"-->
      <!--              class="trash-icon"-->
      <!--              :size="15"-->
      <!--              ><Delete-->
      <!--            /></el-icon>-->
      <!--            <component-->
      <!--              v-if="templateTypes[nodeMap[item.i]?.type]"-->
      <!--              :is="templateTypes[nodeMap[item.i].type]"-->
      <!--              v-bind="{-->
      <!--                id: item.i,-->
      <!--                data: nodeMap[item.i].data,-->
      <!--                type: nodeMap[item.i].type,-->
      <!--              }"-->
      <!--              class="comp"-->
      <!--            ></component>-->
      <!--          </grid-item>-->
      <!--        </grid-layout>-->
      <!--      </el-card>-->

      <div class="empty-padder"></div>
    </el-main>
  </el-container>
</template>

<script>
import { Delete } from "@element-plus/icons-vue";
import {
  ElAside,
  ElCard,
  ElContainer,
  ElMain,
  ElScrollbar,
  ElIcon,
  ElNotification,
} from "element-plus";
import { find, remove } from "lodash";
import { GridItem, GridLayout } from "vue3-grid-layout";
import { reactive } from "vue";
import { useGraphStore } from "../../store/graphStore";
export default {
  name: "TemplateView",
  components: {
    ElIcon,
    Delete,
    ElScrollbar,
    ElCard,
    ElAside,
    ElMain,
    ElContainer,
    GridItem,
    GridLayout,
  },
  props: {
    templateTypes: Object,
    modelView: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const graphStore = useGraphStore();
    return { graphStore };
  },
  mounted() {
    this.graphStore.graphs.onlyGraph.nodes.forEach((node) => {
      if (this.templateTypes[node.type]) {
        this.nodeMap[node.id] = node;
      }
    });
    console.log("NODE MAP", this.nodeMap);
  },
  data() {
    return {
      nodeMap: {},
      colCount: 12,
      rowHeight: 32,
      draggingNode: null,
      draggingIndex: null,
    };
  },
  methods: {
    dragStart(node, index) {
      this.draggingNode = node;
      this.draggingIndex = index;
    },
    onDrop(event, targetGrid) {
      console.log("DROPPED", event);

      const renderedElement = document.getElementById(this.draggingNode.id);
      console.log(renderedElement);
      const elementHeight = renderedElement
        ? renderedElement.offsetHeight
        : 256;
      const elementWidth = renderedElement ? renderedElement.offsetWidth : 256;

      const grid = this.$refs[targetGrid].$el;
      const layout = this.graphStore.graphs.onlyGraph.layout;
      const gridRect = grid.getBoundingClientRect();

      const offsetX = event.clientX - gridRect.left;
      const offsetY = event.clientY - gridRect.top;

      const col = Math.floor((offsetX / gridRect.width) * this.colCount);
      const row = Math.floor((offsetY / gridRect.height) * this.colCount);

      const isNodeInTargetGrid = find(
        layout[targetGrid],
        (item) => item.i === this.draggingNode?.id,
      );

      if (this.draggingNode && this.templateTypes[this.draggingNode.type]) {
        isNodeInTargetGrid
          ? this.notifyComponentHasBeenAdded()
          : layout[targetGrid].push({
              x: col,
              y: row,
              w: 3,
              h: Math.ceil(elementHeight / this.rowHeight),
              minH: Math.ceil(elementHeight / this.rowHeight),
              i: `${this.draggingNode.id}`,
              static: false,
            });
      }

      this.draggingNode = null;
      this.draggingIndex = null;
      this.graphStore.storeLayoutLocally();
    },
    notifyComponentHasBeenAdded() {
      ElNotification({
        title: "Component already in use",
        message:
          "The component you copied is already present in the template and cannot be placed twice",
        duration: 3000,
      });
    },
    removeComponent(item, targetGrid) {
      remove(
        this.graphStore.graphs.onlyGraph.layout[targetGrid],
        (comp) => comp.i === item.i,
      );
      this.graphStore.storeLayoutLocally();
    },
  },
};
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

.at-card-body {
  padding: 0;
}
</style>

<style scoped>
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
  min-height: 30px;
  background-color: var(--el-bg-color);
  border: 2px dotted var(--el-border-color);
}

.comp {
  min-height: 24px;
  padding: 0.4rem 1rem 0.4rem 0.4rem;
}

.draggable-element {
  margin-bottom: 10px;
  padding: 10px;
  /*background: #fdd;*/
  border: 1px solid #ddd;
  cursor: grab;
}

.trash-icon {
  z-index: 100;
  position: absolute;
  display: block;
  right: 0;
  color: var(--el-color-danger);
}

.trash-icon:hover {
  cursor: pointer;
}
</style>
