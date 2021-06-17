<template>
  <div class="">
    <recruiter-response :response="responses[index]"></recruiter-response>
    <div class="flex justify-center">
      <button @click="left" class="mr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </button>
      <button @click="right" class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["responses"],
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    left() {
      let i = this.index - 1;
      if (i < 0) {
        i = this.responses.length - 1;
      }
      this.index = i;
    },
    right() {
      let i = this.index + 1;
      if (i >= this.responses.length) {
        i = 0;
      }
      this.index = i;
    },
  },
};
</script>

<style>
</style>