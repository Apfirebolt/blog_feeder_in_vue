<template>
  <!-- Pagination -->
  <nav
    class="border-t container mx-auto border-gray-200 px-4 flex items-center justify-between sm:px-3 py-2"
    aria-label="Pagination"
  >
    <div class="-mt-px w-0 flex-1 flex">
      <a
        class="px-2 rounded shadow-md inline-flex items-center font-medium"
      >
        <ArrowLeftIcon
          class="mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <span class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <div class="space-x-1 flex items-end ml-3">
        <a
          v-for="page in totalPages"
          :key="page"
          :class="currentPage === page ? 'bg-danger-700 text-neutral-100' : 'text-gray-500 hover:text-gray-700'"
          class="px-2 rounded shadow-md inline-flex items-center font-medium"
          @click="onPageChange(page)"
        >
          {{ page }}
        </a>
      </div>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        class="px-2 rounded shadow-md inline-flex items-center font-medium"
      >
        Next
        <ArrowRightIcon
          class="ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/outline";
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    default: 1,
    required: true,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});
</script>
