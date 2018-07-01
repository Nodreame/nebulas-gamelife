import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // n1kMKbK6KGMMTRn45xU7SssCoDVLGwGmt6J
    // n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc
    dappAddr: 'n1iLwjVqjFaGqte4ockwTEy1pNZp8gh6D9Q',    // dapp local
    imgUrl: 'http://wang.nodreame.cn/upload',
    userInfo: {
      u_address: '',
      nickname: '',
      desc: '这家伙很懒，什么也没留下.',
      sex: '',                   // 0-未知， 1-男， 2-女
      email: '',
      phone: '',
      wechatId: '',
      avatar: './img/avatar.png',                 // TODO: default avatar
      type: '',
      logindate: '',             // TODO: actually a num
      createdate: '',            // TODO: actually a num
      gamelist: [],               // TODO: actually a []
      friendlist: [],            // TODO: actually a []
      momentlist: []              // TODO: actually a []
    },
    // gameinfo: {
    //   d_address: '-',
    //   g_address: '-',
    //   g_name: '-',
    //   g_imgurl_mini: '-',         // TODO: default img_mini
    //   g_imgurl_bg: '-',           // TODO: default img_bg
    //   g_imgurl_exlist: '-',       // TODO：actually a []
    //   websiteurl: '-',
    //   starturl: '-',
    //   desc: '-',
    //   grade: '-',                 // TODO: actually a num
    //   createdate: '-',            // TODO: actually a num
    //   commentlist: '-',           // TODO: actually a []
    //   achilist: '-',              // TODO: actually a []
    // },
    userAchi: '-',                // TODO: actually a [] of user's achis
    userAchiList: '-',            // TODO: actually a [] of all user's achisObj
    count: 0
  },
  mutations: {
    update_userInfo (state, info) {
      this.state.userInfo.u_address = info.u_address?info.u_address: this.state.userInfo.u_address
      this.state.userInfo.nickname  = info.nickname?info.nickname: this.state.userInfo.nickname 
      this.state.userInfo.desc      = info.desc?info.desc: this.state.userInfo.desc
      this.state.userInfo.sex       = info.sex?info.sex: this.state.userInfo.sex
      this.state.userInfo.email     = info.email?info.email: this.state.userInfo.email
      this.state.userInfo.phone     = info.phone?info.phone: this.state.userInfo.phone
      this.state.userInfo.wechatId  = info.wechatId?info.wechatId: this.state.userInfo.wechatId
      this.state.userInfo.avatar    = info.avatar?info.avatar: this.state.userInfo.avatar
      this.state.userInfo.type      = info.type?info.type: this.state.userInfo.type 
      this.state.userInfo.logindate = info.logindate? info.logindate: this.state.userInfo.logindate
      this.state.userInfo.createdate= info.createdate?info.createdate: this.state.userInfo.createdate
      this.state.userInfo.gamelist  = info.gamelist? JSON.parse(JSON.stringify(info.gamelist)): this.state.userInfo.gamelist
      this.state.userInfo.friendlist= info.friendlist? JSON.parse(JSON.stringify(info.friendlist)): this.state.userInfo.friendlist
      this.state.userInfo.momentlist= info.momentlist? JSON.parse(JSON.stringify(info.momentlist)): this.state.userInfo.momentlist
    }
  },
  actions: {
    
  }
})
