<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <span class="logo">🏷️ WhatBrandIsThis</span>
        <p class="desc">
          本页面为前端教学演示项目，基于 Vue 3 架构重构复刻，仅作为前端界面壳子及源码分析学习。
        </p>
      </div>

      <div class="footer-links">
        <div class="col">
          <h4>功能导航</h4>
          <a href="#finder">识别工具</a>
          <a href="#features">识别特性</a>
          <a href="#faq">常见问题</a>
        </div>
        <div class="col">
          <h4>学习要点</h4>
          <span>FileReader 浏览器预览</span>
          <span>Vue 3 Composition API</span>
          <span>无敏感凭据 / 纯静态架构</span>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 WhatBrandIsThis-Study · 仅供前端学习演示，无任何商业用途</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 50px 0 24px;
  font-size: 0.9rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.footer-brand {
  max-width: 400px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-bottom: 12px;
}

.desc {
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.col h4 {
  color: #fff;
  margin-bottom: 14px;
  font-size: 0.95rem;
}

.col a, .col span {
  display: block;
  color: #94a3b8;
  margin-bottom: 8px;
  transition: color 0.2s;
}

.col a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid #1e293b;
  padding-top: 24px;
  text-align: center;
  font-size: 0.82rem;
  color: #64748b;
}
</style>
