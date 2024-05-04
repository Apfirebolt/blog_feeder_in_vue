<template>
  <div class="sm:mx-auto sm:w-full">
    <div class="bg-white sm:rounded-lg sm:px-10">
      <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
        {{ certificate ? "Update Certificate" : "Add Certificate" }}
      </h2>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Certificate Title
            </label>
            <div class="mt-1">
              <input id="title" v-bind="titleAttributes" v-model="title" name="title" type="text"
                placeholder="Enter Post Title"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label for="issuedBy" class="block text-sm font-medium text-gray-700">
              Certificate Issued By
            </label>
            <div class="mt-1">
              <input id="issuedBy" v-bind="issuedByAttributes" v-model="issuedBy" name="issuedBy" type="text"
                placeholder="Issued By"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.issuedBy }}
            </p>
          </div>

          <div>
            <label for="certificateId" class="block text-sm font-medium text-gray-700">
              Certificate ID
            </label>
            <div class="mt-1">
              <input id="certificateId" v-bind="certificateIdAttributes" v-model="certificateId" name="certificateId"
                type="text" placeholder="Enter Certificate ID"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.certificateId }}
            </p>
          </div>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">
            Describe Your certificate
          </label>
          <div class="mt-1">
            <QuillEditor ref="quill" v-model:content="quillContent" theme="snow" content-type="html" />
          </div>
        </div>
        <div class="text-center">
          <button
            class="flex-1 mb-3 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="onFileUploadClick"
          >
            Upload Photo
          </button>
        </div>
        <input
          ref="fileInput"
          type="file"
          hidden
          @change="fileUploadChange"
        />

        <div>
          <button type="submit"
            class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ certificate ? "Update Certificate" : "Add Certificate" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useForm } from "vee-validate";
import { QuillEditor } from "@vueup/vue-quill";

const props = defineProps({
  certificate: {
    type: Object,
    required: false,
  },
  addCertificateUtil: {
    type: Function,
    required: true,
  },
  updateCertificateUtil: {
    type: Function,
    required: true,
  },
});

const quillContent = ref("");
const quill = ref();
const fileInput = ref(null);

const formData = reactive({
  file: "",
});

onMounted(() => {
  if (props.certificate) {
    title.value = props.certificate.title;
    issuedBy.value = props.certificate.issuedBy;
    quillContent.value = props.certificate.content;
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
    certificateId: required,
  },
});

// Define fields
const [title, titleAttributes] = defineField("title", {
  type: "text", // Initial type
  name: "title", // Initial name
});

const [issuedBy, issuedByAttributes] = defineField("issuedBy", {
  type: "text", // Initial type
  name: "issuedBy", // Initial name
});

const [certificateId, certificateIdAttributes] = defineField("certificateId", {
  type: "text", // Initial type
  name: "certificateId", // Initial name
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
  if (props.certificate) {
    let updatePayload = { ...values, content: quillContent.value, file: formData.file };
    await props.updateCertificateUtil({
      ...updatePayload,
      id: props.certificate._id,
    });
    return;
  }
  await props.addCertificateUtil({ ...values, content: quillContent.value, file: formData.file });
});
</script>