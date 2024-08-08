<template>
  <div class="input-number-node">
    <el-form>
      <el-form-item label="Label">
        <el-input v-model="label"></el-input>
      </el-form-item>
      <el-form-item label="Character Level">
        <el-input-number
            v-model="number"
            @change="updateNumber"
            :controls="false"
        />
      </el-form-item>
    </el-form>

    <Handle
        class="custom-handle source"
        :id="'inputNumber' + id"
        :position="Position.Bottom"
        :connectable="true"
        type="source"
    >n</Handle>
  </div>
</template>

<script>
import { useVueFlow, Handle, Position } from "@vue-flow/core";
import { ElForm, ElFormItem, ElInputNumber, ElInput } from "element-plus";
import { ref, watch } from 'vue';

export default {
  name: 'InputNumberNode',
  computed: {
    Position() {
      return Position;
    }
  },
  components: { ElInput, ElForm, ElFormItem, ElInputNumber, Handle },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
      default: {
        number: 0,
        children: [],
      }
    },
  },
  setup(props) {
    const { updateNodeData } = useVueFlow();
    const number = ref(props.data.number);

    if (!props.data.children) {
      props.data.children = [];
    }

    function updateNumber(newNumber) {
      number.value = newNumber;
      updateNodeData(props.id, { number: newNumber });
      props.data.children.forEach(c => updateNodeData(c, { number: newNumber }));
    }

    watch(() => props.data.number, (newNumber) => {
      number.value = newNumber;
    });

    return {
      number,
      updateNumber,
      updateNodeData,
    };
  },
  data() {
    return {
      number: this.data.number || 0,
      label: this.data.label || "",
    };
  },
};
</script>


<style scoped>
.input-number-node {
  padding: 10px;
  border: 2px solid var(--el-border-color);
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;
}

.custom-handle {
  /*position: absolute;*/
  width: 16px;
  height: 16px;
  color: black;
  font-size: small;
  text-align: center;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: crosshair;
}

</style>
