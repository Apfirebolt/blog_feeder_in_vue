<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="bg-white sm:rounded-lg sm:px-10">
      <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
        {{ project ? "Update Project" : "Add Project" }}
      </h2>
      <form class="space-y-6" @submit="onSubmit">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Project Title
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
            />
          </div>
          <p class="my-2 text-red-800">
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">
            Project Content
          </label>
          <div class="mt-1">
            <QuillEditor
              theme="snow"
              v-model:content="quillContent"
              contentType="html"
              ref="quill"
            />
          </div>
        </div>

        <div>
          <label for="technology" class="block text-sm font-medium text-gray-700">
            Technologies used (separated by comma)
          </label>
          <div class="mt-1">
            <input
              id="technology"
              v-bind="technologyAttributes"
              v-model="technology"
              name="technology"
              type="text"
              placeholder="Technologies used"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <p class="my-2 text-red-800">
            {{ errors.technology }}
          </p>
        </div>

        <div>
          <label for="projectUrl" class="block text-sm font-medium text-gray-700">
            Github URL of the project
          </label>
          <div class="mt-1">
            <input
              id="projectUrl"
              v-bind="projectUrlAttributes"
              v-model="projectUrl"
              name="projectUrl"
              type="text"
              placeholder="Project URL"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <p class="my-2 text-red-800">
            {{ errors.projectUrl }}
          </p>
        </div>

        <div>
          <button
            type="submit"
            class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ project ? "Update Project" : "Add Project" }}
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
  project: {
    type: Object,
    required: false,
  },
  addProjectUtil: {
    type: Function,
    required: true,
  },
  updateProjectUtil: {
    type: Function,
    required: true,
  },
});

const quillContent = ref("");
const quill = ref();

onMounted(() => {
  if (props.project) {
    title.value = props.project.title;
    quillContent.value = props.project.content;
    technology.value = props.project.technology;
    projectUrl.value = props.project.projectUrl;
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
    technology: required,
    projectUrl: required,
  },
});

// Define fields
const [title, titleAttributes] = defineField("title", {
  type: "text", // Initial type
  name: "name", // Initial name
});

const [technology, technologyAttributes] = defineField("technology", {
  type: "text", // Initial type
  name: "technology", // Initial name
});

const [projectUrl, projectUrlAttributes] = defineField("projectUrl", {
  type: "text", // Initial type
  name: "projectUrl", // Initial name
});

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  if (props.project) {
    let updatePayload = { ...values, content: quillContent.value };
    await props.updateProjectUtil({ ...updatePayload, id: props.project._id });
    return;
  }
  await props.addProjectUtil({ ...values, content: quillContent.value });
});
</script>
