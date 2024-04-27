<template>
    <div class="sm:mx-auto sm:w-full">
      <div class="bg-white sm:rounded-lg sm:px-10">
        <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
          Add Gallery Image
        </h2>
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Image Title (Optional)
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="formData.title"
                name="name"
                type="text"
                placeholder="Enter Image Title"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
  
          <div class="flex rounded-lg overflow-hidden">
            <img
              v-if="previewImage"
              :src="previewImage"
              class="object-cover w-96 h-64 mr-2"
            />
          </div>
  
          <div class="text-center">
            <button
              @click="onFileUploadClick"
              class="flex-1 mb-3 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Photo
            </button>
          </div>
          <input type="file" ref="fileInput" @change="fileUploadChange" hidden />
  
          <div v-if="errorMessages" class="text-red-500 text-sm">
            {{ errorMessages }}
          </div>
  
          <div>
            <button
              type="submit"
              class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  
  const props = defineProps({
    addGalleryImageUtil: {
      type: Function,
      required: true,
    },
  });
  
  const fileInput = ref(null);
  const previewImage = ref(null);
  const errorMessages = ref(null);
  
  const formData = reactive({
    title: "",
    file: "",
  });
  
  const onFileUploadClick = () => {
    fileInput.value.click(); // Trigger the hidden file selection dialog
  };
  
  const fileUploadChange = (event) => {
    // Handle uploaded files here
    const files = event.target.files;
    console.log(files);
    formData.file = files[0];
  
    if (files && files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        previewImage.value = e.target.result;
      };
  
      reader.readAsDataURL(files[0]);
    }
  };
  
  // Submit handler
  const onSubmit = async () => {
    // Validate the form data, if image is null then return
    if (!formData.file) {
      errorMessages.value = "Please select an image to upload";
      return;
    } else {
      errorMessages.value = null;
      props.addGalleryImageUtil(formData);
    }
  };
  </script>
  