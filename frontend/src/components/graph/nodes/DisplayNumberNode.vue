<template>
  <div class="display-number-node-wrapper">
    <!-- Top handle -->
    <Handle
        class="custom-handle target"
        :id="'displayNumber' + id"
        :position="Position.Top"
        :connectable="true"
        type="target"
    ></Handle>

    <!-- Display content -->
    <div class="display-number-node">
      {{ number }}
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import {Handle, Position} from "@vue-flow/core";

export default {
  name: 'DisplayNumberNode',
  components: {Handle},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
      default: {
        id: "",
        number: 0,
      }
    }
  },
  computed: {
    Position() {
      return Position
    },
  },
  setup(props) {
    const number = ref(props.data.number);

    watch(() => props.data.number, (newNumber) => {
      number.value = newNumber;
    });
    watch(() => props.data, (newData) => {
      number.value = newData.number;
    }, { deep: true });

    return { Position, number };
  }
};
</script>

<style scoped>
.display-number-node-wrapper {
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.display-number-node {
  text-align: center;
}

.custom-handle {
  /*position: absolute;*/
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: crosshair;
}

</style>
