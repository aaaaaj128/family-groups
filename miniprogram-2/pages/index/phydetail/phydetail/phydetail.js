"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      isOpen: false,
      healthList: [
        { name: "心率", value: "72", unit: "次/分", status: "正常" },
        { name: "血压", value: "118/76", unit: "mmHg", status: "正常" },
        { name: "血糖", value: "5.2", unit: "mmol/L", status: "正常" },
        { name: "体重", value: "52.3", unit: "kg", status: "正常" },
        { name: "BMI", value: "20.4", unit: "", status: "正常" },
        { name: "尿酸", value: "320", unit: "μmol/L", status: "正常" },
        { name: "血脂", value: "4.2", unit: "mmol/L", status: "正常" },
        { name: "胆固醇", value: "4.8", unit: "mmol/L", status: "正常" },
        { name: "肺功能", value: "96", unit: "%", status: "正常" },
        { name: "血氧", value: "98", unit: "%", status: "正常" },
        { name: "脉搏", value: "70", unit: "次/分", status: "正常" },
        { name: "骨密度", value: "良好", unit: "", status: "正常" },
        { name: "肝功能", value: "正常", unit: "", status: "正常" },
        { name: "肾功能", value: "正常", unit: "", status: "正常" },
        { name: "视力", value: "1.0", unit: "", status: "正常" },
        { name: "甲状腺", value: "正常", unit: "", status: "正常" }
      ],
      records: [
        {
          hospital: "上海第一人民医院",
          date: "2026/04/25",
          disease: "上呼吸道感染",
          doctor: "王医生",
          dept: "内科",
          reason: "持续咳嗽",
          advice: "多休息，多喝温水",
          open: false
        },
        {
          hospital: "西安军医医院",
          date: "2026/03/20",
          disease: "胃炎",
          doctor: "刘医生",
          dept: "消化科",
          reason: "胃部疼痛，反酸",
          advice: "清淡饮食，规律进餐",
          open: false
        }
      ]
    };
  },
  computed: {
    showHealthList() {
      return this.isOpen ? this.healthList : this.healthList.slice(0, 4);
    }
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
    swiperChange(e) {
      this.currentTab = e.detail.current;
    },
    toggle(index) {
      this.records[index].open = !this.records[index].open;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.currentTab === 0 ? 1 : "",
    c: common_vendor.o(($event) => $options.changeTab(0), "72"),
    d: $data.currentTab === 1 ? 1 : "",
    e: common_vendor.o(($event) => $options.changeTab(1), "0d"),
    f: common_vendor.f($options.showHealthList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.unit),
        d: common_vendor.t(item.status),
        e: index
      };
    }),
    g: common_vendor.t($data.isOpen ? "收起数据 ↑" : "查看更多数据 ↓"),
    h: common_vendor.o(($event) => $data.isOpen = !$data.isOpen, "10"),
    i: common_vendor.f($data.records, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.open ? "收起" : "详情"),
        b: common_vendor.o(($event) => $options.toggle(index), index),
        c: common_vendor.t(item.hospital),
        d: common_vendor.t(item.date),
        e: common_vendor.t(item.dept),
        f: common_vendor.t(item.doctor),
        g: item.open
      }, item.open ? {
        h: common_vendor.t(item.reason),
        i: common_vendor.t(item.disease),
        j: common_vendor.t(item.advice)
      } : {}, {
        k: index
      });
    }),
    j: $data.currentTab,
    k: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args), "75")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/index/phydetail/phydetail/phydetail.js.map
