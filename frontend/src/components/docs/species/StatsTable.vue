<template>
  <h3>{{ template.label }}</h3>
  <el-descriptions v-for="k in Object.keys(stats)" :column="1" border>
    <el-descriptions-item
      v-if="stats[k] && template.list[k]"
      label-align="right"
      width="130px"
      class="table-item"
      :label="stats[k].label"
    >
      {{ formatStat(stats[k], template.list[k]) }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import { ElDescriptions, ElDescriptionsItem } from "element-plus";
import { StatsTableTemplate } from "../../../util/serverDataMocks";

export default {
  name: "StatsTable",
  components: { ElDescriptionsItem, ElDescriptions },
  props: {
    stats: {
      type: Object,
    },
    template: {
      type: StatsTableTemplate,
    },
  },
  methods: {
    formatStat(stat, statTemplate) {
      let displayString = stat.value || "";
      if (statTemplate.type === "list") {
        displayString = stat.value.join(", ");
      }

      return `${statTemplate.prefix || ""}${displayString}${statTemplate.postfix || ""}`;
    },
  },
};
</script>
<style scoped></style>
