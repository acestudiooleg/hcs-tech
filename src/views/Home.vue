<template>
  <v-layout>
    <div class="container"></div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import VLayout from "@/layouts/Default.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    VLayout,
    HelloWorld
  }
};
</script>
