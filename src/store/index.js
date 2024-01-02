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
    formatGMTTime(gmtTime) {
      if (!gmtTime) {
        return ""
      }

      const date = new Date(gmtTime)
      const year = date.getUTCFullYear().toString()
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
      const day = date.getUTCDate().toString().padStart(2, "0")
      const hours = date.getUTCHours().toString().padStart(2, "0")
      const minutes = date.getUTCMinutes().toString().padStart(2, "0")
      const seconds = date.getUTCSeconds().toString().padStart(2, "0")
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
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
