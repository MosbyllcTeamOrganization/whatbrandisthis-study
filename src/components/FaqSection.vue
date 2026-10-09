<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">常见问题 (FAQ)</h2>
        <p class="section-subtitle">关于品牌识别与本 Vue 教学案例的技术说明</p>
      </div>

      <div class="faq-list">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ open: openIdx === index }"
        >
          <button class="faq-question" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <span class="faq-arrow">{{ openIdx === index ? '▲' : '▼' }}</span>
          </button>
          <div v-show="openIdx === index" class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { FAQS } from '../data/mockData';

const faqs = FAQS;
const openIdx = ref(0);

const toggle = (i) => {
  openIdx.value = openIdx.value === i ? null : i;
};
</script>

<style scoped>
.faq-section {
  padding: 60px 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--text-muted);
}

.faq-list {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
}

.faq-item.open {
  border-color: var(--primary);
}

.faq-question {
  width: 100%;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  text-align: left;
}

.faq-arrow {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.faq-answer {
  padding: 0 20px 18px;
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
