import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    authority: '',
    lastTime: '',
    lastSite: '',
    fold: false,
    messageCount: 2,
    tagList: [],//标签页列表
    cacheList: [],//keep-alive缓存的组件的列表
  },

  mutations: {
    //登陆成功时将基本信息保存起来，之后页面刷新时用来回复state（刷新会导致state重置）
    loginSucceed(state, userForm) {
      state.name = userForm.name;
      state.authority = userForm.authority;
      state.lastTime = userForm.lastTime;
      state.lastSite = userForm.lastSite;
      sessionStorage.setItem('name', state.name);
      sessionStorage.setItem('authority', state.authority);
      sessionStorage.setItem('lastTime', state.lastTime);
      sessionStorage.setItem('lastSite', state.lastSite);
    },

    protectState(state) {
      state.name = sessionStorage.getItem('name');
      state.authority = sessionStorage.getItem('authority');
      state.lastTime = sessionStorage.getItem('lastTime');
      state.lastSite = sessionStorage.getItem('lastSite');
      if (sessionStorage.getItem("tagList")) {//sessionStorage不能直接保存数组，因为存入的数据都会被转化成字符串
        state.tagList = JSON.parse(sessionStorage.getItem("tagList")).tagList;
      }
      if (sessionStorage.getItem("cacheList")) {
        state.cacheList = JSON.parse(sessionStorage.getItem("cacheList")).cacheList;
      }
    },

    foldChange(state) {
      state.fold = !state.fold;
    },

    loginOut(state) {
      state.name = '';
      sessionStorage.clear();
    },

    setTag(state, tagForm) {
      state.tagList.push(tagForm);
    },

    closeTag(state, index) {
      state.tagList.splice(index, 1);
    },

    closeOther(state, nowTag) {
      for (let i = 0; i < state.tagList.length;) {
        if (state.tagList[i].path != nowTag) {
          state.tagList.splice(i, 1);
        } else {
          i++;
        }
      }
    },

    closeAll(state) {
      state.tagList.splice(0, state.tagList.length);
    },

    setCache(state, name) {
      for (let i = 0; i < state.cacheList.length; i++) {
        if (name === state.cacheList[i]) {
          return;
        }
      }
      state.cacheList.push(name);

      sessionStorage.setItem(
        "cacheList",
        JSON.stringify({ cacheList: state.cacheList })
      );
    },

    newCacheList(state) {//保证只有标签列表中有的页面才会被keep-alive缓存
      let path, name, isDel;

      for (let i = 0; i < state.cacheList.length; i++) {
        isDel = true;
        for (let j = 0; j < state.tagList.length; j++) {
          path = state.tagList[j].path;
          path = path.slice(1);
          path = path.toUpperCase();
          name = state.cacheList[i];
          name = name.toUpperCase();
          if (path === name) {
            isDel = false;
            break;
          }
        }

        if (isDel) {
          state.cacheList.splice(i, 1);
          i--;
        }
      }

      sessionStorage.setItem(
        "cacheList",
        JSON.stringify({ cacheList: state.cacheList })
      );
    }

  },
})
