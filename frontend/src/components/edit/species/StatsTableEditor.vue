<template>
  <h3>{{ template.label }}</h3>
  <el-descriptions v-for="k in templateKeys" :column="1" border>
    <el-descriptions-item
      label-align="right"
      width="150px"
      class="table-item"
      :label="configFor(k).label"
    >
      <el-form-item class="stat-item" label-width="auto">
        <!--  Number Input   -->
        <el-input-number
          v-if="configFor(k).input.type === 'number'"
          class="inputbox"
          :min="configFor(k).input.min"
          :max="configFor(k).input.max"
          v-model="stats[k].value"
          :type="configFor(k).input.type"
          :controls="true"
          controls-position="right"
          placeholder="5-100"
          size="small"
          :step="configFor(k).input.step"
          :step-strictly="true"
          >$</el-input-number
        >

        <!--  Standard Input   -->
        <el-input
          v-if="configFor(k).input.type === 'input'"
          class="inputbox"
          :maxlength="configFor(k).input.limit"
          v-model="stats[k].value"
          :type="configFor(k).input.type"
          size="small"
        ></el-input>

        <!--  Select    -->
        <el-select
          v-if="configFor(k).input.type === 'select'"
          v-model="stats[k].value"
          placeholder="Select"
          :allow-create="configFor(k).input.allowOther"
          filterable
          :multiple="configFor(k).input.multiSelect"
        >
          <el-option
            v-for="option in configFor(k).input.options"
            :key="option"
            :value="option"
          ></el-option>
        </el-select>

        <el-text v-if="configFor(k).input.postfix" class="postfix">ft</el-text>
      </el-form-item>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import {
  ElDescriptions,
  ElOption,
  ElSelect,
  ElInputNumber,
  ElDescriptionsItem,
  ElFormItem,
  ElInput,
  ElText,
} from "element-plus";
import { keys } from "lodash";

import { StatsTableTemplate } from "../../../util/serverDataMocks";

export default {
  name: "StatsTableEditor",
  components: {
    ElOption,
    ElSelect,
    ElInputNumber,
    ElText,
    ElInput,
    ElFormItem,
    ElDescriptionsItem,
    ElDescriptions,
  },
  props: {
    stats: {
      type: Object,
    },
    template: {
      type: StatsTableTemplate,
    },
  },
  data: function () {
    return {
      templateKeys: this.getTemplateKeys(),
    };
  },
  methods: {
    getTemplateKeys() {
      return keys(this.template.list);
    },
    configFor(keyOfInput) {
      return this.template.list[keyOfInput];
    },
  },
};
</script>
<style scoped>
.stat-item {
  margin: 0;
}

.stat-item > * {
  display: flex;
  flex-flow: nowrap;
}

.postfix {
  margin: 0 8px;
}
</style>
