"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");

// ========== 添加云开发初始化 ==========
// 注意：这段代码要在合适的位置执行
// 由于 uni-app 打包后的结构特殊，需要在 onLaunch 中添加 wx.cloud.init

if (!Math) {
  "./pages/index/index.js";
  "./pages/assisit/assisit.js";
  "./pages/market/market.js";
  "./pages/index/phydetail/phydetail/phydetail.js";
}

const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
    
    // ========== 添加云开发初始化 ==========
    // 检查是否在小程序环境中
    if (typeof wx !== 'undefined' && wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-d9g6fun1a325ed541',
        traceUser: true
      });
      console.log('云开发初始化完成');
    }
    // ====================================
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};

function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}

createApp().app.mount("#app");
exports.createApp = createApp;
