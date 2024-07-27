<template>
  <span>
    <el-image
      v-if="data.imageSource"
      class="example-image"
      :src="data.imageSource"
    >
      <div class="img-sizer"></div>
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <ol class="required-list" v-for="section in data.article">
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
  </span>
</template>
<script>
import { ElImage, ElDivider } from "element-plus";

export default {
  name: "species-article",
  components: { ElDivider, ElImage },
  props: {
    data: {},
  },
};
</script>
<style scoped>
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
    width: 40%;
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
    display: block;
    width: 100%;
    margin: 0 auto;
    float: none;
  }
}

.required-list {
  padding: 0;
}

.required-list-item {
  list-style: none;
}
</style>
