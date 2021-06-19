<template>
  <a
    :href="item.url"
    class="
      flex
      w-full
      p-4
      bg-white
      border
      hover:border-pink-600
      mb-4
      rounded
      transition
    "
  >
    <div class="flex flex-col items-start w-full">
      <div class="flex flex-row w-full">
        <div class="flex flex-row items-baseline">
          <img :src="item.iconUrl" class="h-5 w-5 mr-2" />
          <h1 class="text-3xl font-black">
            {{ item.company }}
          </h1>
        </div>
      </div>
      <h2 class="text-sm mb-1 text-pink-700 font-mono font-semibold">
        Since {{ whenAddedText }}
      </h2>
      <h2 class="text-l">
        {{ item.snippet }}
      </h2>
      <div class="flex items-start flex-grow pt-2" v-if="countryCode && filteredByCountry">
        <img
          class="w-5 ml-auto pt-2"
          :src="`https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${countryCode}.svg`"
        />
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ["item", "filteredByCountry"],
  computed: {
    isoDate() {
      return new Date(this.item.added);
    },
    beforeSite() {
      return this.isoDate < new Date("June 20 2021");
    },
    whenAddedText() {
      return this.beforeSite ? "before this site was created" : this.item.added;
    },
    domain() {
      return this.item.url.substring(this.item.url.indexOf("://") + 3);
    },
    countryCode() {
      if (this.item.basedIn) {
        const lowerCased = this.item.basedIn.toLowerCase();
        if (lowerCased === "uk") {
          return "gb";
        }
        return lowerCased;
      }
      return null;
    },
  },
};
</script>

<style>
</style>