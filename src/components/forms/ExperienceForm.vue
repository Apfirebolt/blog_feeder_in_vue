<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="bg-white sm:rounded-lg sm:px-10">
      <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
        {{ experience ? "Update Experience" : "Add Experience" }}
      </h2>
      <form class="space-y-6" @submit="onSubmit">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Experience Title
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
            <label for="startDate" class="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <div class="mt-1">
              <input
                id="startDate"
                v-model="startDate"
                name="title"
                type="date"
                placeholder="Enter Start Date"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <div class="mt-1">
              <input
                id="endDate"
                v-model="endDate"
                name="endDate"
                type="date"
                placeholder="Enter End Date"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- 2 column layout in tailwind grid -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="location"
              class="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div class="mt-1">
              <input
                id="title"
                v-bind="locationAttributes"
                v-model="location"
                name="location"
                type="text"
                placeholder="Enter Location"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.location }}
            </p>
          </div>
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div class="mt-1">
              <input
                id="title"
                v-bind="companyAttributes"
                v-model="company"
                name="company"
                type="text"
                placeholder="Enter Company Name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.company }}
            </p>
          </div>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">
            Describe Your Experience
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
            {{ experience ? "Update Experience" : "Add Experience" }}
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
  experience: {
    type: Object,
    required: false,
  },
  addExperienceUtil: {
    type: Function,
    required: true,
  },
  updateExperienceUtil: {
    type: Function,
    required: true,
  },
});

const quillContent = ref("");
const quill = ref();

onMounted(() => {
  if (props.experience) {
    title.value = props.experience.title;
    location.value = props.experience.location;
    company.value = props.experience.company;
    startDate.value = props.experience.startDate;
    endDate.value = props.experience.endDate;
    quillContent.value = props.experience.content;
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
    location: required,
    company: required,
  },
});

// Define fields
const [title, titleAttributes] = defineField("title", {
  type: "text", // Initial type
  name: "title", // Initial name
});

const [location, locationAttributes] = defineField("location", {
  type: "text", // Initial type
  name: "location", // Initial name
});

const [company, companyAttributes] = defineField("company", {
  type: "text", // Initial type
  name: "company", // Initial name
});

const [startDate, startDateAttributes] = defineField("startDate", {
  type: "date", // Initial type
  name: "startDate", // Initial name
});

const [endDate, endDateAttributes] = defineField("endDate", {
  type: "date", // Initial type
  name: "endDate", // Initial name
});

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  if (props.experience) {
    let updatePayload = { ...values, content: quillContent.value };
    await props.updateExperienceUtil({
      ...updatePayload,
      id: props.experience._id,
    });
    return;
  }
  await props.addExperienceUtil({ ...values, content: quillContent.value });
});
</script>
