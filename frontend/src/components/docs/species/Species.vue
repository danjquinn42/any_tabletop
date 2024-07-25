<template>
  <el-card>
    <template #header>
      <h1 class="species-name">{{ name }}</h1>
      <h4 class="species-type">( {{ size }} {{ creatureType }} )</h4>
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
        <el-image v-if="imageSource" class="example-image" :src="imageSource">
          <div class="img-sizer"></div>
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
        </el-image>

        <ol class="required-list" v-for="section in article">
          <li class="required-list-item">
            <h3 v-if="section.sectionHeading">
              {{ section.sectionHeading }}
              <el-divider class="divider" />
            </h3>
          </li>
          <li class="required-list-item">
            <ol
              class="subsection required-list"
              v-for="subsection in section.subsections"
            >
              <li class="required-list-item">
                <h4 v-if="subsection.subHeading">
                  {{ subsection.subHeading }}
                </h4>
                <p class="article-text" v-for="paragraph in subsection.content">
                  {{ paragraph }}
                </p>
              </li>
            </ol>
          </li>
        </ol>
      </el-col>
      <el-col
        class="stats-col"
        :span="24"
        :xs="24"
        :sm="18"
        :md="10"
        :lg="7"
        :xl="7"
      >
        <h3>{{ statsTitle }}</h3>
        <el-descriptions
          v-for="feature in features"
          :column="1"
          border
          class=".table"
        >
          <el-descriptions-item
            label-align="right"
            width="150px"
            class="table-item"
            :label="feature.name"
          >
            {{ feature.value }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import "element-plus/theme-chalk/el-card.css";
import "element-plus/theme-chalk/el-image.css";
import "element-plus/theme-chalk/el-text.css";
import "element-plus/theme-chalk/el-descriptions.css";
import "element-plus/theme-chalk/el-descriptions-item.css";
import {
  ElCard,
  ElImage,
  ElText,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElIcon,
  ElCol,
  ElRow,
} from "element-plus";

export default {
  name: "Species",
  components: {
    ElDivider,
    ElRow,
    ElCol,
    ElIcon,
    ElDescriptionsItem,
    ElDescriptions,
    ElText,
    ElImage,
    ElCard,
  },
  data: function () {
    return {
      name: "Luchóg",
      creatureType: "mousefolk",
      size: "medium",
      imageSource: "https://picsum.photos/300/400",
      statsTitle: "Stats",
      features: [
        { name: "Ability Scores", value: "+2 WIS +1 INT" },
        { name: "Avg Lifespan", value: "45 years" },
        { name: "Size", value: "medium" },
        { name: "Speed", value: "30ft" },
        { name: "Proficiencies", value: "nature" },
        {
          name: "Languages",
          value:
            "All languages spoken on the river (see: Motehr River's Blessings)",
        },
      ],
      article: [
        {
          subsections: [
            {
              content: [
                "Luchóg (pronounced luh-HOAG) are the indigenous inhabitants of Ada. " +
                  "The vast majority of them live on Leffy Isle in the lake at the source of the Adanna River. " +
                  "Culturally, they value honest dealing, shrewd negotiation, and humility. " +
                  'Their patron is the spirit of the Adanna River who they call "Mother River".',
              ],
            },
          ],
        },
        {
          sectionHeading: "Mousefolk",
          subsections: [
            {
              content: [
                "Standing about four or five feet tall, Luchóg look like short, humanoid mice. " +
                  "They have may have fur from tawny, black, white, brown, gold, or calico. ",
                "People south of the lake primarily know the Luchóg as river merchants and sailors. " +
                  'Because of this, they are commonly referred to as "river rats". The term is considered ' +
                  "a pejorative, but most Luchóg take little notice.",
              ],
            },
          ],
        },
        {
          sectionHeading: "Lifestyle",
          subsections: [
            {
              subHeading: "",
              content: [
                "Luchóg have been living in Ada long before any of the other sentient species. " +
                  "It is possible they were here even before the fairy abandoned this realm.",
                "Most Luchóg live on Leffy Isle, an island in the middle of the Lake of Innisfree. " +
                  "The town on the island is small but dense, with over 2000 Luchóg living in an area of " +
                  "about 2 square miles. Despite the density, the Luchóg reserves about ⅔ of the island for " +
                  "orchards, gardens, and wild woods. Luchóg have a deep respect for nature and are willing " +
                  "to make sacrifices to preserve their verdant home.",
              ],
            },
          ],
        },
        {
          sectionHeading: "Traits",
          subsections: [
            {
              subHeading: "Mother River's Blessings",
              content: [
                "The Luchóg are favored by the goddess of the River Adanna. " +
                  "She grant's every Luchóg the ability to speak any language spoken on the river. " +
                  "For example: when elves first sailed into the river delta 900 years ago " +
                  "every living Luchóg instantly learned the elven language. " +
                  "This only applies to spoken languages. The Luchóg can speak with animals and birds " +
                  "on the river but not plants or fish.",
                "In addition that can read and write Luchóg and common.",
              ],
            },
            {
              subHeading: "Keen Negotiator",
              content: [
                "Luchóg society prospers largely due to trade " +
                  "up and down the river. As such, Luchóg are taught from a young age how to handle financial " +
                  "negotiations. Luchóg have advantage on any CHA check involving money or bartering",
              ],
            },
          ],
        },
      ],
    };
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

.divider {
  margin-top: 1rem;
  width: 40%;
}

.article-text {
  text-align: justify;
  text-align-last: left;
  text-justify: inter-character;
  text-indent: 20px;
}

.article-text:last-child {
  margin-bottom: 2rem;
}

.subsection {
  margin-bottom: 2rem;
}

.example-image {
  min-width: 200px;
  width: 50%;
  max-width: 400px;
  float: right;
  margin: 1em;
}

@media only screen and (min-width: 1200px) {
  .example-image {
    width: 30%;
    margin-left: 1em;
  }
}


@media only screen and (max-width: 992px) {
  .example-image {
    width: 30%;
    padding: 0;
  }
}

@media only screen and (max-width: 768px) {
  .example-image {
    width: 100%;
    margin: 1em auto;
  }
}
.required-list {
  padding: 0;
}

.required-list-item {
  list-style: none;
}
</style>
