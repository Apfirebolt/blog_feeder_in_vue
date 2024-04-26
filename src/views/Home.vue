<template>
  <div class="h-full flex flex-col">
    <!-- Top nav-->
    <header class="flex-shrink-0 relative h-16 bg-white flex items-center">
      <!-- Logo area -->
      <Logo />
      <!-- Menu button area -->
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
        <!-- Mobile menu button -->
        <button type="button"
          class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
          @click="open = true">
          <span class="sr-only">Open main menu</span>
          <MenuIcon class="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Desktop nav area -->
      <div class="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
        
        <!-- Dropdown -->
        <Dropdown :navigate-to="navigateTo" :navigation="navigation" />
      </div>

      <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed inset-0 z-40 lg:hidden" @close="open = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <DialogOverlay class="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
          </TransitionChild>

          <TransitionChild as="template" enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
            enter-from="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
            enter-to="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
            leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
            leave-from="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
            leave-to="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100">
            <nav
              class="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
              aria-label="Global">
              <div class="h-16 flex items-center justify-between px-4 sm:px-6">
                <a href="#">
                  <img class="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=400" alt="Workflow" />
                </a>
                <button type="button"
                  class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  @click="open = false">
                  <span class="sr-only">Close main menu</span>
                  <XIcon class="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div class="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                <template v-for="item in navigation" :key="item.name">
                  <a :href="item.href"
                    class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">{{
            item.name }}</a>
                  <button @click="navigateTo(child.routeName)" v-for="child in item.children" :key="child.name"
                    :href="child.href"
                    class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">
                    {{ child.name }}
                  </button>
                </template>
              </div>
            </nav>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </header>

    <!-- Bottom section -->
    <div class="min-h-0 overflow-hidden">
      <!-- Main area -->
      <main class="min-w-0 border-t border-gray-200">
        <div v-if="isLoadingAnimeList" class="flex justify-center items-center my-3">
          <Loader />
        </div>
        <div v-motion :initial="{
            opacity: 0,
            y: 100,
          }" :enter="{
            opacity: 1,
            y: 0,
          }" class="flex px-6 md:px-12 items-center justify-center bg-hero overflow-hidden">
          <div class="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
            <div class="w-full md:w-1/2 lg:pr-32">
              <h2 class="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">
                Jikan API
              </h2>
              <h3
                class="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
                The unofficial MyAnimeList API
              </h3>
              
              <div class="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
                <a href="https://docs.api.jikan.moe/"
                  class="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-blue-500 text-white border-2 border-blue-500">
                  Docs
                </a>
                <button
                  class="w-full mt-4 sm:mt-0 sm:ml-4 sm:w-40 px-4 py-3 rounded font-semibold text-md bg-white text-blue-500 border-2 border-gray-500">
                  Watch Demo
                </button>
              </div>
            </div>
            <div class="w-full md:w-1/2 flex justify-center md:justify-end">
              <img class="py-3 px-2"
                src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/Death-Note-Light-L-and-Ryuk-Cropped.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" />
            </div>
          </div>
        </div>
        <section aria-labelledby="message-heading"
          class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
          <Pagination v-if="animeList && animeList.pagination" :totalPages="animeList.pagination.last_visible_page"
            :currentPage="animeList.pagination.current_page" :nextPage="animeList.pagination.has_next_page"
            :onPageChange="onPageChange" />
          <div v-if="!isLoadingAnimeList" class="min-h-0 flex-1 overflow-y-auto">
            <!-- Thread section-->
            <ul role="list" class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
              <li v-for="item in animeList.data" :key="item.id" class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                <div class="sm:flex sm:justify-between sm:items-baseline">
                  <h3 class="text-base font-medium">
                    <span class="text-primary-700 text-lg">{{
            item.title
          }}</span>
                  </h3>
                </div>
                <div class="mt-4 space-y-6 text-sm text-gray-800">
                  <p>
                    {{ item.synopsis }}
                  </p>
                </div>
                <!--Contains images-->
                <div v-if="item.images && item.images.jpg" class="my-3 flex justify-center">
                  <img :src="item.images.jpg.image_url" alt="" class="shadow-lg rounded-md" />
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from "vue";
import { useAnime } from "../store/anime";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import Pagination from "../components/Pagination.vue";
import Dropdown from "../components/Dropdown.vue";
import { navigation } from "../constants/common";
import Logo from "../components/Logo.vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ArchiveIcon as ArchiveIconSolid,
  SearchIcon,
} from "@heroicons/vue/solid";
import {
  ArchiveIcon as ArchiveIconOutline,
  MenuIcon,
  XIcon,
} from "@heroicons/vue/outline";

const open = ref(false);
const anime = useAnime();
const currentPage = ref(1);
const router = useRouter();

const animeList = computed(() => anime.getAnimeList);
const isLoadingAnimeList = computed(() => anime.isLoading);

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

const onPageChange = async (page) => {
  currentPage.value = page;
  await anime.searchAnimeAction(searchText.value, page);
};

onMounted(() => {
  // Cleanup function to clear timeout on component unmount
  return () => clearTimeout(timeoutId);
});
</script>
