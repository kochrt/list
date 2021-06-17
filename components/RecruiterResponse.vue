<template>
  <div
    class="bg-gray-50 p-2 rounded mb-2 relative"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <button
      class="absolute copyButton px-2 py-1 bg-gray-200 shadow-lg rounded flex flex-row items-center"
      v-if="hovering"
      @click="copy"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        /></svg
      ><p>{{ copyButtonText }}</p>
    </button>
    <p class="font-mono text-sm whitespace-pre-wrap">{{ response }}</p>
  </div>
</template>

<script>
export default {
  props: ["response"],
  data() {
    return {
      hovering: false,
      copied: false
    };
  },
  watch: {
    copied(val, oldVal) {
      if (val) {
        setTimeout(() => this.copied = false, 5000)
      }
    }
  },
  computed: {
    copyButtonText() {
      return this.copied ? "Copied" : "Copy"
    }
  },
  methods: {
    copy() {
       if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = this.response;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy"); // Security exception may be thrown by some browsers.
          this.copied = true;
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }
      }
    }
  }
};
</script>

<style>
.copyButton {
  top: 2px;
  right: 2px;
}
</style>