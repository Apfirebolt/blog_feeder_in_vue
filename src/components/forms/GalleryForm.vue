<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="bg-white sm:rounded-lg sm:px-10">
      <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
        {{ gallery ? "Update Gallery" : "Add Gallery" }}
      </h2>
      <form
        class="space-y-6"
        @submit="onSubmit"
      >
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700"
          >
            Post Title
          </label>
          <div class="mt-1">
            <input
              id="title"
              v-bind="titleAttributes"
              v-model="title"
              name="title"
              type="text"
              placeholder="Enter Post Title"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
          <p class="my-2 text-red-800">
            {{ errors.title }}
          </p>
        </div>
  
        <div>
          <label
            for="content"
            class="block text-sm font-medium text-gray-700"
          >
            Post Content
          </label>
          <div class="mt-1">
            <QuillEditor
              ref="quill"
              v-model:content="quillContent"
              theme="snow"
              content-type="html"
            />
          </div>
        </div>
  
        <div>
          <button
            type="submit"
            class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ gallery ? "Update Gallery" : "Add Gallery" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { useForm } from "vee-validate";
  import { QuillEditor } from "@vueup/vue-quill";
  
  const props = defineProps({
    gallery: {
      type: Object,
      required: false,
    },
    addGalleryUtil: {
      type: Function,
      required: true,
    },
    updateGalleryUtil: {
      type: Function,
      required: true,
    },
  });
  
  const quillContent = ref("");
  const quill = ref();
  
  onMounted(() => {
    if (props.gallery) {
      title.value = props.gallery.title;
      quillContent.value = props.gallery.content;
    }
  });
  
  // Validation, or use `yup` or `zod`
  function required(value) {
    return value ? true : "This field is required";
  }
  
  // Create the form
  const { defineField, handleSubmit, errors } = useForm({
    validationSchema: {
      title: required,
    },
  });
  
  // Define fields
  const [title, titleAttributes] = defineField("title", {
    type: "text", // Initial type
    name: "name", // Initial name
  });
  
  // Submit handler
  const onSubmit = handleSubmit(async (values) => {
    if (props.gallery) {
      let updatePayload = { ...values, content: quillContent.value };
      await props.updateGalleryUtil({ ...updatePayload, id: props.gallery._id });
      return;
    }
    await props.addGalleryUtil({...values, content: quillContent.value });
  });
  </script>
  