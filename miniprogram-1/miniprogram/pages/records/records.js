// pages/records/records.js
Page({
  data: {
    familyMembers: [],
    selectedMemberId: '',
    selectedMemberName: '',
    medicalList: [],
    memberNames: [],
    showAddModal: false,
    newVisitTime: '',
    newDiagnosis: '',
    newTreatment: '',
    newMedication: '',
    newDoctor: ''
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    // 每次显示页面时刷新数据
    if (this.data.selectedMemberId) {
      this.loadMedicalRecords(this.data.selectedMemberId);
    }
  },

  async loadData() {
    wx.showLoading({ title: '加载中...' });

    try {
      const userId = wx.getStorageSync('userId');
      if (!userId) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
        return;
      }

      const db = wx.cloud.database();
      const _ = db.command;

      // 获取当前用户
      const userRes = await db.collection('users').doc(userId).get();
      const currentUser = userRes.data;

      let members = [];

      if (currentUser.familyId) {
        const familyRes = await db.collection('family_groups')
          .doc(currentUser.familyId)
          .get();
        const memberIds = familyRes.data.members || [];
        if (memberIds.length > 0) {
          const membersRes = await db.collection('users')
            .where({ _id: _.in(memberIds) })
            .get();
          members = membersRes.data;
        } else {
          members = [currentUser];
        }
      } else {
        members = [currentUser];
      }

      const memberNames = members.map(m => m.username);
      
      // 选中当前登录用户
      const currentMember = members.find(m => m._id === userId) || members[0];
      
      this.setData({
        familyMembers: members,
        memberNames: memberNames,
        selectedMemberId: currentMember._id,
        selectedMemberName: currentMember.username
      });

      await this.loadMedicalRecords(this.data.selectedMemberId);
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载失败：', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  async loadMedicalRecords(userId) {
    if (!userId) return;
    
    wx.showLoading({ title: '加载病历...' });
    try {
      const db = wx.cloud.database();
      const res = await db.collection('medical_records')
        .where({ userId: userId })
        .orderBy('visitTime', 'desc')
        .get();
      
      console.log('加载病历成功，共', res.data.length, '条');
      this.setData({ medicalList: res.data || [] });
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载病历失败：', err);
      wx.showToast({ title: '加载病历失败', icon: 'none' });
    }
  },

  onMemberChange(e) {
    const index = e.detail.value;
    const member = this.data.familyMembers[index];
    this.setData({
      selectedMemberId: member._id,
      selectedMemberName: member.username
    });
    this.loadMedicalRecords(member._id);
  },

  showAddModal() {
    this.setData({
      showAddModal: true,
      newVisitTime: '',
      newDiagnosis: '',
      newTreatment: '',
      newMedication: '',
      newDoctor: ''
    });
  },

  onVisitTimeInput(e) { 
    this.setData({ newVisitTime: e.detail.value }); 
  },
  onDiagnosisInput(e) { 
    this.setData({ newDiagnosis: e.detail.value }); 
  },
  onTreatmentInput(e) { 
    this.setData({ newTreatment: e.detail.value }); 
  },
  onMedicationInput(e) { 
    this.setData({ newMedication: e.detail.value }); 
  },
  onDoctorInput(e) { 
    this.setData({ newDoctor: e.detail.value }); 
  },

  async addMedicalRecord() {
    const { selectedMemberId, selectedMemberName, newVisitTime, newDiagnosis, newTreatment, newMedication, newDoctor } = this.data;

    console.log('添加病历参数：', {
      selectedMemberId,
      selectedMemberName,
      newVisitTime,
      newDiagnosis,
      newTreatment,
      newMedication,
      newDoctor
    });

    if (!newVisitTime || !newDiagnosis) {
      wx.showToast({ title: '请填写就诊时间和诊断结果', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '添加中...' });

    try {
      const db = wx.cloud.database();
      
      const result = await db.collection('medical_records').add({
        data: {
          userId: selectedMemberId,
          visitTime: newVisitTime,
          diagnosis: newDiagnosis,
          treatment: newTreatment || '',
          medication: newMedication || '',
          doctorName: newDoctor || ''
        }
      });

      console.log('✅ 添加成功，记录ID：', result._id);

      wx.hideLoading();
      this.setData({ 
        showAddModal: false,
        newVisitTime: '',
        newDiagnosis: '',
        newTreatment: '',
        newMedication: '',
        newDoctor: ''
      });
      wx.showToast({ title: '添加成功', icon: 'success' });
      
      // 刷新病历列表
      await this.loadMedicalRecords(selectedMemberId);
      
      // 刷新首页的病历数量
      const pages = getCurrentPages();
      const homePage = pages.find(page => page.route === 'pages/index/index');
      if (homePage && homePage.loadMedicalCount) {
        await homePage.loadMedicalCount();
      }
      
    } catch (err) {
      wx.hideLoading();
      console.error('❌ 添加病历失败：', err);
      wx.showToast({ title: '添加失败：' + (err.message || '未知错误'), icon: 'none' });
    }
  },

  closeModal() {
    this.setData({ showAddModal: false });
  },

  stopPropagation() {}
});