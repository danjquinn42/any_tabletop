<template>
  <el-card>
    <el-form>
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
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
                v-model="form.minValue"
                :min="0"
                :max="1000"
                :precision="0"
              >
              </el-input-number>
            </el-form-item>
            <el-form-item class="input" label="Max Value">
              <el-input-number
                aria-label="Maximum Score"
                v-model="form.maxValue"
                :min="0"
                :max="1000"
                :precision="0"
              >
              </el-input-number>
            </el-form-item>

            <el-form-item class="input">
              <template #label>Modifier Value Formula</template>
              <el-input v-model="form.derivedFormulaInput" :precision="0">
              </el-input>
              <el-form-item class="tied-input" label="Round Down">
                <el-checkbox v-model="form.roundDown"></el-checkbox>
              </el-form-item>
            </el-form-item>

            <el-form-item
              class="input"
              label="Hide Stats (only show modifiers)"
            >
              <el-checkbox v-model="form.excludeStats"></el-checkbox>
            </el-form-item>

            <el-form-item class="input" label="Display + sign on modifiers">
              <el-checkbox v-model="form.displaySign"></el-checkbox>
            </el-form-item>

            <el-form-item
              class="input"
              label="Use default references for scores and modifiers"
            >
              <el-checkbox v-model="form.useDefaultReferences"></el-checkbox>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="24" :xs="24" :sm="14" :md="16" :lg="16" :xl="16">
          <span>
            <el-row>
              <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <span class="input-col-wrapper">
                  <span class="input-col-label input">Ability Score Label (unique)</span>
                  <span v-for="(_, index) in form.stats">
                    <el-form-item class="input" aria-label="Stat Label">
                      <el-input
                        v-model="form.stats[index].label"
                        @input="(e) => updateReferences(e, index)"
                      ></el-input>
                    </el-form-item>
                  </span>
                </span>
              </el-col>

              <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <span class="input-col-wrapper">
                  <span class="input-col-label input">
                    Score Reference (unique)
                    <el-tooltip
                      class="question-icon box-item"
                      effect="dark"
                      placement="bottom"
                      ><template #content
                        >The Stat Reference is used to access the value of this
                        item within templates.
                        <br />
                        Can only contain letters (a-z, A-Z), dash (-), and
                        underscore (_).
                        <br />
                        Must be globally unique across all game
                        components.</template
                      >
                      <el-icon class="question-icon" size="small"
                        ><QuestionFilled
                      /></el-icon>
                    </el-tooltip>
                  </span>
                  <span v-for="(_, index) in form.stats">
                    <el-form-item class="input">
                      <el-input
                        :disabled="form.useDefaultReferences"
                        :formatter="
                          (value) => `$${value.replace(/[^\w\_\-]|\d/g, '')}`
                        "
                        :parser="(value) => replace(value, '$', '')"
                        v-model="form.stats[index].scoreReference"
                      ></el-input>
                    </el-form-item>
                  </span>
                </span>
              </el-col>

              <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <span class="input-col-wrapper">
                  <span class="input-col-label input">
                    Modifier Reference (unique)
                    <el-tooltip
                      class="question-icon box-item"
                      effect="dark"
                      placement="bottom"
                      ><template #content
                        >This is used to access the modifiers value in other
                        components.
                        <br />
                        Can only contain letters (a-z, A-Z), dash (-), and
                        underscore (_).
                        <br />
                        Must be globally unique across all game components.
                      </template>
                      <el-icon class="question-icon" size="small"
                        ><QuestionFilled
                      /></el-icon>
                    </el-tooltip>
                  </span>
                  <span v-for="(_, index) in form.stats">
                    <el-form-item class="input">
                      <el-input
                        :disabled="form.useDefaultReferences"
                        :formatter="
                          (value) => `$${value.replace(/[^\w\_\-]|\d/g, '')}`
                        "
                        :parser="(value) => replace(value, '$', '')"
                        v-model="form.stats[index].modReference"
                      ></el-input>
                    </el-form-item>
                  </span>
                </span>
              </el-col>
            </el-row>
          </span>
        </el-col>

        <el-divider>Preview With Random Values</el-divider>
        <div class="container">
          <AbilityScoreModifiers
            :display-sign="form.displaySign"
            :exclude-stats="form.excludeStats"
            :stats="statsAsObject()"
            :round-down="form.roundDown"
            :derivedValueFormula="form.derivedFormulaInput"
          >
          </AbilityScoreModifiers>
        </div>
      </el-row>
    </el-form>
    <el-form-item>
      <el-button type="primary" @click="onFormSubmit">Save</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-card>
</template>
<script>
import { QuestionFilled } from "@element-plus/icons-vue";
import {
  ElInputNumber,
  ElRow,
  ElInput,
  ElCard,
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElCol,
  ElCheckbox,
  ElTooltip,
  ElDivider,
} from "element-plus";
import { dropRight, keyBy, merge, random, replace } from "lodash";
import AbilityScoreModifiers from "./AbilityScoreModifiers.vue";
import { create, all } from "mathjs";

const math = create(all);
export default {
  name: "EditAbilityScoreModifiers",
  components: {
    ElButton,
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
    AbilityScoreModifiers,
    ElCard,
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => console.log("no submit defined fro EditAbility"),
    },
    abilityScoreModifierData: {
      type: Object,
      default: () => ({
        maxValue: 0,
        minValue: 30,
        derivedFormulaInput: "$value / 2 - 5",
        useDefaultReferences: true,
        roundDown: true,
        excludeStats: false,
        displaySign: true,
        stats: [
          {
            label: "STR",
            value: 16,
            scoreReference: "STR-score",
            modReference: "STR-mod",
          },
          {
            label: "DEX",
            value: 14,
            scoreReference: "DEX-score",
            modReference: "DEX-mod",
          },
          {
            label: "CON",
            value: 16,
            scoreReference: "CON-score",
            modReference: "CON-mod",
          },
          {
            label: "INT",
            value: 8,
            scoreReference: "INT-score",
            modReference: "INT-mod",
          },
          {
            label: "WIS",
            value: 10,
            scoreReference: "WIS-score",
            modReference: "WIS-mod",
          },
          {
            label: "CHA",
            value: 8,
            scoreReference: "CHA-score",
            modReference: "CHAT-mod",
          },
        ],
      }),
    },
  },
  data: function () {
    return {
      numberOfElements: 6,
      previousNumberOfElements: 6,
      form: {},
    };
  },
  methods: {
    replace,
    updateReferences(label, statIndex) {
      if (!this.form.useDefaultReferences) return;
      console.log("__LABEL__", label);
      this.form.stats[statIndex].scoreReference = label + "-score";
      this.form.stats[statIndex].modReference = label + "-mod";
    },
    updateStatsList() {
      const difference = this.numberOfElements - this.previousNumberOfElements;
      this.previousNumberOfElements = this.numberOfElements;
      if (difference === 0) {
        return;
      }
      if (difference > 0) {
        const defaultStat = {
          label: "",
          value: random(this.form.minValue, this.form.maxValue),
        };
        let newElements = new Array(difference).fill(defaultStat);
        this.form.stats.push(...newElements);
      }
      if (difference < 0) {
        this.form.stats = dropRight(this.form.stats, Math.abs(difference));
      }
    },
    statsAsObject() {
      return keyBy(this.form.stats, "label");
    },
    onFormSubmit() {
      console.log("Submitted");
      const scrubbedStats = this.form.stats.map((s) => ({ ...s, value: null }));
      const payload = {
        maxValue: this.form.maxValue,
        minValue: this.form.minValue,
        derivedFormulaInput: this.form.derivedFormulaInput,
        roundDown: this.form.roundDown,
        excludeStats: this.form.excludeStats,
        displaySign: this.form.displaySign,
        stats: scrubbedStats,
      };
      console.log(payload);
    },
  },
  mounted() {
    merge(this.form, this.abilityScoreModifierData);
    console.log("form", this.form);
    console.log("abilitiyScoreModifierData", this.abilityScoreModifierData);
    this.numberOfElements = this.form.stats.length;
    this.previousNumberOfElements = this.numberOfElements;
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

.input-col-label {
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
}

.question-icon {
  /*position: absolute;*/
  /*left: -0.5rem;*/
}
</style>
