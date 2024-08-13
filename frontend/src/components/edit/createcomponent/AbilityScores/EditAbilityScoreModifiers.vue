<template>
  <el-card class="card">
    <el-form>
      <el-form-item
        class="input"
        aria-label="Component Name"
        label="Component Name"
      >
        <el-input v-model="form.componentName"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-row>
            <el-col :span="24" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
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
              </div>
            </el-col>

            <el-col :span="24" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <div class="left-col-wrapper">
                <el-form-item class="input" label="Use default references">
                  <el-checkbox
                    @change="resetReferences"
                    v-model="form.useDefaultReferences"
                  ></el-checkbox>
                </el-form-item>

                <el-form-item class="input" label="Include stats">
                  <el-checkbox
                    :disabled="!form.includeModifiers"
                    v-model="form.includeStats"
                  ></el-checkbox>
                </el-form-item>

                <el-form-item class="input" label="Include modifiers">
                  <el-checkbox
                    :disabled="!form.includeStats"
                    v-model="form.includeModifiers"
                  ></el-checkbox>
                </el-form-item>

                <el-form-item
                  v-if="form.includeModifiers"
                  class="input"
                  label="Display + sign on modifiers"
                >
                  <el-checkbox v-model="form.displaySign"></el-checkbox>
                </el-form-item>

                <el-form-item
                  v-if="form.includeModifiers && form.includeStats"
                  class="input"
                >
                  <template #label>Modifier Formula</template>
                  <el-input v-model="form.derivedFormulaInput" :precision="0">
                  </el-input>
                  <el-form-item class="tied-input" label="Round Down">
                    <el-checkbox v-model="form.roundDown"></el-checkbox>
                  </el-form-item>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="24" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <span>
            <el-row>
              <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <span class="input-col-wrapper">
                  <span class="input-col-label input">Score Label</span>
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

              <el-col
                v-if="form.includeStats"
                :span="8"
                :xs="8"
                :sm="8"
                :md="8"
                :lg="8"
                :xl="8"
              >
                <span class="input-col-wrapper">
                  <span class="input-col-label input">
                    Score ID
                    <el-tooltip
                      class="question-icon box-item"
                      effect="dark"
                      placement="bottom"
                      ><template #content
                        >This is used to access the stats value for use in other
                        components or templates.
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
                        v-model="form.stats[index].reference"
                      ></el-input>
                    </el-form-item>
                  </span>
                </span>
              </el-col>

              <el-col
                v-if="form.includeModifiers"
                :span="8"
                :xs="8"
                :sm="8"
                :md="8"
                :lg="8"
                :xl="8"
              >
                <span class="input-col-wrapper">
                  <span class="input-col-label input">
                    Modifier ID
                    <el-tooltip
                      class="question-icon box-item"
                      effect="dark"
                      placement="bottom"
                      ><template #content
                        >This is used to access the modifiers value for use in
                        other components or templates.
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
                        v-model="form.stats[index].modifierReference"
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
            :include-stats="form.includeStats"
            :include-modifiers="form.includeModifiers"
            :stats="statsAsObject()"
            :round-down="form.roundDown"
            :derivedValueFormula="form.derivedFormulaInput"
          >
          </AbilityScoreModifiers>
        </div>
      </el-row>
      <el-form-item class="submit-buttons">
        <el-button
          v-if="componentId === 'new'"
          type="primary"
          @click="onFormSubmit"
          >Create</el-button
        >
        <el-button v-else type="primary">Update</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
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
  ElRadio,
  ElRadioGroup,
} from "element-plus";
import { dropRight, find, isEmpty, keyBy, random, replace } from "lodash";
import AbilityScoreModifiers from "./AbilityScoreModifiers.vue";
import { create, all } from "mathjs";
import { useModStore } from "../../../../store/modStore";

const math = create(all);
export default {
  name: "EditAbilityScoreModifiers",
  components: {
    ElRadio,
    ElRadioGroup,
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
    closeDialog: {
      type: Function,
    },
    mod: {
      type: Object,
      default: {},
    },
  },
  setup() {
    const modStore = useModStore();
    return { modStore };
  },
  data: function () {
    return {
      numberOfElements: 6,
      previousNumberOfElements: 6,
      form: {
        componentName: "",
        minValue: 0,
        maxValue: 30,
        derivedFormulaInput: "$score / 2 - 5",
        useDefaultReferences: true,
        roundDown: true,
        includeStats: true,
        includeModifiers: true,
        displaySign: true,
        stats: [{}],
      },
      componentId: "new",
    };
  },
  methods: {
    replace,
    updateReferences(label, statIndex) {
      if (!this.form.useDefaultReferences) return;
      this.form.stats[statIndex].reference = label + "-score";
      this.form.stats[statIndex].modifierReference = label + "-mod";
    },
    resetReferences() {
      this.form.stats.forEach((s, i) => {
        this.updateReferences(s.label, i);
      });
    },
    updateStatsList() {
      const difference = this.numberOfElements - this.previousNumberOfElements;
      this.previousNumberOfElements = this.numberOfElements;
      if (difference === 0) {
        return;
      }

      if (difference > 0) {
        let newElements = new Array(difference).fill({});
        newElements = newElements.map(() => {
          const defaultValues = {
            label: "",
            value: random(this.form.minValue, this.form.maxValue),
          };
          return defaultValues;
        });
        this.form.stats.push(...newElements);
      }
      if (difference < 0) {
        this.form.stats = dropRight(this.form.stats, Math.abs(difference));
      }
    },
    statsAsObject() {
      return keyBy(this.form.stats, "label");
    },
    async onFormSubmit() {
      const scrubbedStats = this.form.stats.map((s) => ({ ...s, value: 0 }));
      const payload = {
        id: this.componentId,
        name: this.form.componentName,
        type: "ScoresAndModifiers",
        maxValue: this.form.maxValue,
        minValue: this.form.minValue,
        derivedFormulaInput: this.form.includeModifiers
          ? this.form.derivedFormulaInput
          : null,
        roundDown: this.form.roundDown,
        includeStats: this.form.includeStats,
        includeModifiers: this.form.includeModifiers,
        displaySign: this.form.displaySign,
        stats: scrubbedStats,
      };
      await this.modStore.updateComponent(payload);
      this.closeDialog();
    },
    updateProps() {
      this.numberOfElements = this.form.stats.length;
      this.previousNumberOfElements = this.numberOfElements;
      if (!isEmpty(this.mod)) {
        const gameId = this.$route.params.gameId;
        this.componentId = this.$route.params.componentId;
        if (this.componentId === "new") return;

        const game = find(this.mod.games, (g) => g.id === gameId);
        const config = find(game.configs, (c) => c.id === this.componentId);
        this.form = {
          ...config,
          componentName: config.name,
        };
      }
    },
  },
  watch: {
    mod: function () {
      this.updateProps();
    },
  },
  mounted() {
    this.updateProps();
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
  width: 100%;
  display: block;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
}

.submit-buttons {
  float: right;
  margin: 2rem;
}
</style>
