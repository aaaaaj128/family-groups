// pages/me/me.js
Page({
  data: {
    isLogin: true,  // 改为 true，因为登录后才能进入
    currentUser: {},
    familyGroupName: '',
    greetingText: ''
  },

  onLoad() {
    // 检查登录状态
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      // 未登录，跳转到登录页
      wx.redirectTo({
        url: '/pages/login/login'
      });
      return;
    }
    this.setData({ userId: userId });
    this.loadUserInfo();
  },

  onShow() {
    // 每次显示时刷新数据
    const userId = wx.getStorageSync('userId');
    if (userId) {
      this.loadUserInfo();
    }
  },

  async loadUserInfo() {
    try {
      const userId = wx.getStorageSync('userId');
      if (!userId) {
        wx.redirectTo({ url: '/pages/login/login' });
        return;
      }

      const db = wx.cloud.database();
      const res = await db.collection('users').doc(userId).get();
      const user = res.data;
      
      this.setData({
        currentUser: user,
        familyGroupName: user.familyId ? '家庭组' : '未加入家庭'
      });
      this.setGreeting();
    } catch (err) {
      console.error('加载用户信息失败：', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 6) {
      greeting = '凌晨好';
    } else if (hour < 12) {
      greeting = '上午好';
    } else if (hour < 14) {
      greeting = '中午好';
    } else if (hour < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
    }
    this.setData({ greetingText: greeting });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userId');
          wx.removeStorageSync('userInfo');
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  goToFamily() {
    wx.navigateTo({
      url: '/pages/family/family'
    });
  },

  goToRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  }
});