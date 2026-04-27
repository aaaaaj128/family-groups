"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_head1 = common_vendor.resolveComponent("head1");
  const _easycom_pinfen2 = common_vendor.resolveComponent("pinfen");
  (_component_head1 + _easycom_pinfen2)();
}
const _easycom_pinfen = () => "../../components/pinfen/pinfen.js";
if (!Math) {
  _easycom_pinfen();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      categories: ["睡眠", "情绪", "运动", "饮食", "心率"],
      scoreData: [100, 100, 100, 100, 100]
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/assisit/assisit.js.map
