<template>
  <div>
    <h1>Login</h1>
    <a :href="googleAuthUrl">Log in with Google</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      googleAuthUrl: "http://localhost:3000/auth/google",
    };
  },
};
</script>
