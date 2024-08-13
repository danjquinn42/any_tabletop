<template>
  <path
    :d="pathData"
    stroke="black"
    stroke-width="2"
    fill="none"
    @click="onClick"
  />
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    data: Object,
    sourcePosition: Object,
    targetPosition: Object,
  },
  setup(props) {
    const pathData = computed(() => {
      // Compute the path data for the edge
      const { sourcePosition, targetPosition } = props;
      return `M${sourcePosition.x},${sourcePosition.y} L${targetPosition.x},${targetPosition.y}`;
    });

    const onClick = () => {
      // Handle click event to edit or show edge details
      console.log("Edge clicked:", props.data);
    };

    return { pathData, onClick };
  },
});
</script>
