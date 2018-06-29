<template>
  <div class="md-layout flex-column">
    <div class="md-layout-item md-xsmall-size-90 center">
      <img :src="userInfo.avatar" alt="头像" width="100" height="100">
      <h1>{{userInfo.nickname}}</h1>
      <p>
        <span>{{userInfo.u_address}}</span>
        <!-- TODO：男女icon -->
      </p>
      <p>{{userInfo.desc}}</p>
      <button>关注</button>
    </div>
    <div class="md-layout-item md-xsmall-size-90">
      <div class="userpage-intro">个人简介：TODO: if 地址是本人，则可以跳转到修改界面</div>
      <div class="userpage-moments">游戏人生：TODO：数量</div>
      <div class="userpage-friends">关注列表：TODO：人数</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .flex-column {
    flex-direction: column;
  }
  .center {
    text-align: center;
  }
</style>


<script>
  export default {
    name: 'Userpage',
    data: () => ({
      userInfo: {
        u_address: '',
        nickname: '',
        desc: '这家伙很懒，什么也没留下.',
        sex: '',                   // 0-未知， 1-男， 2-女
        email: '',
        phone: '',
        wechatId: '',
        avatar: '/img/avatar.png',                 // TODO: default avatar
        type: '',
        logindate: '',             // TODO: actually a num
        createdate: '',            // TODO: actually a num
        gamelist: [],               // TODO: actually a []
        friendlist: [],            // TODO: actually a []
        momentlist: []              // TODO: actually a []
      }
    }),
    methods: {
      setUserInfo (info) {
        this.userInfo.u_address = info.u_address? info.u_address: this.userInfo.u_address
        this.userInfo.nickname  = info.nickname? info.nickname: this.userInfo.nickname 
        this.userInfo.desc      = info.desc? info.desc: this.userInfo.desc
        this.userInfo.sex       = info.sex? info.sex: this.userInfo.sex
        this.userInfo.email     = info.email? info.email: this.userInfo.email
        this.userInfo.phone     = info.phone? info.phone: this.userInfo.phone
        this.userInfo.wechatId  = info.wechatId? info.wechatId: this.userInfo.wechatId
        this.userInfo.avatar    = info.avatar? info.avatar: this.userInfo.avatar
        this.userInfo.type      = info.type? info.type: this.userInfo.type 
        this.userInfo.logindate = info.logindate? info.logindate: this.userInfo.logindate
        this.userInfo.createdate= info.createdate? info.createdate: this.userInfo.createdate
        this.userInfo.gamelist  = info.gamelist? JSON.parse(JSON.stringify(info.gamelist)): this.userInfo.gamelist
        this.userInfo.friendlist= info.friendlist? JSON.parse(JSON.stringify(info.friendlist)): this.userInfo.friendlist
        this.userInfo.momentlist= info.momentlist? JSON.parse(JSON.stringify(info.momentlist)): this.userInfo.momentlist
      }
    },
    // computed: {
    //   params () {
    //     console.log('this.$route.params.useraddr:', this.$route.params.useraddr)
    //     // this.gameAddress = this.$route.params
    //     this.userInfo.u_address = this.$route.params.useraddr
    //     return this.$route.params
    //   }
    // },
    created: function () {
      console.log('created:', this.$store.state.userInfo)
      if (!this.$store.state.userInfo.u_address) {
        // this.$router.push('/');
      }
    },
    mounted: function () {
      console.log('this.$route:', this.$route)
      console.log('mounted:', this.$route.params.useraddr)
      this.userInfo.u_address = this.$route.params.useraddr
      const that = this
      this.neb.api.call({
          from:   this.$store.state.dappAddr,
          to:     this.$store.state.dappAddr,
          value:  0,
          contract: {
            function: 'getUserInfoByAddress',
            args:     JSON.stringify([this.userInfo.u_address])
          },
          gasPrice: 1000000,
          gasLimit: 2000000
        }).then(function (data) {
          console.log('data.result:', data.result)
          // that.userInfo = JSON.parse(data.result)
          that.setUserInfo(JSON.parse(data.result))
        });
    }
  }
</script>