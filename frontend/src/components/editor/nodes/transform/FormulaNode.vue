<template>
  <NodeWrapper
    :id="id"
    :data="data"
    :output-count="1"
    :input-count="1"
    v-slot="slotProps"
    header="Apply Formula"
    anonymous
  >
    <el-form-item label="x =">
      <el-input
        v-model="data.nodeData.options.formula"
        @input="
          updateFormula(
            slotProps.updateOutputValue,
            data.nodeData.options.formula,
          )
        "
      ></el-input>
    </el-form-item>
  </NodeWrapper>
</template>

<script>
import { useVueFlow } from "@vue-flow/core";
import { ElFormItem, ElInput } from "element-plus";
import { NODE_DATA_DEFAULT } from "../../../../util/constants";
import NodeWrapper from "../NodeWrapper.vue";
import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "FormulaNode",
  components: { ElInput, ElFormItem, NodeWrapper },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({
        nodeData: NODE_DATA_DEFAULT.applyFormula,
      }),
    },
  },
  setup(props) {
    const { findNode, updateNodeData } = useVueFlow();
    function evaluateExpression(updateCallback, formula = "") {
      const expr = formula.replace(/x/g, this.data.nodeData.getInputValue());
      try {
        const result = math.evaluate(expr);
        updateCallback(result);
        updateNodeData(props.id, { formula });
      } catch (error) {
        updateCallback(NaN);
      }
    }

    function setUpdateInputCallback(callback) {
      const thisNode = findNode(props.id);
      thisNode.data.nodeData.afterUpdateInput = callback;
      callback();
    }

    return { evaluateExpression, setUpdateInputCallback };
  },
  methods: {
    updateFormula(updateCallback, formula) {
      this.setUpdateInputCallback(() =>
        this.evaluateExpression(updateCallback, formula),
      );
    },
  },
};
</script>

<style scoped></style>
