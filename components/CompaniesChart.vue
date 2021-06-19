<template>
  <div class="md:my-12 mb-6" style="position: relative">
    <canvas ref="chartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script>
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

export default {
  props: ["list"],
  data() {
    return {
      chart: undefined,
      chartData: {
        labels: [],
        data: [],
      },
    };
  },
  mounted() {
    this.registerChartComponents();
    const companiesByMonth = {};
    for (let item of this.list) {
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

    const monthTitles = entries.map((month) => month[0]);
    const counts = entries.map((month) => month[1]);

    monthTitles.unshift(new Date("May 1 2021").getTime());
    counts.unshift(counts[0]);

    this.chartData = {
      labels: monthTitles,
      data: counts,
    };
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
</style>