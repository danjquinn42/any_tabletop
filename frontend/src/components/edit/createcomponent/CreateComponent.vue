<template>
  <el-main class="main">
    <ComponentPreviewCard
      class="preview-card"
      :description="abilityScoreDescription"
    >
      <AbilityScoreModifiers
        display-sign
        class="ability-scores"
        :stats="exampleCoreStats"
      />
    </ComponentPreviewCard>
  </el-main>
</template>

<script>
import { ElCard, ElDialog, ElMain } from "element-plus";
import "element-plus/es/components/descriptions/style/css";
import { map } from "lodash";
import AbilityScoreModifiers from "./AbilityScores/AbilityScoreModifiers.vue";
import ComponentPreviewCard from "./Preview/ComponentPreviewCard.vue";
import EditAbilityScoreModifiers from "./AbilityScores/EditAbilityScoreModifiers.vue";
import NewComponentPreview from "./Preview/NewComponentPreview.vue";

export default {
  name: "CreateComponent",
  components: {
    AbilityScoreModifiers,
    NewComponentPreview,
    ComponentPreviewCard,
    EditAbilityScoreModifiers,
    ElDialog,
    ElMain,
    ElCard,
  },
  methods: {
    statsAsList() {
      return map(this.stats, (v) => v);
    },
  },
  data: function () {
    return {
      exampleCoreStats: {
        STR: {
          label: "STR",
          value: 16,
        },
        DEX: {
          label: "DEX",
          value: 14,
        },
        CON: {
          label: "CON",
          value: 16,
        },
        INT: {
          label: "INT",
          value: 8,
        },
        WIS: {
          label: "WIS",
          value: 10,
        },
        CHA: {
          label: "CHA",
          value: 8,
        },
      },
      abilityScoreDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper ante vitae tortor placerat pulvinar.\n" +
        "        Suspendisse et odio quis eros pharetra maximus eget vitae est. Donec sollicitudin, orci at elementum egestas,\n" +
        "        diam erat faucibus justo, eu fringilla mi tellus sed nibh. Ut blandit eleifend sapien nec vulputate. Donec\n" +
        "        pharetra blandit felis in luctus. In vitae eros vitae neque scelerisque aliquam.",
    };
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, 20rem);
  flex-flow: wrap;
  padding: 0;
}

.ability-scores {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
