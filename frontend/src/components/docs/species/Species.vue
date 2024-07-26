<template>
  <el-card>
    <template #header>
      <h1 class="species-name">{{ data.name }}</h1>
      <h5 class="species-type">
        ( {{ data.stats.Size.value }} {{ data.stats.CreatureType.value }} )
      </h5>
    </template>
    <el-row :gutter="16" class="topLayout">
      <el-col
        class="article-col"
        :span="24"
        :xs="24"
        :sm="24"
        :md="14"
        :lg="16"
        :xl="16"
      >
        <species-article :data="data" />
      </el-col>
      <el-col
        class="stats-col"
        :span="24"
        :xs="24"
        :sm="18"
        :md="10"
        :lg="8"
        :xl="7"
      >
        <StatsTable :stats="data.stats" :template="template.stats" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { ElCard, ElCol, ElRow } from "element-plus";
import "../../global-styles.css";
import SpeciesArticle from "./SpeciesArticle.vue";
import StatsTable from "./StatsTable.vue";

export default {
  name: "Species",
  components: {
    StatsTable,
    SpeciesArticle,
    ElRow,
    ElCol,
    ElCard,
  },
  props: {
    template: {
      type: Object,
    },
    data: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.topLayout {
  width: 100%;
}

.species-name {
  display: inline;
  width: content-box;
  margin-right: 1rem;
}
.species-type {
  display: inline;
}

@media only screen and (min-width: 1200px) {
}

@media only screen and (max-width: 992px) {
}

@media only screen and (max-width: 768px) {
}
</style>
