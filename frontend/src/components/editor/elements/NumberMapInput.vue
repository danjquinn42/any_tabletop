<template>
  <h3>{{ data.nodeData.getInput().label }}</h3>
  <div v-for="element of elementList" class="row-wrapper">
    <el-form-item class="row-element label" label="label">
      <el-input v-model="element[0]" @change="updateData"></el-input>
    </el-form-item>
    <el-form-item class="row-element value" label="value">
      <el-input-number
        v-model="element[1]"
        :controls="false"
        @change="updateData"
      ></el-input-number>
    </el-form-item>
  </div>
  <el-button-group class="add-remove">
    <el-button
      :disabled="elementList.length <= 1"
      size="small"
      @click="removeRow"
      type="danger"
      >Remove Row -</el-button
    >
    <el-button
      :disabled="elementList.length >= data.nodeData.options.maxRows"
      size="small"
      @click="addRow"
      type="primary"
      >Add Row +</el-button
    >
  </el-button-group>
</template>

<script>
import {
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElText,
  ElButton,
  ElButtonGroup,
} from "element-plus";
import { reactive } from "vue";
import { merge, toPairs } from "lodash";
import { ATKeyValuePairs } from "../types/ATKeyValuePairs";
import { ATNodeData } from "../types/ATNodeData";

export default {
  name: "NumberMapInput",
  components: {
    ElButton,
    ElButtonGroup,
    ElText,
    ElInputNumber,
    ElInput,
    ElFormItem,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATKeyValuePairs(), new ATKeyValuePairs(), {maxRow: 10});
      },
    },
    updateOutputValue: { type: Function },
    rowCount: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const elementList = reactive(toPairs(props.data.nodeData.getOutputValue()));
    while (props.rowCount > elementList.length) {
      elementList.push(["", NaN]);
    }
    return { elementList };
  },
  methods: {
    updateData() {
      this.data.nodeData.setOutputValue(merge({}, ...this.elementList));
    },
    addRow() {
      this.elementList.push(["", NaN]);
    },
    removeRow() {
      this.elementList.pop();
    },
  },
};
</script>

<style scoped>
/*.row-wrapper {*/
/*  display: grid;*/
/*  flex-wrap: wrap;*/
/*  !*flex-grow: 1;*!*/
/*}*/

.row-wrapper {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap onto the next line if necessary */
  gap: 1rem; /* Add spacing between the elements */
}

.row-wrapper {
  flex: 1 1 45%; /* Elements take full width by default */
}

.row-wrapper .label,
.row-wrapper .value {
  /*width: 45%;*/
  flex: 1 1 45%; /* Attempt to take up half of the container */
  min-width: 5rem; /* Minimum width for each element */
}

.row-wrapper {
  gap: 0.5rem; /* Ensure a consistent gap between elements */
}

.row-wrapper .row-element {
  box-sizing: border-box; /* Include padding/border in the element's width/height */
}

.add-remove {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  margin-bottom: 0.5rem;
}

/*.label {*/
/*  width: 55%;*/
/*  !*min-width: 3rem;*!*/
/*  flex-grow: 1;*/
/*}*/

/*.value {*/
/*  width: 40%;*/
/*  !*min-width: 1rem;*!*/
/*  flex-grow: 1;*/
/*  !*padding-left: 1rem;*!*/
/*}*/
</style>
