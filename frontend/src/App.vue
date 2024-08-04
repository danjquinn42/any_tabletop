<template>
  <el-container
      v-loading="!modStore.isLoaded">
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView/>
  </el-container>
</template>

<script>
import {
  ElPageHeader,
  ElContainer,
  ElHeader,
  ElFooter,
  ElText,
  ElLoading,
} from "element-plus";
import "./index.css";
import TopNavigation from "./components/TopNavigation.vue";
import ZoomSlider from "./components/map/ZoomSlider.vue";
import "element-plus/es/components/descriptions/style/css";
import {useModStore} from "./store/modStore";
import {useProfileStore} from "./store/profileStore";

export default {
  name: "App",
  components: {
    ElText,
    TopNavigation,
    ElHeader,
    ElFooter,
    ElContainer,
    ElPageHeader,
    ZoomSlider,
    ElLoading,
  },
  setup() {
    const modStore = useModStore();
    const profileStore = useProfileStore();
    return {modStore, profileStore};
  },
  mounted() {
    this.profileStore.init().then(() => {
      this.modStore.init();
    });
  },
  directives: {
    loading: ElLoading.directive,
  },
};
</script>
<style scoped></style>
