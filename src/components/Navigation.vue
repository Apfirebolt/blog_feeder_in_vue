<template>
    <div class="min-h-full">
      <!-- Navbar -->
      <Disclosure as="nav" class="bg-gray-50" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative h-16 flex items-center justify-between border-b border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=violet&shade=500" alt="Workflow" />
              </div>
  
              <!-- Links section -->
              <div class="hidden lg:block lg:ml-10">
                <div class="flex space-x-4">
                  <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.routeName }" :class="[item.current ? 'bg-gray-100' : 'hover:text-gray-700', 'px-3 py-2 rounded-md text-sm font-medium text-gray-900']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
                </div>
              </div>
            </div>
  
            <div class="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
              <!-- Search section -->
              <div class="max-w-lg w-full lg:max-w-xs">
                <label for="search" class="sr-only">Search</label>
                <div class="relative text-gray-400 focus-within:text-gray-500">
                  <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input id="search" class="block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:placeholder-gray-500 sm:text-sm" placeholder="Search" type="search" name="search" />
                </div>
              </div>
            </div>
            <div class="flex lg:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="bg-gray-50 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <span class="sr-only">Open main menu</span>
                <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
  
            <!-- Actions section -->
            <div class="hidden lg:block lg:ml-4">
              <div class="flex items-center">
                <button type="button" class="bg-gray-50 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
  
                <!-- Profile dropdown -->
                <Menu as="div" class="ml-3 relative flex-shrink-0">
                  <div>
                    <MenuButton class="bg-gray-50 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                      <span class="sr-only">Open user menu</span>
                      <img class="rounded-full h-8 w-8" :src="user.imageUrl" alt="" />
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']">
                          {{ item.name }}
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
  
        <DisclosurePanel class="bg-gray-50 border-b border-gray-200 lg:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-100' : 'hover:bg-gray-100', 'block px-3 py-2 rounded-md font-medium text-gray-900']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="px-5 flex items-center">
              <div class="flex-shrink-0">
                <img class="rounded-full h-10 w-10" :src="user.imageUrl" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
                <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
              </div>
              <button type="button" class="ml-auto bg-gray-50 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">{{ item.name }}</DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import Header from '../components/Header.vue'
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
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
  const navigation = [
    { name: 'Dashboard', routeName: 'Dashboard', current: true },
    { name: 'Projects', routeName: 'Project', current: false },
    { name: 'Gallery', routeName: 'Gallery', current: false },
    { name: 'Blog', routeName: 'Blog', current: false },
    { name: 'Contact', routeName: 'Contact', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', routeName: '#' },
    { name: 'Settings', routeName: '#' },
    { name: 'Sign out', routeName: '#' },
  ]
  
  export default {
    components: {
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
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
      Header,
    },
    setup() {
  
      return {
        user,
        navigation,
        userNavigation,
      }
    },
  }
  </script>