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
        v-model="data.formula"
        @input="updateFormula(slotProps.updateOutputValue, data.formula)"
      ></el-input>
    </el-form-item>
  </NodeWrapper>
</template>

<script>
import { useVueFlow } from "@vue-flow/core";
import { ElFormItem, ElInput } from "element-plus";
import { ATNodeData } from "../../types/ATNodeData";
import { ATNumberData } from "../../types/ATNumberData";
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
        nodeData: new ATNodeData(new ATNumberData(), new ATNumberData()),
        formula: "x",
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
