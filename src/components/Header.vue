<template>
  <header class="bg-gray-50 py-8">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
    >
      <div class="flex-1 min-w-0">
        <nav class="flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div>
                <a
                  href="#"
                  class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Jobs</a
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <ChevronRightIcon
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <a
                  href="#"
                  class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >Engineering</a
                >
              </div>
            </li>
          </ol>
        </nav>
        <h1
          class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
        >
          {{ pageHeading }}
        </h1>
      </div>
      <div class="mt-5 flex xl:mt-0 xl:ml-4">
        <span class="hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <PencilIcon
              class="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Edit
          </button>
        </span>

        <span class="hidden sm:block ml-3">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <LinkIcon
              class="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            View
          </button>
        </span>

        <!-- Dropdown -->
        <Menu as="span" class="ml-3 relative sm:hidden">
          <MenuButton
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            More
            <ChevronDownIcon
              class="-mr-1 ml-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </MenuButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Edit</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >View</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, defineProps, watch } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
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
} from "@heroicons/vue/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";

const user = {
  name: "Whitney Francis",
  email: "whitneyfrancis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
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
  },
  props: ['pageHeading'],
  setup(props) {
    console.log('Props ', props)

    const pageHeading = ref(props.pageHeading);
    // watch for change in props
    watch(() => props.pageHeading, (newVal, oldVal) => {
      console.log('New Value ', newVal)
      console.log('Old Value ', oldVal)
      pageHeading.value = newVal;
    })

    return {
      user,
      pageHeading
    };
    return {
      user,
      pageHeading
    };
  },
};
</script>
