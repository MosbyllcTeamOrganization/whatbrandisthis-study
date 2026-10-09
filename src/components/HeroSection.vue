<template>
  <section class="hero-section">
    <div class="container hero-content">
      <div class="eyebrow">
        <span>🔍 AI Clothing & Logo Identifier</span>
      </div>
      <h1 class="hero-title">
        这是什么品牌？ <span class="highlight">拍张照一键识别</span>
      </h1>
      <p class="hero-desc">
        看不清衣服上的暗纹 Logo、刺绣或小图标？上传照片或描述图形外观，AI 智能识别全球时尚服饰、户外机能及奢侈品品牌。
      </p>
      
      <div class="hero-stats">
        <div class="stat-pill">⚡ 秒级极速比对</div>
        <div class="stat-pill">👔 覆盖全球50,000+品牌</div>
        <div class="stat-pill">✨ 包含正品特征比对</div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
  padding: 50px 0 24px;
  text-align: center;
}

.hero-content {
  max-width: 820px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 16px;
  color: var(--text-main);
}

.highlight {
  color: var(--primary);
  background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-pill {
  background: #fff;
  border: 1px solid var(--border);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
