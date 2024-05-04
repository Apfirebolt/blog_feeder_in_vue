<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="bg-white sm:rounded-lg sm:px-10">
      <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
        {{ skill ? "Update Skill" : "Add Skill" }}
      </h2>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Skill Name
            </label>
            <div class="mt-1">
              <input
                id="title"
                v-bind="nameAttributes"
                v-model="name"
                name="name"
                type="text"
                placeholder="Enter Skill Name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label
              for="category"
              class="block text-sm font-medium text-gray-700"
            >
              Skill Category
            </label>
            <div class="mt-1">
              <input
                id="issuedBy"
                v-bind="categoryAttributes"
                v-model="category"
                name="category"
                type="text"
                placeholder="Skill Category"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.category }}
            </p>
          </div>

          <div>
            <label
              for="level"
              class="block text-sm font-medium text-gray-700"
            >
              Skill Level
            </label>
            <div class="mt-1">
              <input
                id="issuedBy"
                v-bind="levelAttributes"
                v-model="level"
                name="level"
                type="text"
                placeholder="Skill Level"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.level }}
            </p>
          </div>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
          >
            Describe Your Skill
          </label>
          <div class="mt-1">
            <textarea
              id="description"
              v-bind="descriptionAttributes"
              v-model="description"
              name="description"
              placeholder="Describe your skill"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            class="flex-1 mb-3 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="onFileUploadClick"
          >
            Upload Skill Image
          </button>
        </div>
        <input ref="fileInput" type="file" hidden @change="fileUploadChange" />

        <div>
          <button
            type="submit"
            class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ skill ? "Update Skill" : "Add Skill" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useForm } from "vee-validate";

const props = defineProps({
  skill: {
    type: Object,
    required: false,
  },
  addSkillUtil: {
    type: Function,
    required: true,
  },
  updateSkillUtil: {
    type: Function,
    required: true,
  },
});

const fileInput = ref(null);
const formData = reactive({
  file: "",
});

onMounted(() => {
  if (props.skill) {
    name.value = props.skill.name;
    description.value = props.skill.description;
    level.value = props.skill.level;
    category.value = props.skill.category;
  }
});

// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : "This field is required";
}

// Create the form
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    name: required,
    level: required,
    category: required,
  },
});

// Define fields
const [name, nameAttributes] = defineField("name", {
  type: "text", // Initial type
  name: "name", // Initial name
});
//  // name, logo, description, level, category
const [description, descriptionAttributes] = defineField("description", {
  type: "text", // Initial type
  name: "description", // Initial name
});

const [level, levelAttributes] = defineField("level", {
  type: "text", // Initial type
  name: "level", // Initial name
});

const [category, categoryAttributes] = defineField("category", {
  type: "text", // Initial type
  name: "category", // Initial name
});

const fileUploadChange = (event) => {
  // Handle uploaded files here
  const files = event.target.files;
  console.log(files);
  formData.file = files[0];

  if (files && files[0]) {
    const reader = new FileReader();

    // reader.onload = (e) => {
    //   previewImage.value = e.target.result;
    // };

    reader.readAsDataURL(files[0]);
  }
};

const onFileUploadClick = () => {
  fileInput.value.click(); // Trigger the hidden file selection dialog
};

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  if (props.skill) {
    let updatePayload = { ...values, file: formData.file };
    await props.updateSkillUtil({
      ...updatePayload,
      id: props.skill._id,
    });
    return;
  }
  await props.addSkillUtil({ ...values, file: formData.file });
});
</script>
