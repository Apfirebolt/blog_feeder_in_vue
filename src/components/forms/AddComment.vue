<template>
    <div class="sm:mx-auto sm:w-full">
      <div class="bg-white sm:rounded-lg sm:px-10">
        <!-- Add Comment form should have name, email and content fields-->
        <h2 class="my-4 text-center text-xl font-extrabold text-gray-900">
          Add Comment
        </h2>
        <form class="space-y-6" @submit="onSubmit">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-bind="nameAttributes"
                v-model="name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.name }}
            </p>
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-bind="emailAttributes"
                v-model="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <p class="my-2 text-red-800">
              {{ errors.email }}
            </p>
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Enter Your Comment
            </label>
            <div class="mt-1">
              <textarea
                  id="content"
                  v-bind="contentAttributes"
                  v-model="content"
                  name="content"
                  placeholder="Enter Your Comment"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
              </textarea>
            </div>
            <p class="my-2 text-red-800">
              {{ errors.content }}
            </p>
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
  import { useForm } from "vee-validate";
  
  const props = defineProps({
    addCommentUtil: {
      type: Function,
      required: true,
    },
  });
  
  // Validation, or use `yup` or `zod`
  function required(value) {
    return value ? true : "This field is required";
  }
  
  // Create the form
  const { defineField, handleSubmit, errors } = useForm({
    validationSchema: {
      name: required,
      email: required,
      content: required
    },
  });
  
  // Define fields
  const [name, nameAttributes] = defineField("name", {
    type: "text", // Initial type
    name: "name", // Initial name
  });
  
  const [email, emailAttributes] = defineField("email", {
    type: "email", // Initial type
    name: "email", // Initial name
  });
  
  const [content, contentAttributes] = defineField("content", {
    type: "text", // Initial type
    name: "content", // Initial name
  });
  
  // Submit handler
  const onSubmit = handleSubmit(async (values) => {
    await props.addCommentUtil(values);
  });
  </script>
  