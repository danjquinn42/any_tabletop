<template>
  <p>Any Tabletop uses Elements Plus styles. These css variables are available</p>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <el-card>
        <template #header>Light Mode Colors</template>
        <ul class="list">
          <li
              class="list-item"
              v-for="color of lightModeColors.sort()"
              @click="copyText(color)"
          >
            <div class="previewBox"
                 :style="'background-color: '+ extractColorVariable(color)"
            ></div>
            <el-text size="small">{{color}}</el-text>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <el-card>
        <template #header>Dark Mode Colors</template>
        <ul class="list">
          <li
              class="list-item"
              v-for="color of darkModeColors.sort()"
              @click="copyText(color)"
          >
            <div class="previewBox"
                 :style="'background-color: '+ extractColorVariable(color)"
            ></div>
            <el-text size="small">{{color}}</el-text>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {ElCol, ElRow, ElCard, ElText, ElNotification} from "element-plus";

export default {
  name: 'CssVariables',
  components: {ElCard, ElText, ElCol, ElRow},
  data: function () {
    return {
      lightModeColors: [
        "--el-color-primary: #409eff;",
        "--el-color-primary-light-3: #79bbff;",
        "--el-color-primary-light-5: #a0cfff;",
        "--el-color-primary-light-7: #c6e2ff;",
        "--el-color-primary-light-8: #d9ecff;",
        "--el-color-primary-light-9: #ecf5ff;",
        "--el-color-primary-dark-2: #337ecc;",
        "--el-color-success: #67c23a;",
        "--el-color-success-light-3: #95d475;",
        "--el-color-success-light-5: #b3e19d;",
        "--el-color-success-light-7: #d1edc4;",
        "--el-color-success-light-8: #e1f3d8;",
        "--el-color-success-light-9: #f0f9eb;",
        "--el-color-success-dark-2: #529b2e;",
        "--el-color-warning: #e6a23c;",
        "--el-color-warning-light-3: #eebe77;",
        "--el-color-warning-light-5: #f3d19e;",
        "--el-color-warning-light-7: #f8e3c5;",
        "--el-color-warning-light-8: #faecd8;",
        "--el-color-warning-light-9: #fdf6ec;",
        "--el-color-warning-dark-2: #b88230;",
        "--el-color-danger: #f56c6c;",
        "--el-color-danger-light-3: #f89898;",
        "--el-color-danger-light-5: #fab6b6;",
        "--el-color-danger-light-7: #fcd3d3;",
        "--el-color-danger-light-8: #fde2e2;",
        "--el-color-danger-light-9: #fef0f0;",
        "--el-color-danger-dark-2: #c45656;",
        "--el-color-error: #f56c6c;",
        "--el-color-error-light-3: #f89898;",
        "--el-color-error-light-5: #fab6b6;",
        "--el-color-error-light-7: #fcd3d3;",
        "--el-color-error-light-8: #fde2e2;",
        "--el-color-error-light-9: #fef0f0;",
        "--el-color-error-dark-2: #c45656;",
        "--el-color-info: #909399;",
        "--el-color-info-light-3: #b1b3b8;",
        "--el-color-info-light-5: #c8c9cc;",
        "--el-color-info-light-7: #dedfe0;",
        "--el-color-info-light-8: #e9e9eb;",
        "--el-color-info-light-9: #f4f4f5;",
        "--el-color-info-dark-2: #73767a;",
        "--el-bg-color: #ffffff;",
        "--el-bg-color-page: #f2f3f5;",
        "--el-bg-color-overlay: #ffffff;",
        "--el-text-color-primary: #303133;",
        "--el-text-color-regular: #606266;",
        "--el-text-color-secondary: #909399;",
        "--el-text-color-placeholder: #a8abb2;",
        "--el-text-color-disabled: #c0c4cc;",
        "--el-border-color: #dcdfe6;",
        "--el-border-color-light: #e4e7ed;",
        "--el-border-color-lighter: #ebeef5;",
        "--el-border-color-extra-light: #f2f6fc;",
        "--el-border-color-dark: #d4d7de;",
        "--el-border-color-darker: #cdd0d6;",
        "--el-fill-color: #f0f2f5;",
        "--el-fill-color-light: #f5f7fa;",
        "--el-fill-color-lighter: #fafafa;",
        "--el-fill-color-extra-light: #fafcff;",
        "--el-fill-color-dark: #ebedf0;",
        "--el-fill-color-darker: #e6e8eb;",
        "--el-fill-color-blank: #ffffff;",
      ],
      darkModeColors: [
        "--el-color-primary: #409eff;",
        "--el-color-primary-light-3: #3375b9;",
        "--el-color-primary-light-5: #2a598a;",
        "--el-color-primary-light-7: #213d5b;",
        "--el-color-primary-light-8: #1d3043;",
        "--el-color-primary-light-9: #18222c;",
        "--el-color-primary-dark-2: #66b1ff;",
        "--el-color-success: #67c23a;",
        "--el-color-success-light-3: #4e8e2f;",
        "--el-color-success-light-5: #3e6b27;",
        "--el-color-success-light-7: #2d481f;",
        "--el-color-success-light-8: #25371c;",
        "--el-color-success-light-9: #1c2518;",
        "--el-color-success-dark-2: #85ce61;",
        "--el-color-warning: #e6a23c;",
        "--el-color-warning-light-3: #a77730;",
        "--el-color-warning-light-5: #7d5b28;",
        "--el-color-warning-light-7: #533f20;",
        "--el-color-warning-light-8: #3e301c;",
        "--el-color-warning-light-9: #292218;",
        "--el-color-warning-dark-2: #ebb563;",
        "--el-color-danger: #f56c6c;",
        "--el-color-danger-light-3: #b25252;",
        "--el-fill-color-blank: transparent;",
        "--el-color-danger-light-5: #854040;",
        "--el-color-danger-light-7: #582e2e;",
        "--el-color-danger-light-8: #412626;",
        "--el-color-danger-light-9: #2b1d1d;",
        "--el-color-danger-dark-2: #f78989;",
        "--el-color-error: #f56c6c;",
        "--el-color-error-light-3: #b25252;",
        "--el-color-error-light-5: #854040;",
        "--el-color-error-light-7: #582e2e;",
        "--el-color-error-light-8: #412626;",
        "--el-color-error-light-9: #2b1d1d;",
        "--el-color-error-dark-2: #f78989;",
        "--el-color-info: #909399;",
        "--el-color-info-light-3: #6b6d71;",
        "--el-color-info-light-5: #525457;",
        "--el-color-info-light-7: #393a3c;",
        "--el-color-info-light-8: #2d2d2f;",
        "--el-color-info-light-9: #202121;",
        "--el-color-info-dark-2: #a6a9ad;",
        "--el-bg-color-page: #0a0a0a;",
        "--el-bg-color: #141414;",
        "--el-bg-color-overlay: #1d1e1f;",
        "--el-text-color-primary: #E5EAF3;",
        "--el-text-color-regular: #CFD3DC;",
        "--el-text-color-secondary: #A3A6AD;",
        "--el-text-color-placeholder: #8D9095;",
        "--el-text-color-disabled: #6C6E72;",
        "--el-border-color-darker: #636466;",
        "--el-border-color-dark: #58585B;",
        "--el-border-color: #4C4D4F;",
        "--el-border-color-light: #414243;",
        "--el-border-color-lighter: #363637;",
        "--el-border-color-extra-light: #2B2B2C;",
        "--el-fill-color-darker: #424243;",
        "--el-fill-color-dark: #39393A;",
        "--el-fill-color: #303030;",
        "--el-fill-color-light: #262727;",
        "--el-fill-color-lighter: #1D1D1D;",
        "--el-fill-color-extra-light: #191919;",
      ]
    }
  },
  methods: {
    extractColorVariable(colorVar) {
        return colorVar.match(/#\w+/gm);
    },
    copyText(text) {
      navigator.clipboard.writeText(text);
      ElNotification({
        title: "copied",
        message: text,
        duration: 2000
      })
    }
  }
}
</script>
<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  display: flex;
  padding: 1rem;
  cursor: pointer;
}

.list-item:hover {
  background-color: var(--el-color-primary-light-7);
}

.previewBox {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
</style>