<template>
  <header class="bg-gray-50 py-8">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
    >
      <div class="flex-1 min-w-0">
        <h1
          class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
        >
          {{ pageHeading }}
        </h1>
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
    const pageHeading = ref(props.pageHeading);
    // watch for change in props
    watch(() => props.pageHeading, (newVal, oldVal) => {
      pageHeading.value = newVal;
    })

    return {
      user,
      pageHeading
    };
  },
};
</script>
