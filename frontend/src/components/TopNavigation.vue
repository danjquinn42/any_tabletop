<template>
  <el-menu :default-active="$router.path" mode="horizontal" router>
    <el-text size="large" class="title">Any Tabletop</el-text>
    <el-image class="map-icon" src="/assets/favicon.png"></el-image>
    <el-menu-item v-if="!profileStore.loggedIn" index="/login"
      >Log In</el-menu-item
    >
    <el-text type="success" v-if="profileStore.loggedIn"
      >{{ profileStore.displayName }}
    </el-text>
    <el-text size="large"></el-text>
    <el-menu-item index="/edit/graph">Template Editor</el-menu-item>
    <el-form class="form">
      <el-form-item>
        <el-button @click="toggleDisplayMode">{{ displayMode }}</el-button>
      </el-form-item>
    </el-form>
  </el-menu>
</template>

<script>
import "element-plus/theme-chalk/el-menu.css";
import "element-plus/theme-chalk/el-menu-item.css";
import "element-plus/theme-chalk/el-sub-menu.css";
import { useProfileStore } from "../store/profileStore";
import {
  ElMenu,
  ElMenuItem,
  ElImage,
  ElSubMenu,
  ElText,
  ElFormItem,
  ElSwitch,
  ElForm,
  ElButton,
} from "element-plus";

export default {
  name: "top-navigation",
  components: {
    ElButton,
    ElForm,
    ElSwitch,
    ElFormItem,
    ElImage,
    ElText,
    ElSubMenu,
    ElMenuItem,
    ElMenu,
  },
  setup() {
    const profileStore = useProfileStore();
    return { profileStore };
  },
  data: function () {
    return {
      displayMode: "Dark Mode",
    };
  },
  methods: {
    toggleDisplayMode: function () {
      if (this.displayMode === "Dark Mode") {
        document.documentElement.classList.remove("dark");
        this.displayMode = "Light Mode";
      } else {
        document.documentElement.classList.add("dark");
        this.displayMode = "Dark Mode";
      }
    },
  },
};
</script>

<style>
.title {
  font-weight: bold;
}

.map-icon {
  margin: 16px;
  width: 24px;
  height: 24px;
}

.form {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
