<template>
  <div class="min-h-full">
    <Navigation />
    <Header />

    <main class="pt-8 pb-16">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <section class="py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="rounded-lg shadow-xl overflow-hidden">
              <div class="md:flex">
                <div class="md:flex-shrink-0">
                  <img
                    class="h-48 w-full object-cover md:w-48"
                    :src="Logo"
                    alt="Hero Image"
                  >
                </div>
                <div class="p-8">
                  <div class="uppercase tracking-wide text-sm font-semibold">
                    Welcome to our blog - A Small Change
                  </div>
                  <a
                    href="#"
                    class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >Read the latest articles</a>
                  <p class="mt-2 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non feugiat lacus. Maecenas non semper justo, nec aliquet ante. Fusce sed enim vitae nunc lacinia eleifend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
import Logo from "../assets/logo.png";
</script>