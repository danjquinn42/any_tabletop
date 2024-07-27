<template>
  <Species :template="template" :data="speciesData" class="species"></Species>
</template>

<script>
import "element-plus/theme-chalk/el-scrollbar.css";
import { MOCK_DATA, MOCK_TEMPLATES } from "../../../util/serverDataMocks";
import Species from "./Species.vue";

export default {
  name: "SpeciesDirectory",
  components: { Species },
  data: function () {
    return {
      template: MOCK_TEMPLATES.species,
      speciesData: MOCK_DATA.species.luchog,
    };
  },
};
</script>

<style scoped>
.species {
  margin: 64px 16px;
  max-width: 1500px;
}
</style>
