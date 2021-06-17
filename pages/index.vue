<template>
  <div class="lg:mx-24 lg:my-60 mx-2 mt-24 md:mx-12 md:my-24 max-w-7xl">
    <div class="flex flex-col items-start">
      <div class="flex flex-col items-start mb-6 px-2">
        <h2 class="text-5xl md:text-7xl font-black">The list of companies</h2>
        <h3 class="text-2xl font-bold">that have a four day work week.</h3>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="md:mr-8 mb-4">
          <list-item
            v-for="(item, index) in list"
            :key="index"
            :item="item"
          ></list-item>
          <add-your-company class="mt-4"></add-your-company>
        </div>
        <sidebar :sites="sites" :responses="responses"></sidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import ListItem from "~/components/ListItem.vue";
import AddYourCompany from "~/components/AddYourCompany.vue";
import Sidebar from "~/components/Sidebar.vue";
import { IContentDocument } from '@nuxt/content/types/content';

export default {
  components: {
    ListItem,
    AddYourCompany,
    Sidebar,
  },
  async asyncData(context: Context) {
    const [list, sites, responses] = await Promise.all(
      ["list", "jobsites", "responses"].map((slug) =>
        context.$content().where({ slug }).fetch()
      )
    );
    return {
      list,
      sites,
      responses: (responses as IContentDocument[])[0].responses,
    };
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
