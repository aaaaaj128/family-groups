// pages/market/market.js
Page({
  data: {
    // 消息数量
    messageCount: 2,
    
    // 轮播图数据（医疗健康相关）
    bannerList: [
      { image: "/static/banner/health1.jpg", url: "", title: "健康体检" },
      { image: "/static/banner/health2.jpg", url: "", title: "医疗器械" },
      { image: "/static/banner/health3.jpg", url: "", title: "保健品特惠" }
    ],
    
    // 图标入口数据（医疗健康相关）
    iconList: [
      { name: "医疗器械", icon: "/static/icons/medical.png", type: "medical" },
      { name: "保健品", icon: "/static/icons/health.png", type: "health" },
      { name: "中药饮片", icon: "/static/icons/chinese.png", type: "chinese" },
      { name: "家庭药箱", icon: "/static/icons/firstaid.png", type: "firstaid" },
      { name: "康复护理", icon: "/static/icons/rehab.png", type: "rehab" },
      { name: "健康体检", icon: "/static/icons/checkup.png", type: "checkup" },
      { name: "在线问诊", icon: "/static/icons/consult.png", type: "consult" },
      { name: "健康课程", icon: "/static/icons/course.png", type: "course" },
      { name: "健康档案", icon: "/static/icons/record.png", type: "record" },
      { name: "我的订单", icon: "/static/icons/order.png", type: "order" }
    ],
    
    // 公告数据（医疗健康相关）
    noticeList: [
      "🌟 春季健康体检套餐5折起",
      "💊 常备药品满99减20",
      "🏥 在线问诊限时免费",
      "📦 医疗器械支持以旧换新"
    ],
    
    // 商品瀑布流数据（医疗健康商品）
    allProducts: [],
    leftProductList: [],
    rightProductList: [],
    hasMore: true,
    pageNum: 1,
    pageSize: 10
  },

  onLoad() {
    this.loadProductList();
  },

  // 加载商品列表（分页）
  loadProductList() {
    const { pageNum, pageSize, allProducts } = this.data;
    
    // 模拟医疗健康商品数据
    const mockProducts = this.generateMockProducts(pageNum, pageSize);
    
    const newAllProducts = [...allProducts, ...mockProducts];
    this.setData({
      allProducts: newAllProducts,
      hasMore: mockProducts.length === pageSize
    });
    
    this.splitProductsToColumns(newAllProducts);
  },

  // 生成模拟医疗健康商品数据
  generateMockProducts(pageNum, pageSize) {
    const products = [];
    const startId = (pageNum - 1) * pageSize;
    
    const productTemplates = [
      { title: "医用电子血压计 家用精准测量", price: 199, tag: "官方正品" },
      { title: "鱼跃血糖仪 家用测试仪", price: 299, tag: "热销爆款" },
      { title: "维生素C泡腾片 增强免疫力", price: 49, tag: "限时特价" },
      { title: "医用外科口罩 独立包装50只", price: 29.9, tag: "防疫必备" },
      { title: "颈椎按摩器 低频脉冲", price: 159, tag: "新品上市" },
      { title: "智能手环 心率血氧监测", price: 399, tag: "智能穿戴" },
      { title: "艾草贴 颈椎贴 12贴/盒", price: 35, tag: "国货精品" },
      { title: "益生菌粉 调理肠胃", price: 89, tag: "健康优选" },
      { title: "雾化器 家用医用级", price: 269, tag: "医疗器械" },
      { title: "电子体温计 红外线额温枪", price: 79, tag: "家庭必备" },
      { title: "护腰带 医用腰部支撑", price: 129, tag: "康复护理" },
      { title: "深海鱼油软胶囊 100粒", price: 118, tag: "保健品" },
      { title: "退热贴 儿童成人通用", price: 19.9, tag: "常备药箱" },
      { title: "医用制氧机 家用吸氧机", price: 1299, tag: "大件配送" },
      { title: "智能药盒 提醒吃药", price: 89, tag: "智能健康" },
      { title: "按摩靠垫 腰部背部", price: 199, tag: "舒缓疲劳" }
    ];
    
    for (let i = 0; i < pageSize; i++) {
      const template = productTemplates[(startId + i) % productTemplates.length];
      products.push({
        id: startId + i + 1,
        title: template.title,
        price: template.price,
        sales: Math.floor(Math.random() * 5000) + 100,
        tag: template.tag,
        image: "/static/product/product" + ((i % 6) + 1) + ".jpg"
      });
    }
    return products;
  },

  // 将商品分左右两列（瀑布流布局）
  splitProductsToColumns(products) {
    const leftColumn = [];
    const rightColumn = [];
    
    products.forEach((item, index) => {
      if (index % 2 === 0) {
        leftColumn.push(item);
      } else {
        rightColumn.push(item);
      }
    });
    
    this.setData({
      leftProductList: leftColumn,
      rightProductList: rightColumn
    });
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore) return;
    
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.loadProductList();
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      allProducts: [],
      pageNum: 1,
      hasMore: true
    });
    this.loadProductList();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 搜索
  goToSearch() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' });
  },

  // 消息
  goToMessage() {
    wx.showToast({ title: '消息功能开发中', icon: 'none' });
  },

  // 轮播图点击
  onBannerTap(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      // 跳转到对应页面
      wx.showToast({ title: '活动详情', icon: 'none' });
    }
  },

  // 图标入口点击
  onIconTap(e) {
    const type = e.currentTarget.dataset.type;
    wx.showToast({ title: `${type}功能开发中`, icon: 'none' });
  },

  // 公告点击
  onNoticeTap() {
    wx.showToast({ title: '公告详情', icon: 'none' });
  },

  // 商品点击
  onProductTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: `商品详情开发中`, icon: 'none' });
  }
});