<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">全方位品牌识别能力</h2>
        <p class="section-subtitle">专为时尚买手、二手古着爱好者及日常穿搭用户打造</p>
      </div>

      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card"
        >
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FEATURES } from '../data/mockData';
const features = FEATURES;
</script>

<style scoped>
.features-section {
  padding: 50px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-main);
}

.section-subtitle {
  color: var(--text-muted);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-main);
}

.feature-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
