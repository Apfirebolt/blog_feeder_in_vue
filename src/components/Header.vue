<template>
    <header class="bg-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div class="flex-1 min-w-0">
            <nav class="flex" aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-700">Jobs</a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Engineering</a>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Back End Developer
            </h1>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Full-time
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <LocationMarkerIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Remote
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                $120k &ndash; $140k
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Closing on January 9, 2020
              </div>
            </div>
          </div>
          <div class="mt-5 flex xl:mt-0 xl:ml-4">
            <span class="hidden sm:block">
              <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Edit
              </button>
            </span>
  
            <span class="hidden sm:block ml-3">
              <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <LinkIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                View
              </button>
            </span>
  
            <span class="sm:ml-3 relative z-0">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="sr-only">
                  Change published status
                </ListboxLabel>
                <div class="relative">
                  <div class="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                    <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                      <div class="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        <p class="ml-2.5 text-sm font-medium">{{ selected.name }}</p>
                      </div>
                      <ListboxButton class="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                        <span class="sr-only">Change published status</span>
                        <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                      </ListboxButton>
                    </div>
                  </div>
  
                  <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                      <ListboxOption as="template" v-for="option in publishingOptions" :key="option.name" :value="option" v-slot="{ active, selected }">
                        <li :class="[active ? 'text-white bg-purple-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm']">
                          <div class="flex flex-col">
                            <div class="flex justify-between">
                              <p :class="selected ? 'font-semibold' : 'font-normal'">
                                {{ option.name }}
                              </p>
                              <span v-if="selected" :class="active ? 'text-white' : 'text-purple-500'">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </div>
                            <p :class="[active ? 'text-purple-200' : 'text-gray-500', 'mt-2']">
                              {{ option.description }}
                            </p>
                          </div>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </span>
  
            <!-- Dropdown -->
            <Menu as="span" class="ml-3 relative sm:hidden">
              <MenuButton class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                More
                <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              </MenuButton>
  
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </header>
  </template>
  
  <script>
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'
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
  
  const user = {
    name: 'Whitney Francis',
    email: 'whitneyfrancis@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  
  const publishingOptions = [
    { name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
    { name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
  ]
  
  export default {
    components: {
      Listbox,
      ListboxButton,
      ListboxLabel,
      ListboxOption,
      ListboxOptions,
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
    setup() {
      const selected = ref(publishingOptions[0])
  
      return {
        user,
        publishingOptions,
        selected,
      }
    },
  }
  </script>