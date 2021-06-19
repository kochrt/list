<template>
  <div class="lg:mx-24 mx-2 md:mx-12 mt-4 mb-24 max-w-7xl">
    <div class="chart-containerm md:my-12 mb-6" style="position: relative">
      <canvas ref="chartCanvas" width="400" height="200"></canvas>
    </div>
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

import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  PieController,
  ArcElement,
  Legend,
  Title,
  BarElement,
  BarController,
  Filler,
} from "chart.js";

const months = [
  "January",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default {
  components: {
    ListItem,
    AddYourCompany,
    Sidebar,
  },
  data() {
    return {
      chart: undefined,
      chartData: {
        labels: [],
        data: [],
      },
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

    const companiesByMonth = {};
    for (let item of list) {
      const dateAdded = new Date(item.added);
      const standardizedDate = dateAdded.setDate(1);
      if (!companiesByMonth[standardizedDate]) {
        companiesByMonth[standardizedDate] = 0;
      }
      companiesByMonth[standardizedDate] += 1;
    }

    const entries = Object.entries(companiesByMonth);
    entries
      .sort((monthA, monthB) => {
        return monthA[0] - monthB[0];
      })
      .map((month) => {
        const date = new Date(month[0]);
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
      });

    for (let i = 1; i < entries.length; i++) {
      entries[i][1] += entries[i - 1][1];
    }

    const monthTitles = entries.map((month) => month[0])
    const counts = entries.map((month) => month[1])

    monthTitles.unshift(new Date("May 1 2021").getTime())
    counts.unshift(counts[0])

    const chartData = {
      labels: monthTitles,
      data: counts,
    };
    return {
      chartData,
      list,
      sites,
      responses: responses[0].responses,
      entries,
    };
  },
  mounted() {
    this.registerChartComponents();
    this.setupChart();
  },
  methods: {
    setupChart() {
      const viewData = {
        labels: this.chartData.labels,
        datasets: [
          {
            label: "# companies",
            data: this.chartData.data,
            borderColor: "transparent",
            backgroundColor: "pink",
            fill: true,
            tension: 0.3,
            cubicInterpolationMode: "monotone",
            pointRadius: 0,
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            display: false,
            beginAtZero: true,
            min: 0,
            suggestedMax: 100,
            ticks: {
              // color: "mediumvioletred",
              font: {
                size: 16,
              },
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              callback(val, index) {
                const label = this.getLabelForValue(val);
                const date = new Date(parseInt(label));
                const now = new Date();
                if (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                ) {
                  return `${months[date.getMonth() - 1]} ${date.getFullYear()}`;
                }
                return ``;
              },
              font: {
                family: "Poppins",
                weight: "500",
              },
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title(a) {
                const date = new Date(parseInt(a[0].label));
                return `${months[date.getMonth() - 1]} ${date.getFullYear()}`;
              },
            },
          },
        },
      };
      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "line",
        data: viewData,
        options,
      });
    },
    registerChartComponents() {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        PieController,
        ArcElement,
        Legend,
        Title,
        BarElement,
        BarController,
        Filler
      );
    },
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
