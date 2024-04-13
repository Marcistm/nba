import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'
import axios from "axios";
import router from "@/router";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: ['#99A9BF', '#F7BA2A', '#FF9900']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    permission,
    user,
    tagsView
  },
  // 定义全局getters 方便访问user 模块的roles
  getters:{
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
})
