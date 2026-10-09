<template>
  <div class="app-wrapper">
    <Navbar />
    <main>
      <HeroSection />
      <BrandFinderCore />
      <FeatureList />
      <FaqSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import BrandFinderCore from './components/BrandFinderCore.vue';
import FeatureList from './components/FeatureList.vue';
import FaqSection from './components/FaqSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
