<template>
  <a :href="item.url" class="flex w-full p-3 bg-gray-50 hover:bg-gray-100 mb-2 rounded transition">
    <div class="flex flex-col items-start">
      <h1 class="text-3xl font-black">
        {{ item.company }}
      </h1>
      <h2 class="text-sm mb-1 text-pink-700 font-mono font-semibold">Since {{ whenAddedText }}</h2>
      <h2 class="text-l">
        {{ item.snippet }}
      </h2>
    </div>
  </a>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    isoDate() {
      return new Date(this.item.added)
    },
    beforeSite() {
      return this.isoDate < new Date("June 20 2021")
    },
    whenAddedText() {
      return this.beforeSite ? "before this site was created" : this.item.added
    }
  }
};
</script>

<style>
</style>