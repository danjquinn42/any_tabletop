import { isNil } from "lodash";
import { ref, watch, onUnmounted, reactive } from "vue";
import { useVueFlow } from "@vue-flow/core";
import { ATNilData } from "./types/ATNilData";
import { ATNodeData } from "./types/ATNodeData";
import { v4 as uuidv4 } from "uuid";

let count = 0;

/**
 * @returns {string} - A unique id.
 */
function getId(nodeType) {
  // the UUID is not needed for global collisions,
  // this is only for if the page refreshes during editing.
  // requires 7.50e5 nodes with same 'nodeType' and 'count' values to have a 0.1% chance of collision
  return `${nodeType}_${uuidv4().slice(0, 8)}_${count++}`;
}

export default function useDragAndDrop() {
  const draggedType = ref(null);
  const isDragOver = ref(false);
  const isDragging = ref(false);
  const draggedData = ref(new ATNodeData(new ATNilData(), new ATNilData()));

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } =
    useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? "none" : "";
  });

  function onDragStart(event, type, data) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("application/vueflow", type);
      event.dataTransfer.effectAllowed = "move";
    }

    draggedType.value = type;
    draggedData.value = data;
    isDragging.value = true;

    document.addEventListener("drop", onDrop);
    document.addEventListener("dragend", onDragEnd);
  }

  function onDragOver(event) {
    event.preventDefault();

    if (draggedType.value) {
      isDragOver.value = true;
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false;
  }

  function onDragEnd() {
    isDragging.value = false;
    isDragOver.value = false;
    draggedType.value = null;
    document.removeEventListener("drop", onDrop);
    document.removeEventListener("dragend", onDragEnd);
  }

  function onDrop(event) {
    if (isNil(draggedType.value)) return;
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    });

    const nodeId = getId(draggedType.value);

    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: reactive({ nodeData: draggedData.value }),
    };

    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }));

      off();
    });

    addNodes(newNode);
    onDragEnd();
  }

  onUnmounted(() => {
    document.removeEventListener("drop", onDrop);
    document.removeEventListener("dragend", onDragEnd);
  });

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  };
}
