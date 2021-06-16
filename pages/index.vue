<template>
  <div class="lg:mx-24 lg:my-60 ml-2 mt-24 md:mx-12 md:my-24 max-w-5xl">
    <div class="flex flex-col items-start">
      <div class="flex flex-col items-start mb-6">
        <h2 class="text-7xl font-black">The list of companies</h2>
        <h3 class="text-2xl font-bold">that have a four day work week.</h3>
      </div>
      <div class="mb-6">
        <a
          href="https://github.com/kochrt/list#criteria"
          class="text-xl font-bold underline"
          >Criteria</a
        >
      </div>
      <add-your-company></add-your-company>
      <list-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import ListItem from "~/components/ListItem.vue";
import AddYourCompany from "~/components/AddYourCompany.vue"

export default {
  components: {
    ListItem, AddYourCompany
  },
  async asyncData(context: Context) {
    const [list, sites] = await Promise.all([
      context.$content().where({ slug: "list" }).fetch(),
     context.$content().where({ slug: "jobsites" }).fetch()
    ])
    return { list, sites };
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
