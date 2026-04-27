// pages/family/family.js
Page({
  data: {
    familyMembers: [],
    currentUser: null,
    showAddModal: false,
    newName: '',
    newRole: '',
    newPhone: '',
    newPwd: ''
  },

  onLoad() {
    this.loadFamilyData();
  },

  async loadFamilyData() {
    wx.showLoading({ title: '加载中...' });

    try {
      const userId = wx.getStorageSync('userId');
      const db = wx.cloud.database();
      const _ = db.command;

      // 获取当前用户
      const userRes = await db.collection('users').doc(userId).get();
      const currentUser = userRes.data;
      this.setData({ currentUser: currentUser });

      if (!currentUser.familyId) {
        this.setData({ familyMembers: [currentUser] });
        wx.hideLoading();
        return;
      }

      // 获取家庭组
      const familyRes = await db.collection('family_groups')
        .doc(currentUser.familyId)
        .get();

      const memberIds = familyRes.data.members || [];
      
      if (memberIds.length > 0) {
        const membersRes = await db.collection('users')
          .where({ _id: _.in(memberIds) })
          .get();
        
        let members = membersRes.data;
        // 把当前用户排到第一个
        members.sort((a, b) => {
          if (a._id === currentUser._id) return -1;
          if (b._id === currentUser._id) return 1;
          return 0;
        });
        
        this.setData({ familyMembers: members });
      } else {
        this.setData({ familyMembers: [currentUser] });
      }
      
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载失败：', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  showAddModal() {
    this.setData({
      showAddModal: true,
      newName: '',
      newRole: '',
      newPhone: '',
      newPwd: ''
    });
  },

  onNameInput(e) { this.setData({ newName: e.detail.value }); },
  onRoleInput(e) { this.setData({ newRole: e.detail.value }); },
  onPhoneInput(e) { this.setData({ newPhone: e.detail.value }); },
  onPwdInput(e) { this.setData({ newPwd: e.detail.value }); },

  async addFamilyMember() {
    const { newName, newRole, newPhone, newPwd, currentUser } = this.data;

    if (!newName || !newPhone || !newPwd) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '添加中...' });

    try {
      const db = wx.cloud.database();
      const _ = db.command;

      let familyId = currentUser.familyId;

      if (!familyId) {
        const newFamilyRes = await db.collection('family_groups').add({
          data: {
            groupName: currentUser.username + '的家庭',
            members: [currentUser._id],
            createTime: new Date().toISOString().split('T')[0]
          }
        });
        familyId = newFamilyRes._id;

        await db.collection('users').doc(currentUser._id).update({
          data: { familyId: familyId }
        });
        currentUser.familyId = familyId;
        this.setData({ currentUser: currentUser });
      }

      const addRes = await db.collection('users').add({
        data: {
          username: newName,
          password: newPwd,
          phone: newPhone,
          role: newRole || '成员',
          familyId: familyId,
          createTime: new Date().toISOString().split('T')[0],
          avatarUrl: ''
        }
      });

      await db.collection('family_groups').doc(familyId).update({
        data: {
          members: _.push([addRes._id])
        }
      });

      wx.hideLoading();
      this.setData({ showAddModal: false });
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.loadFamilyData();
    } catch (err) {
      wx.hideLoading();
      console.error('添加失败：', err);
      wx.showToast({ title: '添加失败', icon: 'none' });
    }
  },

  async deleteFamily(e) {
    const memberId = e.currentTarget.dataset.id;
    const { currentUser } = this.data;

    if (memberId === currentUser._id) {
      wx.showToast({ title: '不能删除自己', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认删除',
      content: '确定要删除该成员吗？',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' });

          try {
            const db = wx.cloud.database();
            const _ = db.command;

            await db.collection('family_groups').doc(currentUser.familyId).update({
              data: {
                members: _.pull([memberId])
              }
            });

            wx.hideLoading();
            wx.showToast({ title: '删除成功', icon: 'success' });
            this.loadFamilyData();
          } catch (err) {
            wx.hideLoading();
            console.error('删除失败：', err);
            wx.showToast({ title: '删除失败', icon: 'none' });
          }
        }
      }
    });
  },

  closeModal() {
    this.setData({ showAddModal: false });
  },

  stopPropagation() {}
});