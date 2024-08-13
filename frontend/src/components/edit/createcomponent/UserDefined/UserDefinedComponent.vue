<template>
  <el-main>
    <el-form class="container">
      <div class="input-container">
        <el-card class="input-panel">
          <template #header>
            <div class="input-header">
              <label for="html-input">HTML</label>
              <el-text v-if="htmlErrorText" class="error-text" type="danger">{{
                htmlErrorText
              }}</el-text>
              <el-button class="popup-button">View HTML Hooks</el-button>
            </div>
          </template>
          <codemirror
            :extensions="htmlExtensions"
            class="codemirror"
            v-model="htmlContent"
          ></codemirror>
        </el-card>

        <el-card class="input-panel">
          <template #header>
            <div class="input-header">
              <label for="css-input">CSS</label>
              <el-text v-if="cssErrorText" class="error-text" type="danger">{{
                cssErrorText
              }}</el-text>
              <el-button
                @click="cssVariablesVisible = !cssVariablesVisible"
                class="popup-button"
              >
                View CSS color variables
              </el-button>
            </div>
          </template>
          <codemirror
            :extensions="cssExtensions"
            class="codemirror"
            v-model="cssContent"
          ></codemirror>
        </el-card>
      </div>
      <h4 class="preview-header">Preview</h4>
      <el-card class="preview-container">
        <div id="preview" v-html="previewContent"></div>
      </el-card>
    </el-form>

    <el-dialog
      width="95%"
      style="max-width: 1400px"
      v-model="cssVariablesVisible"
    >
      <CssVariables />
    </el-dialog>
  </el-main>
</template>

<script>
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import DOMPurify from "dompurify";
import {
  ElButton,
  ElCard,
  ElDialog,
  ElForm,
  ElMain,
  ElText,
} from "element-plus";
import { Codemirror } from "vue-codemirror";
import "../../../global-styles.css";
import CssVariables from "./CssVariables.vue";

export default {
  name: "UserDefined",
  components: {
    CssVariables,
    ElDialog,
    ElMain,
    ElText,
    ElButton,
    ElForm,
    ElCard,
    Codemirror,
  },
  data() {
    return {
      htmlContent: "<h2>Hello</h2>",
      cssContent: "",
      previewContent: "",
      htmlExtensions: [html(), oneDark],
      cssExtensions: [css(), oneDark],
      htmlErrorText: "",
      cssErrorText: "",
      cssVariablesVisible: false,
      formContent: {
        sanitizedHtml: "",
        css: "",
      },
    };
  },
  methods: {
    sanitizeHtml() {
      return DOMPurify.sanitize(this.htmlContent);
    },
    updatePreview() {
      let displayContent = this.htmlContent;

      this.previewContent = `
        <html lang="en">
          <head>
            <title>Custom Element</title>
            <meta charset="utf-8" />
            <style>${this.cssContent}</style>
          </head>
          <body>${displayContent}</body>
        </html>
      `;

      if (this.htmlContent.match(/(<|(&lt;))(\s+)*script/gi)) {
        this.htmlErrorText = "Script tags are not allowed";
      } else {
        this.formContent.sanitizedHtml = this.sanitizeHtml();
        this.formContent.css = this.cssContent;
        this.htmlErrorText = "";
      }
    },
  },
  watch: {
    htmlContent: "updatePreview",
    cssContent: "updatePreview",
  },
  mounted() {
    this.updatePreview();
  },
};
</script>

<style scoped>
.input-header {
  display: flex;
  justify-content: space-between;
}

.codemirror > * {
  height: 20rem;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.input-container {
  display: flex;
  width: 100%;
  gap: 10px;
}

.input-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-panel label {
  margin-bottom: 5px;
}

.input-panel codemirror {
  width: 100%;
  height: 200px;
}

.preview-header {
  margin-bottom: 0;
}

.preview-container {
  width: 100%;
  margin-top: 0.5rem;
}

.preview-container iframe {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
