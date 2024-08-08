<template>
  <NodeWrapper
      :id="id"
      :data="data"
      :output-count="1"
      :input-count="1"
      v-slot="slotProps"
  >
      <el-form-item label="x=">
        <el-input
            v-model="formula"
            @input="updateFormula(slotProps.updateOutputValue, formula)"
        ></el-input>
      </el-form-item>
  </NodeWrapper>
</template>

<script>
import {useVueFlow} from "@vue-flow/core";
import {ElFormItem, ElInput} from "element-plus";
import NodeWrapper from "./NodeWrapper.vue";
import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "FormulaNode",
  components: {ElInput, ElFormItem, NodeWrapper},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNumberData(), new ATNumberData())
      },
    },
  },
  data: function () {
    return {
      formula: "x",
    }
  },
  setup(props) {
    const { findNode } = useVueFlow();
    function evaluateExpression(updateCallback, formula = "") {
      const expr = formula.replace(/x/g, this.data.nodeData.getInputValue());
      try {
        const result = math.evaluate(expr);
        updateCallback(result);
      } catch (error) {
        // console.error("error evaluating formula ", error);
        updateCallback(NaN);
      }
    }

    function setUpdateInputCallback(callback) {
      const thisNode = findNode(props.id);
      thisNode.data.nodeData.afterUpdateInput = callback;
      callback();
    }

    return { evaluateExpression, setUpdateInputCallback }
  },
  methods: {
    updateFormula(updateCallback, formula) {
      this.setUpdateInputCallback(() => this.evaluateExpression(updateCallback, formula));
    }
  }
}
</script>

<style scoped>

</style>