<template>
  <el-card>
    <el-form>
      <el-row>
        <el-col :span="24" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="left-col-wrapper">
            <el-form-item class="input" label="Number of Elements">
              <el-input-number
                v-model="numberOfElements"
                :value-on-clear="1"
                :min="0"
                :max="1000"
                :precision="0"
                @change="updateStatsList"
              >
              </el-input-number>
            </el-form-item>
            <el-form-item class="input" label="Min Value">
              <el-input-number
                aria-label="Minimum Score"
                v-model="minValue"
                :min="0"
                :max="1000"
                :precision="0"
              >
              </el-input-number>
            </el-form-item>
            <el-form-item class="input" label="Max Value">
              <el-input-number
                aria-label="Maximum Score"
                v-model="maxValue"
                :min="0"
                :max="1000"
                :precision="0"
              >
              </el-input-number>
            </el-form-item>

            <el-form-item class="input">
              <template #label>Modifier Value Formula</template>
              <el-input v-model="derivedFormulaInput" :precision="0">
              </el-input>
              <el-form-item class="tied-input" label="Round Down">
                <el-checkbox v-model="roundDown"></el-checkbox>
              </el-form-item>
            </el-form-item>

            <el-form-item
              class="input"
              label="Hide Stats (only show modifiers)"
            >
              <el-checkbox v-model="excludeStats"></el-checkbox>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="24" :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
          <span class="left-col-wrapper">
            <span v-for="(_, index) in stats">
              <span class="container">
                <el-form-item class="input" label="Stat Label">
                  <el-input v-model="stats[index].label"></el-input>
                </el-form-item>

                <el-form-item class="input" label="Stat Reference">
                  <el-tooltip
                    class="question-icon box-item"
                    effect="dark"
                    placement="bottom"
                    ><template #content
                      >The Stat Reference is used to access the value of this
                      item within templates.</template
                    >
                    <el-icon class="question-icon" size="small"
                      ><QuestionFilled/></el-icon>
                  </el-tooltip>
                  <el-input
                    class="input-with-icon"
                    v-model="stats[index].reference"
                  ></el-input>
                </el-form-item>
              </span>
            </span>
          </span>
        </el-col>

        <el-divider>Preview With Random Values</el-divider>
        <div class="container">
          <StatsWithDerivedValues
            :display-sign="displaySign"
            :exclude-stats="excludeStats"
            :stats="statsAsObject()"
            :round-down="roundDown"
            :derivedValueFormula="derivedFormulaInput"
          >
          </StatsWithDerivedValues>
        </div>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import {QuestionFilled} from "@element-plus/icons-vue";
import {
  ElInputNumber,
  ElRow,
  ElInput,
  ElCard,
  ElForm,
  ElFormItem,
  ElIcon,
  ElCol,
  ElCheckbox,
  ElTooltip,
  ElDivider,
} from "element-plus";
import { dropRight, keyBy, random } from "lodash";
import StatsWithDerivedValues from "./StatsWithDerivedValues.vue";
import { create, all } from "mathjs";

const math = create(all);
export default {
  name: "NewModifiersComponent",
  components: {
    QuestionFilled,
    ElDivider,
    ElTooltip,
    ElIcon,
    ElCol,
    ElRow,
    ElInput,
    ElInputNumber,
    ElCheckbox,
    ElForm,
    ElFormItem,
    StatsWithDerivedValues,
    ElCard,
  },
  data: function () {
    return {
      numberOfElements: 1,
      previousNumberOfElements: 1,
      maxValue: 30,
      minValue: 0,
      derivedFormulaInput: "$value / 2 - 5",
      roundDown: true,
      excludeStats: false,
      displaySign: true,
      stats: [
        {
          label: "STR",
          value: 16,
          statReference: "",
        },
        {
          label: "DEX",
          value: 14,
          statReference: "",
        },
        {
          label: "CON",
          value: 16,
          statReference: "",
        },
        {
          label: "INT",
          value: 8,
          statReference: "",
        },
        {
          label: "WIS",
          value: 10,
          statReference: "",
        },
        {
          label: "CHA",
          value: 8,
          statReference: "",
        },
      ],
    };
  },
  methods: {
    updateStatsList() {
      const difference = this.numberOfElements - this.previousNumberOfElements;
      this.previousNumberOfElements = this.numberOfElements;
      if (difference === 0) {
        return;
      }
      if (difference > 0) {
        const defaultStat = {
          label: "",
          value: random(this.minValue, this.maxValue),
        };
        let newElements = new Array(difference).fill(defaultStat);
        this.stats.push(...newElements);
      }
      if (difference < 0) {
        this.stats = dropRight(this.stats, Math.abs(difference));
      }
    },
    statsAsObject() {
      return keyBy(this.stats, "label");
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
}

.container > * {
  width: 100%;
}

.left-col-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.input {
  margin: 0.5rem 1rem;
}

.tied-input {
  /*margin: 0 1rem 0.5rem 1rem;*/
}

.input-with-icon {
  margin-left: 1rem;
}

.question-icon {
  position: absolute;
  left: -0.5rem;
}
</style>
