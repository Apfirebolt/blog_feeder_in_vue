<template>
  <div class="min-h-full">
    <Navigation />
    <Header :page-heading="pageHeading" />

    <Loader v-if="isLoading" />
    <main v-else class="min-w-0 border-t border-gray-200">
      <!-- Experience Section -->
      <section class="container mx-auto my-3 px-2 py-4 bg-neutral-200">
        <div>
          <div class="flex justify-between px-6 py-2">
            <h2 class="text-xl font-bold">Experience</h2>
            <button
              class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
              @click="isExperienceFormOpened = true"
            >
              Add Experience
            </button>
          </div>
          <ul>
            <li
              v-for="experience in experienceList.posts"
              :key="experience.id"
            >
              <div>
                <h3 class="text-lg font-bold">{{ experience.title }}</h3>
                <p>{{ experience.content }}</p>

                <div class="px-2 py-3">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    @click="openExperienceEditForm(experience)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteInstance('experience', experience)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

       <!-- Skills Section -->
       <section class="container mx-auto my-3 px-2 py-4 bg-neutral-200">
        <div>
          <div class="flex justify-between px-6 py-2">
            <h2 class="text-xl font-bold">Skills</h2>
            <button
              class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
              @click="openAddSkillForm"
            >
              Add Skill
            </button>
          </div>
          {{ skillList }}
          <ul>
            <li
              v-for="skill in skillList.skills"
              :key="skill.id"
            >
              <div>
                <h3 class="text-lg font-bold">{{ skill.name }}</h3>
                <p>{{ skill.description }}</p>
                <p>
                  <span class="font-bold">Category:</span> {{ skill.category }}
                </p>

                <div class="px-2 py-3">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    @click="openSkillEditForm(skill)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteInstance('skill', skill)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Achievemenet Section -->
      <section class="container mx-auto my-3 px-2 py-4 bg-neutral-200">
        <div>
          <div class="flex justify-between px-6 py-2">
            <h2 class="text-xl font-bold">Achievements</h2>
            <button
              class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
              @click="openAddAchievementForm"
            >
              Add Achievement
            </button>
          </div>
          <ul>
            <li
              v-for="achievement in achievementList.achievements"
              :key="achievement.id"
            >
              <div>
                <h3 class="text-lg font-bold">{{ achievement.title }}</h3>
                <p>{{ achievement.content }}</p>

                <div class="px-2 py-3">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    @click="openAchievementEditForm(achievement)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteInstance('achievement', achievement)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Certificate Section -->

      <section class="container mx-auto my-3 px-2 py-4 bg-neutral-200">
        <div>
          <div class="flex justify-between px-6 py-2">
            <h2 class="text-xl font-bold">Certificate</h2>
            <button
              class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
              @click="isCertificateFormOpened = true"
            >
              Add Certificate
            </button>
          </div>

          {{ certificateList }}
          <ul>
            <li
              v-for="certificate in certificateList.certificates"
              :key="certificate._id"
            >
              <div>
                <h3 class="text-lg font-bold">{{ certificate.title }}</h3>
                <p>{{ certificate.content }}</p>
                <p>
                  <span class="font-bold">Issued By:</span> {{ certificate.issuedBy }}
                </p>

                <div class="px-2 py-3">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    @click="openCertificateEditForm(certificate)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteInstance('certificate', certificate)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <TransitionRoot appear :show="isAchievementFormOpened" as="template">
      <Dialog as="div" class="relative z-10" @close="closeAchievementForm">
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
                <AchievementForm
                  :achievement="selectedInstance"
                  :add-achievement-util="addAchievementUtil"
                  :update-achievement-util="updateAchievementUtil"
                  @close="setIsConfirmOpenFalse"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isExperienceFormOpened" as="template">
      <Dialog as="div" class="relative z-10" @close="closeExperienceForm">
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
                <ExperienceForm
                  :experience="selectedInstance"
                  :add-experience-util="addExperienceUtil"
                  :update-experience-util="updateExperienceUtil"
                  @close="closeExperienceForm"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isSkillFormOpened" as="template">
      <Dialog as="div" class="relative z-10" @close="closeSkillForm">
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
                <AddSkillForm
                  :skill="selectedInstance"
                  :add-skill-util="addSkillUtil"
                  :update-skill-util="updateSkillUtil"
                  @close="closeSkillForm"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isCertificateFormOpened" as="template">
      <Dialog as="div" class="relative z-10" @close="closeCertificateForm">
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
                <CertificateForm
                  :certificate="selectedInstance"
                  :add-certificate-util="addCertificateUtil"
                  :update-certificate-util="updateCertificateUtil"
                  @close="closeCertificateForm"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isConfirmDeleteModalOpen" as="template">
      <Dialog as="div" class="relative z-10" @close="closeConfirmDeleteModal">
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
                class="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ConfirmModal
                  :message="deleteMessage"
                  :confirm-action="deleteInstanceUtil"
                  :cancel-action="closeConfirmDeleteModal"
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
import { useResume } from "../store/resume";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import AchievementForm from "../components/forms/AchievementForm.vue";
import ExperienceForm from "../components/forms/ExperienceForm.vue";
import AddSkillForm from "../components/forms/AddSkillForm.vue";
import CertificateForm from "../components/forms/CertificateForm.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const resumeStore = useResume();
const pageHeading = ref("Resume");
const selectedInstance = ref(null);
const isConfirmDeleteModalOpen = ref(false);
const isFormOpened = ref(false);
const isAchievementFormOpened = ref(false);
const isExperienceFormOpened = ref(false);
const isSkillFormOpened = ref(false);
const isCertificateFormOpened = ref(false);
const instanceType = ref("achievement");
const deleteMessage = ref("");
const selectedTab = ref("achievements");
const tabOptions = ref([
  { name: "Achievements", value: "achievements" },
  { name: "Certificates", value: "certificates" },
  { name: "Skills", value: "skills" },
  { name: "Experiences", value: "experiences" },
]);

const achievementList = computed(() => resumeStore.getAchievementList);
const isLoading = computed(() => resumeStore.isLoading);

const setIsConfirmOpenTrue = () => {
  isFormOpened.value = true;
};

const closeAchievementForm = () => {
  isAchievementFormOpened.value = false;
};

const closeExperienceForm = () => {
  isExperienceFormOpened.value = false;
};

const closeSkillForm = () => {
  isSkillFormOpened.value = false;
};

const closeCertificateForm = () => {
  isCertificateFormOpened.value = false;
};

const openAchievementEditForm = (post) => {
  selectedInstance.value = post;
  isAchievementFormOpened.value = true;
};

const setIsConfirmOpenFalse = () => {
  isFormOpened.value = false;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const openAddAchievementForm = () => {
  selectedInstance.value = null;
  isAchievementFormOpened.value = true;
};

const addAchievementUtil = async (payload) => {
  isAchievementFormOpened.value = false;
  await resumeStore.addAchievementAction(payload);
  await resumeStore.getAchievementsAction();
};

const updateAchievementUtil = async (payload) => {
  setIsConfirmOpenTrue();
  await resumeStore.updateAchievementAction(payload);
  await resumeStore.getAchievementsAction();
  closeAchievementForm();
};

// Experience Section

const experienceList = computed(() => resumeStore.getExperienceList);

const addExperienceUtil = async (payload) => {
  closeExperienceForm();  
  await resumeStore.addExperienceAction(payload);
  await resumeStore.getExperiencesAction();
};

const openExperienceEditForm = (post) => {
  selectedInstance.value = post;
  isExperienceFormOpened.value = true;
};

const updateExperienceUtil = async (payload) => {
  closeExperienceForm();  
  await resumeStore.updateExperienceAction(payload);
  await resumeStore.getExperiencesAction();
};

// End Experience Section, Skill Section begins

const skillList = computed(() => resumeStore.getSkillList);

const openAddSkillForm = () => {
  selectedInstance.value = null;
  isSkillFormOpened.value = true;
};

const addSkillUtil = async (payload) => {
  closeSkillForm();  
  await resumeStore.addSkillAction(payload);
  await resumeStore.getSkillsAction();
};

const openSkillEditForm = (post) => {
  selectedInstance.value = post;
  isSkillFormOpened.value = true;
};

const updateSkillUtil = async (payload) => {
  closeSkillForm();  
  await resumeStore.updateSkillAction(payload);
  await resumeStore.getSkillsAction();
};

// Skill section ends, Certificate section begins

const certificateList = computed(() => resumeStore.getCertificateList);

const addCertificateUtil = async (payload) => {
  closeCertificateForm();
  await resumeStore.addCertificateAction(payload);
  await resumeStore.getCertificatesAction();
};

const openCertificateEditForm = (post) => {
  selectedInstance.value = post;
  isCertificateFormOpened.value = true;
};

const updateCertificateUtil = async (payload) => {
  closeCertificateForm();  
  await resumeStore.updateCertificateAction(payload);
  await resumeStore.getCertificatesAction();
};

const deleteInstance = (type, instance) => {
  console.log('Called delete instance ', type, instance)
  isConfirmDeleteModalOpen.value = true;
  instanceType.value = type;
  selectedInstance.value = instance;

  if (type === "achievement") {
    deleteMessage.value = `Are you sure you want to delete ${selectedInstance.value.title} Achievement?`;
  } else if (type === "experience") {
    deleteMessage.value = `Are you sure you want to delete ${selectedInstance.value.title} Experience?`;
  } else if (type === "skill") {
    deleteMessage.value = `Are you sure you want to delete ${selectedInstance.value.name} Skill?`;
  } else if (type === "certificate") {
    deleteMessage.value = `Are you sure you want to delete ${selectedInstance.value.title} Certificate?`;
  }
};

const deleteInstanceUtil = async () => {
  isConfirmDeleteModalOpen.value = false;  
  if (instanceType.value === "achievement") {
    await resumeStore.deleteAchievementAction(selectedInstance.value._id);
    await resumeStore.getAchievementsAction();
  } else if (instanceType.value === "experience") {
    await resumeStore.deleteExperienceAction(selectedInstance.value._id);
    await resumeStore.getExperiencesAction();
  } else if (instanceType.value === "skill") {
    await resumeStore.deleteSkillAction(selectedInstance.value._id);
    await resumeStore.getSkillsAction();
  } else if (instanceType.value === "certificate") {
    await resumeStore.deleteCertificateAction(selectedInstance.value._id);
    await resumeStore.getCertificatesAction();
  }
}; 

onMounted(() => {
  resumeStore.getAchievementsAction();
  resumeStore.getExperiencesAction();
  resumeStore.getSkillsAction();
  resumeStore.getCertificatesAction();
});
</script>
