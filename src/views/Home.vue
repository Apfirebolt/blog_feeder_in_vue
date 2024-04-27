<template>
  <div class="min-h-full">
    <Navigation />
    <Header />

    <main class="pt-8 pb-16">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0">
          <h2 class="text-lg font-medium text-gray-900">Candidates</h2>

          <!-- Tabs -->
          <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select id="tabs" name="tabs" class="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
              <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav class="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">
                  {{ tab.name }}
                  <span v-if="tab.count" :class="[tab.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']">{{ tab.count }}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Stacked list -->
        <ul role="list" class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
          <li v-for="candidate in candidates" :key="candidate.email">
            <a href="#" class="group block">
              <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="flex-shrink-0">
                    <img class="h-12 w-12 rounded-full group-hover:opacity-75" :src="candidate.imageUrl" alt="" />
                  </div>
                  <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p class="text-sm font-medium text-purple-600 truncate">{{ candidate.name }}</p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span class="truncate">{{ candidate.email }}</span>
                      </p>
                    </div>
                    <div class="hidden md:block">
                      <div>
                        <p class="text-sm text-gray-900">
                          Applied on
                          {{ ' ' }}
                          <time :datetime="candidate.appliedDatetime">{{ candidate.applied }}</time>
                        </p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                          {{ candidate.status }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </main>
    <p>
      A new content {{ quillContent }}
    </p>
    <button class="bg-red-800 p-3 rounded text-white" @click="showData">
      Show Data
    </button>
    <div class="container my-3 mx-auto">
      <QuillEditor
          theme="snow"
          v-model:content="quillContent"
          contentType="html"
          ref="quill"
        />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
  SearchIcon,
} from '@heroicons/vue/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
]
const candidates = [
  {
    name: 'Emily Selman',
    email: 'emilyselman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: 'January 7, 2020',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
  },
  // More candidates...
]
const publishingOptions = [
  { name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

const showData = () => {
  console.log('Value of content ', content.value)
}

const handleEditorChange = (value) => {
  content.value = value
  console.log('Value of content ', content.value)
}

const quillContent = ref('')
const quill = ref()

export default {
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    BellIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    MailIcon,
    MenuIcon,
    PencilIcon,
    SearchIcon,
    XIcon,
    Header,
    Navigation,
    QuillEditor
  },
  setup() {
    const selected = ref(publishingOptions[0])

    return {
      tabs,
      candidates,
      publishingOptions,
      selected,
      quillContent,
      quill,
      showData,
    }
  },
}
</script>