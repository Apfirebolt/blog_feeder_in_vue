<template>
    <div class="min-h-full">
      <Navigation />
      <Header :pageHeading="pageHeading" />
  
      <Loader v-if="isLoading" />
      <main v-else class="min-w-0 border-t border-gray-200">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <p class="text-gray-700 text-base">{{ gallery.title }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Description</label
            >
            <p v-html="gallery.content" />
          </div>

          <div class="grid sm:grid-cols-3 gap-4">
            <div v-for="image in gallery.pictures" :key="image.id" class="relative">
              <img :src="getImageUrl(image)" alt="Image" class="w-full h-auto" />
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <p class="text-sm">{{ image.title }}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useGallery } from "../store/gallery";
  import { useRoute } from "vue-router";
  import Header from "../components/Header.vue";
  import Navigation from "../components/Navigation.vue";
  import Loader from "../components/Loader.vue";
  
  const galleryStore = useGallery();
  const route = useRoute();
  const pageHeading = computed(() => galleryStore.getGallery.title);
  
  const gallery = computed(() => galleryStore.getGallery);
  const isLoading = computed(() => galleryStore.isLoading);

  const getImageUrl = (image) => {
    return `https://apgiiit.com/uploads/${image.name}`;
  };
  
  onMounted(() => {
    galleryStore.getGalleryAction(route.params.id);
  });
  </script>
  