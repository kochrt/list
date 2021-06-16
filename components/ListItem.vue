<template>
  <a :href="item.url" class="listItem flex w-full p-3 bg-gray-50 mb-2 rounded hover:bg-gray-100">
    <div class="">
      <h1 class="text-3xl font-black">
        {{ item.company }}
      </h1>
      <h2 class="text-l">
        {{ item.snippet }}
      </h2>
    </div>
  </a>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
</style>