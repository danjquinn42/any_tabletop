<template>
  <div class="container">
    <div v-for="stat in statsAsList()" class="stat-item-with-value">
      <h6 class="stat-name">{{ stat.label }}</h6>
      <div class="stat-value">
        <div class="stat-modifier">
          {{ evaluateFormula(derivedValueFormula, stat.value || 0) }}
        </div>
        <div v-if="!excludeStats" class="stat-score">{{ stat.value || 0 }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElDescriptions, ElDescriptionsItem, ElInput } from "element-plus";
import { map, round } from "lodash";
import { create, all } from "mathjs";

const math = create(all);

export default {
  name: "AbilityScoreModifiers",
  components: { ElInput, ElDescriptionsItem, ElDescriptions },
  props: {
    stats: {},
    displaySign: {
      type: Boolean,
      default: false,
    },
    excludeStats: {
      type: Boolean,
      default: false,
    },
    editLabels: {
      type: Boolean,
      default: false,
    },
    editValues: {
      type: Boolean,
      default: false,
    },
    roundDown: {
      type: Boolean,
      default: true,
    },
    derivedValueFormula: {
      type: String,
      default: "($value - 10) / 2",
    },
  },
  methods: {
    evaluateFormula(formula, stat) {
      try {
        const expr = formula.replace(/\$value/g, stat);
        const result = math.evaluate(expr);
        const finalResult = this.roundDown
          ? Math.floor(result)
          : round(result, 2);
        if (this.displaySign && finalResult >= 0) {
          return `+${finalResult}`;
        }
        return finalResult.toString();
      } catch (error) {
        console.error("Error evaluating formula:", error);
        return "Error";
      }
    },

    statsAsList() {
      return map(this.stats, (v) => v);
    },
  },
};
</script>
<style scoped>
.container {
  margin: 1rem auto;
  align-self: center;
  display: flex;
  min-width: 6.5rem;
}
.stat-item-with-value {
  display: flex;
  flex-flow: wrap;
  border: 1px solid var(--el-border-color);
  min-width: 6rem;
}

.stat-name {
  /*display: block;*/
  margin: 0;
  text-align: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--el-border-color);
  background: var(--el-fill-color-light);
  width: 100%;
}

.stat-value {
  text-align: center;
  border-top: none;
  width: 100%;
}

.stat-modifier {
  display: block;
  font-size: 2rem;
  margin: 0.5rem auto;
}

.stat-score {
  border: solid var(--el-border-color) 1px;
  background: var(--el-bg-color-page);
  border-radius: 50%;
  line-height: 1rem;
  padding: 1rem;
  width: 1rem;
  height: 1rem;
  margin: 0.5rem auto;
}
</style>
