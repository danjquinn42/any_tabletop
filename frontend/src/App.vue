<template>
  <el-container v-loading="!modStore.isLoaded">
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView />
  </el-container>
  <el-dialog
    v-model="requireLogin"
    fullscreen
    title="Please Log In to Continue"
  >
    <h1>Whoa there buddy! ya gotta log in, eh?</h1>
    <el-button
      type="primary"
      size="large"
      @click="redirectToGoogleAuth"
      style="margin-top: 20px"
    >
      Log in with Google
    </el-button>
  </el-dialog>
</template>

<script>
import {
  ElPageHeader,
  ElContainer,
  ElHeader,
  ElFooter,
  ElText,
  ElLoading,
  ElDialog,
  ElButton,
} from "element-plus";
import "./index.css";
import TopNavigation from "./components/TopNavigation.vue";
import ZoomSlider from "./components/map/ZoomSlider.vue";
import "element-plus/es/components/descriptions/style/css";
import { useModStore } from "./store/modStore";
import { useProfileStore } from "./store/profileStore";
import { ref } from "vue";

const googleAuthUrl = ref("http://localhost:3000/auth/google");

export default {
  name: "App",
  components: {
    ElButton,
    ElDialog,
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
    return { modStore, profileStore };
  },
  computed: {
    requireLogin() {
      return !this.profileStore.loggedIn;
    },
  },
  mounted() {
    this.profileStore.init().then(() => {
      this.modStore.init();
    });
    console.log("profile logged in ", this.profileStore.loggedIn);
  },
  methods: {
    redirectToGoogleAuth() {
      window.location.href = googleAuthUrl.value;
    },
  },
  directives: {
    loading: ElLoading.directive,
  },
};
</script>
<style scoped></style>
