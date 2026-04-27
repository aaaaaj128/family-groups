"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "adshow",
  props: {
    adshow: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.adshow, (item, index, i0) => {
          return {
            a: item.url,
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d13ddc04"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/adshow/adshow.js.map
