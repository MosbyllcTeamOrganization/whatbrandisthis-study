/**
 * 前端学习演示数据 - 纯静态模拟数据
 * 无后端调用，无敏感配置
 */

export const BRAND_CATEGORIES = [
  { id: 'all', label: '全部品类' },
  { id: 'fashion', label: '潮流服饰 & 户外' },
  { id: 'luxury', label: '奢侈品 & 箱包' },
  { id: 'sneakers', label: '球鞋 & 运动装备' },
  { id: 'tech', label: '数码科技 & 汽车' }
];

export const MOCK_BRAND_RESULTS = [
  {
    id: 1,
    brandName: "Arc'teryx (始祖鸟)",
    category: "户外顶级机能服饰",
    confidence: 97,
    logoUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80",
    matchReason: "识别到经典的始祖鸟化石骨架 Logo 特征以及压胶防水拉链工艺，匹配度极高。",
    traits: ["始祖鸟骨架标", "GORE-TEX 面料", "高端户外机能", "加拿大创立 (1989)"],
    officialSite: "https://www.arcteryx.com",
    notes: "常见于冲锋衣胸口印标或刺绣，辅料常伴有水滴防水拉链及压胶封条。"
  },
  {
    id: 2,
    brandName: "Patagonia (巴塔哥尼亚)",
    category: "环保户外生活方式",
    confidence: 91,
    logoUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80",
    matchReason: "经典彩色菲茨罗伊峰（Fitz Roy）山脊线织唛标与抓绒面料纹理吻合。",
    traits: ["菲茨罗伊山峰图腾", "再生环保羊羔绒", "复古户外", "美国加州创立 (1973)"],
    officialSite: "https://www.patagonia.com",
    notes: "常见于 Snap-T 抓绒外套左胸口小矩形织唛布标。"
  }
];

export const FEATURES = [
  {
    icon: "📷",
    title: "拍照/上传即刻识别",
    description: "上传衣服吊牌、洗标、衣角刺绣或模糊 Logo 局部特写，毫秒级分析。"
  },
  {
    icon: "✍️",
    title: "外观特征文字描述",
    description: "即使手头没有照片，描述标志形状（如倒三角、双C、小马标、枫叶）也能精准检索。"
  },
  {
    icon: "🛡️",
    title: "细节鉴定与品牌百科",
    description: "附带品牌创立背景、代表性系列、典型工艺细节与正品工艺对照提示。"
  }
];

export const FAQS = [
  {
    question: "AI 是如何识别服装品牌的？",
    answer: "系统利用计算机视觉与多模态模型，对服饰上的 Logo 形状、文字排版、走线风格及标志性色彩组合进行特征提取与比对。"
  },
  {
    question: "如果图片比较模糊或者只拍到了局部，还能认出来吗？",
    answer: "可以！您可以搭配选择品类标签（如箱包、球鞋）并补充文字描述，AI 会综合多模态信息提供最接近的品牌候选列表。"
  },
  {
    question: "本教学项目如何演示图片上传？",
    answer: "前端采用标准 HTML5 File API + URL.createObjectURL 实现纯浏览器本地预览，完全无需上传服务器，非常适合学生学习前端文件处理技术。"
  }
];
