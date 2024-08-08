import { isNil } from "lodash";
import { ref, watch, onUnmounted } from "vue";
import { useVueFlow } from "@vue-flow/core";

let id = 0;

/**
 * @returns {string} - A unique id.
 */
function getId() {
  return `dndnode_${id++}`;
}

export default function useDragAndDrop() {
  const draggedType = ref(null);
  const isDragOver = ref(false);
  const isDragging = ref(false);

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } =
    useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? "none" : "";
  });

  function onDragStart(event, type) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("application/vueflow", type);
      event.dataTransfer.effectAllowed = "move";
    }

    draggedType.value = type;
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

    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: { id: nodeId },
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
