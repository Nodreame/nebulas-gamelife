import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      // TODO: tidy obj info
      u_address: '-',
      nickname: '-',
      desc: '这家伙很懒，什么也没留下.',
      sex: '-',
      email: '-',
      phone: '-',
      wechatId: '-',
      avatar: '',                 // TODO: default avatar
      type: '',
      createdate: '-',            // TODO: actually a num
      gamelist: [],              // TODO: actually a []
      friendlist: '-',            // TODO: actually a []
      momentlist: []              // TODO: actually a []
    },
    gameinfo: {
      d_address: '-',
      g_address: '-',
      g_name: '-',
      g_imgurl_mini: '-',         // TODO: default img_mini
      g_imgurl_bg: '-',           // TODO: default img_bg
      g_imgurl_exlist: '-',       // TODO：actually a []
      websiteurl: '-',
      starturl: '-',
      desc: '-',
      grade: '-',                 // TODO: actually a num
      createdate: '-',            // TODO: actually a num
      commentlist: '-',           // TODO: actually a []
      achilist: '-',              // TODO: actually a []
    },
    userAchi: '-',                // TODO: actually a [] of user's achis
    userAchiList: '-',            // TODO: actually a [] of all user's achisObj
    count: 0
  },
  mutations: {
    update_userInfo (info) {
      this.userInfo.u_address = info.u_address
      this.userInfo.nickname  = info.nickname
      this.userInfo.desc      = info.desc
      this.userInfo.sex       = info.sex
      this.userInfo.email     = info.email
      this.userInfo.phone     = info.phone
      this.userInfo.wechatId  = info.wechatId
      this.userInfo.avatar    = info.avatar
      this.userInfo.type      = info.type
      this.userInfo.createdate= info.createdate
      this.userInfo.gamelist  = JSON.parse(JSON.stringify(info.gamelist))
      this.userInfo.friendlist= JSON.parse(JSON.stringify(info.friendlist))
      this.userInfo.momentlist= JSON.parse(JSON.stringify(info.momentlist))
    }
  },
  actions: {
    
  }
})
