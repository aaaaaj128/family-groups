// pages/profile/profile.js
Page({
  data: {
    userId: '',
    currentUser: {},
    avatarUrl: '',
    editPhone: '',
    editRole: '',
    editPwd: ''
  },

  onLoad() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    this.setData({ userId: userId });
    this.loadUserInfo();
  },

  onShow() {
    // 每次显示页面时刷新数据
    if (this.data.userId) {
      this.loadUserInfo();
    }
  },

  async loadUserInfo() {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('users').doc(this.data.userId).get();
      const user = res.data;
      this.setData({
        currentUser: user,
        avatarUrl: user.avatarUrl || '',
        editPhone: user.phone || '',
        editRole: user.role || ''
      });
    } catch (err) {
      console.error('加载用户信息失败：', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  // 选择头像
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.uploadAvatar(tempFilePath);
      }
    });
  },

  // 上传头像到云存储
  async uploadAvatar(filePath) {
    wx.showLoading({ title: '上传中...' });

    try {
      const cloudPath = `avatars/${this.data.userId}_${Date.now()}.png`;
      const res = await wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath
      });

      const avatarUrl = res.fileID;

      // 更新数据库
      const db = wx.cloud.database();
      await db.collection('users').doc(this.data.userId).update({
        data: { avatarUrl: avatarUrl }
      });

      this.setData({ 
        avatarUrl: avatarUrl,
        'currentUser.avatarUrl': avatarUrl
      });
      
      wx.hideLoading();
      wx.showToast({ title: '头像更新成功', icon: 'success' });
      
      // 刷新当前页面
      await this.loadUserInfo();
      
      // 强制刷新主页
      const pages = getCurrentPages();
      const homePage = pages.find(page => page.route === 'pages/index/index');
      if (homePage) {
        await homePage.refreshUserInfo();
        await homePage.loadFamilyData();
      }
      
    } catch (err) {
      wx.hideLoading();
      console.error('上传失败：', err);
      wx.showToast({ title: '上传失败', icon: 'none' });
    }
  },

  onPhoneInput(e) {
    this.setData({ editPhone: e.detail.value });
  },

  onRoleInput(e) {
    this.setData({ editRole: e.detail.value });
  },

  onPwdInput(e) {
    this.setData({ editPwd: e.detail.value });
  },

  async saveProfile() {
    const { editPhone, editRole, editPwd, userId } = this.data;

    wx.showLoading({ title: '保存中...' });

    try {
      const db = wx.cloud.database();
      const updateData = {
        phone: editPhone,
        role: editRole
      };
      if (editPwd) {
        updateData.password = editPwd;
      }

      await db.collection('users').doc(userId).update({
        data: updateData
      });

      wx.hideLoading();
      wx.showToast({ title: '保存成功', icon: 'success' });
      
      // 刷新当前页面
      await this.loadUserInfo();
      
      // 强制刷新主页
      const pages = getCurrentPages();
      const homePage = pages.find(page => page.route === 'pages/index/index');
      if (homePage) {
        await homePage.refreshUserInfo();
        await homePage.loadFamilyData();
      }
      
    } catch (err) {
      wx.hideLoading();
      console.error('保存失败：', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  logout() {
    wx.removeStorageSync('userId');
    wx.reLaunch({
      url: '/pages/index/index'
    });
  }
});