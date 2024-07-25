<template>
  <el-scrollbar class="scroll" always>
    <el-container class="main">
      <el-main>
        <el-form :model="form" label-width="auto">
          <el-card :gutter="16" class="form-card">
            <template #header>
              <el-form-item class="h1-input">
                <el-input
                  class="h1-input"
                  v-model="form.name"
                  placeholder="Species Name"
                />
              </el-form-item>
            </template>
            <el-row :gutter="16" class="topLayout">
              <!--  Article Input   -->
              <el-col
                class="article-col"
                :span="24"
                :xs="24"
                :sm="24"
                :md="14"
                :lg="16"
                :xl="16"
              >
                <el-form-item>
                  <el-input></el-input>
                </el-form-item>
              </el-col>

              <!-- Stats Input  -->
              <el-col
                class="stats-col"
                :span="24"
                :xs="24"
                :sm="18"
                :md="10"
                :lg="7"
                :xl="7"
              >
                <h3>{{ template.statsTitle }}</h3>
                <el-descriptions
                  v-for="(stat, i) in template.stats"
                  :column="1"
                  border
                >
                  <el-descriptions-item
                    label-align="right"
                    width="150px"
                    class="table-item"
                    :label="stat.name"
                  >
                    <el-form-item class="stat-item">
                      <el-input
                        v-model="form.stats[i].value"
                        placeholder="stat value"
                      ></el-input>
                    </el-form-item>
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
            <el-button type="primary">Submit</el-button>
          </el-card>
        </el-form>

        <!-- Preview  -->
        <h3>Preview</h3>
        <Species class="preview" :species-data="form"> </Species>
      </el-main>
    </el-container>
    <div class="space-filler"></div>
  </el-scrollbar>
</template>

<script>
import "../../global-styles.css";
import {
  ElButton,
  ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRow,
  ElSelect,
  ElText,
  ElContainer,
  ElMain,
  ElScrollbar,
  ElDescriptions,
  ElDescriptionsItem,
} from "element-plus";
import Species from "../../docs/species/Species.vue";

// TODO: replace with templated list
const initialStats = [
  { value: "", name: "foobar", label: "abilityScores" },
  { value: "", name: "foobar", label: "avgLifespan" },
  { value: "", name: "foobar", label: "size" },
  { value: "", name: "foobar", label: "creatureType" },
  { value: "", name: "foobar", label: "speed" },
  { value: "", name: "foobar", label: "proficiencies" },
  { value: "", name: "foobar", label: "languages" },
];

export default {
  name: "EditSpecies",
  components: {
    ElScrollbar,
    ElDescriptions,
    ElDescriptionsItem,
    ElContainer,
    ElMain,
    Species,
    ElCard,
    ElButton,
    ElRow,
    ElCol,
    ElForm,
    ElText,
    ElInput,
    ElOption,
    ElSelect,
    ElInputNumber,
    ElFormItem,
  },
  data: function () {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        stats: initialStats,
      },
      template: {
        statsTitle: "Stats",
        stats: [
          { value: "", label: "abilityScores", name: "Ability Scores" },
          { value: "", label: "avgLifespan", name: "Avg Lifespan" },
          { value: "", label: "size", name: "Size" },
          { value: "", label: "creatureType", name: "Creature Type" },
          { value: "", label: "speed", name: "Speed" },
          { value: "", label: "proficiencies", name: "Proficiencies" },
          { value: "", label: "languages", name: "Languages" },
        ],
      },
    };
  },
};
</script>

<style scoped>
.form-card {
  width: 100%;
  margin: 3em 0 3em 0;
}
.main {
  max-width: 1500px;
}
.topLayout {
  width: 100%;
}

.stat-item {
  margin: 0;
}
.scroll {
  width: 100%;
  justify-content: left;
  align-self: flex-start;
  height: 100vh;
  margin-right: 160px;
  margin-bottom: 1600px;
  background: var(--el-color-primary-light-9);
}

.space-filler {
  height: 100px;
  width: 1px;
  display: block;
}
</style>
