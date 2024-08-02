<template>
  <el-container
    style="height: 100vh; justify-content: center; align-items: center"
  >
    <el-header style="text-align: center; padding: 20px">
      <h1>Login or Create Account</h1>
    </el-header>
    <el-main style="text-align: center">
      <el-button
        type="primary"
        size="large"
        @click="redirectToGoogleAuth"
        style="margin-top: 20px"
      >
        Log in with Google
      </el-button>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { ElContainer, ElHeader, ElMain, ElButton } from "element-plus";

const googleAuthUrl = ref("http://localhost:3000/auth/google");

const redirectToGoogleAuth = () => {
  window.location.href = googleAuthUrl.value;
};
</script>

<style scoped></style>
