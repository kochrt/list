<template>
  <div class="flex flex-col px-2 rounded mb-6">
    <div class="mb-1">
      <a
        href="https://github.com/kochrt/list#criteria"
        class="text-xl font-bold underline"
        >Criteria</a
      >
    </div>
    <div class="mb-8">
      <a
        href="https://raw.githubusercontent.com/kochrt/list/master/content/list.yaml"
        class="text-xl font-bold underline"
        >list.yaml</a
      >
    </div>
    <div class="flex flex-col mb-8 items-start">
      <a
        class="text-xl font-bold underline"
        :href="site.url"
        v-for="(site, index) in sites"
        :key="index"
        >{{ site.name }}</a
      >
    </div>
    <div class="flex flex-col md:max-w-lg mb-8">
      <h3 class="text-xl font-bold mb-1">Recruiter Responses</h3>
      <recruiter-responses :responses="responses"></recruiter-responses>
    </div>
    <p class="text-xl font-bold">
      This site is open source. <br /><a
        href="https://github.com/kochrt/list"
        class="underline"
        >Help improve it.</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import RecruiterResponses from "~/components/RecruiterResponses.vue";

export default {
  props: ["sites", "responses"],
  components: {
    RecruiterResponses,
  },
};
</script>

<style>
</style>