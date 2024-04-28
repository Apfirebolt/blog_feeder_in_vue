<template>
  <div class="min-h-full">
    <Navigation />
    <Header :page-heading="pageHeading" />

    <Loader v-if="isLoading" />
    <main
      v-else
      class="min-w-0 border-t border-gray-200"
    >
      <div class="container mx-auto my-2">
        <button
          class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
          @click="openBlogForm"
        >
          Add Blog
        </button>
      </div>
      <div
        v-for="post in blogList.posts"
        :key="post._id"
        class="py-2 container mx-auto my-3"
      >
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <p class="text-gray-700 text-base">
              {{ post.title }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <p v-html="post.content" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Created :</label>
            <p class="text-gray-700 text-base">
              {{ post.createdAt }}
            </p>
          </div>
          <div>
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="openEditForm(post)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                @click="deleteBlog(post)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Delete
              </button>
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                @click="goToPostDetail(post)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        v-if="blogList"
        :current-page="currentPage"
        :total-pages="blogList && blogList.lastPage"
        :on-page-change="onPageChange"
      />
    </main>
    <TransitionRoot
      appear
      :show="isFormOpened"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="setIsConfirmOpenFalse"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-xxl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <BlogForm
                  :blog="selectedPost"
                  :add-blog-util="addBlogUtil"
                  :update-blog-util="updateBlogUtil"
                  @close="setIsConfirmOpenFalse"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      appear
      :show="isConfirmModalOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="closeConfirmModal"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ConfirmModal
                  :message="deleteConfirmMessage"
                  :confirm-action="deleteBlogUtil"
                  :cancel-action="closeConfirmModal"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBlog } from "../store/blog";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import BlogForm from "../components/forms/BlogForm.vue";
import Pagination from "../components/Pagination.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const router = useRouter();
const blogStore = useBlog();
const pageHeading = ref("Blogs");
const isFormOpened = ref(false);
const isConfirmModalOpen = ref(false);
const deleteConfirmMessage = ref("");
const selectedPost = ref(null);
const currentPage = ref(1);


const blogList = computed(() => blogStore.getBlogList);
const isLoading = computed(() => blogStore.isLoading);

const openBlogForm = () => {
  isFormOpened.value = true;
};

const openEditForm = (post) => {
  selectedPost.value = post;
  isFormOpened.value = true;
};

const addBlogUtil = async (payload) => {
  await blogStore.createBlogAction(payload);
  await blogStore.getBlogsAction(blogList.value.lastPage);
  currentPage.value = blogList.value.lastPage;
  isFormOpened.value = false;
};

const updateBlogUtil = async (payload) => {
  isFormOpened.value = true;
  await blogStore.updateBlogAction(payload);
  await blogStore.getBlogsAction(currentPage.value);
  isFormOpened.value = false;
};

const setIsConfirmOpenFalse = () => {
  isFormOpened.value = false;
};

const deleteBlog = async (post) => {
  selectedPost.value = post;
  deleteConfirmMessage.value = `Are you sure you want to delete ${post.title}?`;
  isConfirmModalOpen.value = true;
};

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false;
};

const deleteBlogUtil = async () => {
  await blogStore.deleteBlogAction(selectedPost.value._id);
  await blogStore.getBlogsAction(currentPage.value);
  isConfirmModalOpen.value = false;
};

const goToPostDetail = (post) => {
  router.push({ name: "BlogDetail", params: { id: post._id } });
};

const onPageChange = async (page) => {
  currentPage.value = page;
  await blogStore.getBlogsAction(currentPage.value);
};

onMounted(() => {
  blogStore.getBlogsAction();
});
</script>
