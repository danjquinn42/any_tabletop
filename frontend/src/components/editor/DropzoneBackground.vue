<script setup>
import { Background } from "@vue-flow/background";
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="20" pattern-color="#888" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>
