<template>
  <el-form :model="form" label-width="auto">
    <el-card :gutter="16" class="form-card">
      <template #header>
        <el-form-item class="h1-input" label-width="auto">
          <el-input
            class="h1-input"
            v-model="form.name"
            :placeholder="template.title.label"
            size="large"
          />
        </el-form-item>
      </template>
      <el-row class="topLayout">
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
        </el-col>

        <!-- Stats Input  -->
        <el-col
          class="stats-col"
          :span="24"
          :xs="24"
          :sm="18"
          :md="10"
          :lg="8"
          :xl="7"
        >
          <StatsTableEditor :stats="form.stats" :template="template.stats" />
        </el-col>
      </el-row>
      <el-button type="primary">Submit</el-button>
    </el-card>
  </el-form>

  <!-- Preview  -->
  <h3>Preview</h3>
  <Species class="preview" :data="form" :template="template"> </Species>
  <div class="space-filler"></div>
</template>

<script>
import {
  ElButton,
  ElCard,
  ElCol,
  ElContainer,
  ElForm,
  ElFormItem,
  ElInput,
  ElMain,
  ElRow,
} from "element-plus";
import { MOCK_TEMPLATES } from "../../../util/serverDataMocks";
import Species from "../../docs/species/Species.vue";
import "../../global-styles.css";
import StatsTableEditor from "./StatsTableEditor.vue";

export default {
  name: "EditSpecies",
  components: {
    StatsTableEditor,
    ElContainer,
    ElMain,
    Species,
    ElCard,
    ElButton,
    ElRow,
    ElCol,
    ElForm,
    ElInput,
    ElFormItem,
  },
  data: function () {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        stats: MOCK_TEMPLATES.species.stats.list,
      },
      template: MOCK_TEMPLATES.species,
    };
  },
};
</script>

<style scoped>
.form-card {
  width: 100%;
  margin: 3em 0 3em 0;
}
.topLayout {
  width: 100%;
}

.space-filler {
  height: 100px;
  width: 1px;
  display: block;
}
</style>
