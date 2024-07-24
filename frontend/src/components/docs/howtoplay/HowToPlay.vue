<template>
  <el-text>
    <p>
      The default module is written for DnD 5th edition. Check out
      <a href="https://www.dndbeyond.com/how-to-play-dnd">DnD Beyond</a>
      or get a copy of the Players Handbook. There are tons of free resources
      online for learning how to play.
    </p>
    <p>
      Do you want to play with a different game system? Write a mod that makes
      that possible and replace this text with your instructions!
    </p>
  </el-text>
</template>

<script>
import { ElText, ElLink } from "element-plus";

export default {
  name: "HowToPlay",
  components: { ElLink, ElText },
};
</script>

<style scoped></style>
