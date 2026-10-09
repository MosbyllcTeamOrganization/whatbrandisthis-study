<template>
  <section id="finder" class="finder-section">
    <div class="container">
      <div class="finder-card">
        <!-- 模式切换: 拍照/上传 vs 文字描述 (学习: 响应式 Tab 切换) -->
        <div class="mode-tabs">
          <button
            class="tab-btn"
            :class="{ active: activeMode === 'photo' }"
            @click="activeMode = 'photo'"
          >
            📸 上传照片 / Logo 图标
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeMode === 'text' }"
            @click="activeMode = 'text'"
          >
            ✏️ 文字描述外观特征
          </button>
        </div>

        <!-- 模式 1: 图片上传区域 (学习: HTML5 Drag & Drop 和 File 预览) -->
        <div v-if="activeMode === 'photo'" class="upload-container">
          <div
            v-if="!imagePreview"
            class="dropzone"
            :class="{ dragging: isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden-file-input"
              @change="handleFileChange"
            />
            <div class="drop-icon">🖼️</div>
            <p class="drop-title">拖拽图片到这里，或点击浏览选择文件</p>
            <p class="drop-hint">支持 JPG, PNG, WEBP（纯前端浏览器本地加载预览）</p>
          </div>

          <!-- 图片已选中预览 -->
          <div v-else class="preview-box">
            <img :src="imagePreview" alt="预览图" class="preview-img" />
            <div class="preview-actions">
              <span class="file-name">{{ fileName }}</span>
              <button class="remove-btn" @click="clearImage">✕ 移除更换</button>
            </div>
          </div>
        </div>

        <!-- 模式 2: 文字描述区域 (学习: v-model 表单处理) -->
        <div v-else class="text-container">
          <label class="input-label" for="brand-desc">
            描述你看到的 Logo、图案形状、字母或衣服标签特征:
          </label>
          <textarea
            id="brand-desc"
            v-model="textDescription"
            class="textarea"
            rows="4"
            placeholder="例如：一个始祖鸟化石形状的白色刺绣骨架标志，位于左胸口，拉链带有黑色细带..."
          ></textarea>
        </div>

        <!-- 辅助过滤选项 (学习: 下拉选择框 v-model) -->
        <div class="filters-row">
          <div class="filter-item">
            <label>品类偏向 (可选):</label>
            <select v-model="selectedCategory" class="select-input">
              <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.label }}
              </option>
            </select>
          </div>

          <div class="filter-item">
            <label>标志出现位置:</label>
            <input
              v-model="locationContext"
              type="text"
              class="text-input"
              placeholder="如：胸口印花 / 袖口织唛 / 洗标"
            />
          </div>
        </div>

        <!-- 操作按钮 (学习: 动态禁用条件控制) -->
        <div class="action-row">
          <button
            class="identify-btn"
            :disabled="isAnalyzing || (!imagePreview && !textDescription.trim())"
            @click="runIdentification"
          >
            <span v-if="isAnalyzing">⏳ 正在比对特征库...</span>
            <span v-else>🔍 立即识别品牌</span>
          </button>
        </div>

        <!-- 识别结果面板 (学习: v-if 条件渲染与嵌套卡片布局) -->
        <div v-if="hasResult" class="result-area">
          <div class="result-header">
            <h3>🏷️ 识别分析报告</h3>
            <span class="confidence-tag">模拟分析置信度达标</span>
          </div>

          <div class="result-grid">
            <article
              v-for="item in results"
              :key="item.id"
              class="result-card"
            >
              <div class="card-thumb">
                <img :src="item.logoUrl" :alt="item.brandName" class="thumb-img" />
              </div>
              <div class="card-body">
                <div class="card-top">
                  <div>
                    <h4 class="brand-title">{{ item.brandName }}</h4>
                    <span class="brand-sub">{{ item.category }}</span>
                  </div>
                  <div class="confidence-badge">{{ item.confidence }}% 置信度</div>
                </div>

                <p class="match-reason">{{ item.matchReason }}</p>

                <div class="traits-box">
                  <span
                    v-for="(trait, idx) in item.traits"
                    :key="idx"
                    class="trait-badge"
                  >
                    {{ trait }}
                  </span>
                </div>

                <div class="notes-box">
                  <strong>💡 细节特征提示:</strong> {{ item.notes }}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { BRAND_CATEGORIES, MOCK_BRAND_RESULTS } from '../data/mockData';

/**
 * 学习要点:
 * 1. 组合式 API (ref) 管理交互状态
 * 2. 纯浏览器端 FileReader API 读取图片
 * 3. 响应式表单与动态禁用
 */

const categories = BRAND_CATEGORIES;
const activeMode = ref('photo');
const isDragging = ref(false);
const fileInputRef = ref(null);
const imagePreview = ref(null);
const fileName = ref('');
const textDescription = ref('');
const selectedCategory = ref('all');
const locationContext = ref('');
const isAnalyzing = ref(false);
const hasResult = ref(false);
const results = ref([]);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFile = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    alert('请选择有效的图片文件！');
    return;
  }
  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) handleFile(file);
};

const clearImage = () => {
  imagePreview.value = null;
  fileName.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const runIdentification = () => {
  isAnalyzing.value = true;
  hasResult.value = false;

  // 模拟 AI 推理耗时 (700毫秒)
  setTimeout(() => {
    results.value = MOCK_BRAND_RESULTS;
    isAnalyzing.value = false;
    hasResult.value = true;
  }, 700);
};
</script>

<style scoped>
.finder-section {
  padding: 10px 0 50px;
}

.finder-card {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  padding: 32px;
}

.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background: var(--background);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--primary-light);
  color: var(--primary);
}

.dropzone {
  border: 2px dashed var(--border);
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #fdfdfd;
  cursor: pointer;
  transition: all 0.2s;
}

.dropzone:hover, .dropzone.dragging {
  border-color: var(--primary);
  background: var(--primary-light);
}

.hidden-file-input {
  display: none;
}

.drop-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.drop-title {
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 4px;
}

.drop-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.preview-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--background);
  border-radius: 10px;
}

.preview-img {
  max-height: 220px;
  border-radius: 8px;
  object-fit: contain;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.file-name {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.remove-btn {
  background: #fee2e2;
  color: #dc2626;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
}

.text-container {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

.textarea:focus {
  border-color: var(--primary);
}

.filters-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.filter-item label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-muted);
}

.select-input, .text-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  font-size: 0.95rem;
}

.action-row {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.identify-btn {
  background: var(--primary);
  color: #fff;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}

.identify-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.identify-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-area {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  padding-top: 28px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.confidence-tag {
  background: #dcfce7;
  color: #166534;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
}

.result-grid {
  display: grid;
  gap: 20px;
}

.result-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.card-thumb {
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  flex: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.brand-title {
  font-size: 1.25rem;
  color: var(--text-main);
  font-weight: 700;
}

.brand-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.confidence-badge {
  background: #0284c7;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.match-reason {
  font-size: 0.92rem;
  color: var(--text-main);
  margin-bottom: 12px;
  line-height: 1.5;
}

.traits-box {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.trait-badge {
  background: #fff;
  border: 1px solid var(--border);
  padding: 3px 8px;
  font-size: 0.78rem;
  border-radius: 4px;
  color: var(--text-muted);
}

.notes-box {
  background: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-left: 3px solid var(--primary);
}

@media (max-width: 640px) {
  .filters-row {
    grid-template-columns: 1fr;
  }
  .result-card {
    flex-direction: column;
  }
  .card-thumb {
    width: 100%;
    height: 160px;
  }
}
</style>
