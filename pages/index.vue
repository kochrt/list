<template>
  <div class="lg:mx-24 mx-2 md:mx-12 mt-4 mb-24 max-w-7xl">
    <CompaniesChart :list="list"></CompaniesChart>
    <div class="flex flex-col items-start">
      <div class="flex flex-col items-start mb-6 px-2">
        <h2 class="text-5xl md:text-7xl font-black">The list of companies</h2>
        <h3 class="text-2xl font-bold">that have a four day work week.</h3>
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <div class="md:mr-8 mb-4 w-full">
          <div class="flex flex-row items-end justify-end">
            <select class="mb-2" v-model="countryFilter">
              <option selected>All countries</option>
              <option
                v-for="country in countryFlags"
                :key="country"
                :value="country"
              >
                {{ country }}
              </option>
            </select>
          </div>

          <list-item
            v-for="(item, index) in filteredList"
            :key="index"
            :item="item"
            :filteredByCountry="countryFilter !== 'All countries'"
          ></list-item>
          <add-your-company class="mt-4"></add-your-company>
        </div>
        <sidebar :sites="sites" :responses="responses"></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "~/components/ListItem.vue";
import AddYourCompany from "~/components/AddYourCompany.vue";
import Sidebar from "~/components/Sidebar.vue";
import CompaniesChart from "~/components/CompaniesChart.vue";

export default {
  components: {
    ListItem,
    AddYourCompany,
    Sidebar,
    CompaniesChart,
  },
  data() {
    return {
      countryFilter: "All countries",
    };
  },
  computed: {
    filteredList() {
      if (this.countryFilter === "All countries") {
        return this.list;
      }
      return this.list.filter((item) => item.basedIn === this.countryFilter);
    },
    countryFlags() {
      return new Set(
        this.list
          .map((i) => i.basedIn)
          .filter((country) => !!country)
          .sort()
      );
    },
  },
  async asyncData(context) {
    const [list, sites, responses] = await Promise.all(
      ["list", "jobsites", "responses"].map((slug) =>
        context.$content().where({ slug }).fetch()
      )
    );

    return {
      list,
      sites,
      responses: responses[0].responses,
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
