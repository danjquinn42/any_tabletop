<template>
  <div class="template-wrapper">
    <slot :updateOutputValue="updateOutputValue"></slot>
  </div>
</template>

<script>
import { useGraphStore } from "../../../store/graphStore";

export default {
  name: "TemplateCompWrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const graphStore = useGraphStore();
    function updateInputValue(nodeId, inputValue) {
      const node = graphStore.getLocalNode('onlyGraph', nodeId);
      let nodeData = node.data.nodeData;
      nodeData.setInputValue(inputValue);
      nodeData.forEachChild(childId => updateInputValue(childId, nodeData.getOutputValue()));
    }
    function updateOutputValue(outputValue) {
      const nodeData = props.data.nodeData;
      nodeData.setOutputValue(outputValue);
      nodeData.forEachChild(childId => {
        updateInputValue(childId, outputValue);
      })
    }

    return { updateOutputValue }
  }
}
</script>

<style scoped>

</style>