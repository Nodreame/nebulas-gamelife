<template>
  <div class="md-layout flex-column">
    <div class="userpage-header md-layout-item md-xsmall-size-100 md-elevation-10">
      <img :src="userInfo.avatar" alt="头像" width="100" height="100">
      <h1 style="display: flex; justify-content: center; align-items: center;">
        <span>{{userInfo.nickname}}</span>
        <md-button class="md-icon-button" @click="shareLink">
          <md-icon>share</md-icon>
        </md-button>
      </h1>
      <p>
        <span>{{userInfo.u_address}}</span>
        <!-- TODO：男女icon -->
        <!-- TODO: 修改主页背景 -->
      </p>
      <p>{{userInfo.desc}}</p>
      <md-button class="md-raised md-primary" :disabled="isFocusingFriend" v-if="!hasFocus"
        @click="focusFriend">
        关注
        <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
          v-if="isFocusingFriend">
        </vue-loading>
      </md-button>
      <md-button class="md-raised md-accent" :disabled="isUnfocusingFriend" v-if="hasFocus"
        @click="unfocusFriend">
        取消关注
        <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
          v-if="isUnfocusingFriend">
        </vue-loading>
      </md-button>
    </div>
    <div class="md-layout-item md-layout md-gutter md-xsmall-size-100 md-elevation-10" style="padding: 10px 0">
      <div class="userpage-intro md-layout-item md-xlarge-size-33 md-large-size-33 md-medium-size-33 md-small-size-50">
        <div class="md-elevation-10">
          <md-toolbar class="md-dense" md-elevation="0">
            <span>
              <md-icon class="md-dense">person</md-icon>
              个人简介
            </span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button" v-if="userInfo.u_address === $store.state.userInfo.u_address" to="/settings">
                <md-icon>edit</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <md-app-content style="height: 50vh; display: flex; flex-direction: column; overflow-y: auto;" >
            <p>性别：{{formatSex(userInfo.sex)}}</p>
            <p>邮箱：{{userInfo.email}}</p>
            <p>电话：{{userInfo.phone}}</p>
            <p>微信：{{userInfo.wechatId}}</p>
            <p>类型：{{formatDev(userInfo.type)}}</p>
            <p>账号创建时间：{{formatTime(userInfo.createdate)}}</p>
            <p>最后登录时间：{{formatTime(userInfo.logindate)}}</p>
            <!-- <p>我的游戏</p> -->
          </md-app-content>
        </div>
        <!-- TODO: 喜欢的游戏 -->
      </div>
      <div class="userpage-moments md-layout-item md-xlarge-size-33 md-large-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
        <div class="md-elevation-10">
          <md-toolbar class="md-dense" md-elevation="0">
            <span>
              <md-icon class="md-dense">local_play</md-icon>
              游戏人生
            </span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button"  v-if="userInfo.u_address === $store.state.userInfo.u_address">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <md-app-content style="height: 50vh; display: flex; flex-direction: column; overflow-y: auto;" >
            <!-- <md-card v-bind:key="moment.createdate" v-for="moment in momentlist"> -->
            <md-card v-for="moment in userInfo.momentlist" v-bind:key="moment.createdate">
              <md-card-header>
                <md-avatar>
                  <img src="../assets/avatar.jpg" alt="Avatar">
                </md-avatar>
                <div class="md-title">{{moment.username}}</div>
                <p class="md-subhead">{{formatTime(moment.createdate, 'hour')}}</p>
              </md-card-header>
              <md-card-media>
                <img :src="moment.imgurl" alt="People">
              </md-card-media>
              <md-card-content>{{moment.desc}}</md-card-content>
            </md-card>
          </md-app-content>
        </div>
      </div>
      <div class="userpage-friends md-layout-item md-xlarge-size-33 md-large-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        v-if="userInfo.u_address === $store.state.userInfo.u_address">
        <div class="md-elevation-10">
          <md-toolbar class="md-dense" md-elevation="0">
            <span>
              <md-icon class="md-dense">people</md-icon>
              关注列表
            </span>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button" @click="addFocus">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <md-app-content style="height: 50vh; display: flex; flex-direction: column; overflow-y: auto;" >
            <!-- <md-list v-for="friend in friendlist" v-bind:key="friend.createdate"> -->
            <md-list v-for="friend in $store.state.userInfo.friendlist" v-bind:key="friend.createdate">
              <md-list-item>
                <md-avatar>
                  <router-link :to="'/userpage/' + friend.u_address">
                    <img :src="formatAvatar(friend.avatar)" alt="People">
                  </router-link>
                </md-avatar>

                <span class="md-list-item-text">
                  <router-link :to="'/userpage/' + friend.u_address"  style="color: #FFF;">
                    {{friend.nickname}}
                  </router-link>
                </span>

                <md-button class="md-icon-button md-list-action"  v-if="userInfo.u_address === $store.state.userInfo.u_address"
                  @click="unfocusFriend(friend.u_address)">
                  <md-icon class="md-primary">visibility_off</md-icon>
                </md-button>
              </md-list-item>
            </md-list>
          </md-app-content>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .flex-column {
    flex-direction: column;
  }
  .userpage-header {
    text-align: center;
    padding: 10px 0;
    margin-bottom: 10px;
  }
</style>


<script>
  export default {
    name: 'Userpage',
    data: () => ({
      userInfo: {
        u_address: '',
        nickname: '-',
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
      },
      momentlist: [
        { username: 'Nodreame', createdate: 1530281304000, imgurl: '/img/card-content-1.jpg', desc: '6666'},
        { username: 'Nodreame', createdate: 1530281388000, imgurl: '/img/card-content-2.jpg', desc: '这家伙很懒，什么也没留下.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.'},
        { username: 'Nodreame', createdate: 1530281355000, imgurl: '/img/card-content-3.jpg', desc: '6666'},
      ],
      friendlist: [
        // u_address+nickname+desc+createdate
        { u_address: 'aaa', nickname: '123', desc: '这家伙很懒，什么也没留下.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.', createdate: 1530281330100, avatar: 'https://placeimg.com/40/40/people/5' },
        { u_address: 'bbb', nickname: '123', desc: '这家伙很懒，什么也没留下.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.', createdate: 1530281330000, avatar: 'https://placeimg.com/40/40/people/5' },
        { u_address: 'ccc', nickname: '123', desc: '这家伙很懒，什么也没留下.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.', createdate: 1530281303000, avatar: 'https://placeimg.com/40/40/people/5' },
      ],
      isFocusingFriend: false,
      isUnfocusingFriend: false
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
        console.log('this.userInfo:', this.userInfo)
      },
      formatTime: function (date, type) {
        const dateTime = new Date(date)
        let strResult = '';
        type = type? type: 'date'
        if (type === 'date') {
          strResult = (dateTime.getFullYear()) + '.'
             + (dateTime.getMonth() + 1) + '.'
             + dateTime.getDate();
        } else if (type === 'hour') {
          strResult = (dateTime.getFullYear()) + '.'
             + (dateTime.getMonth() + 1) + '.'
             + dateTime.getDate() + ' '
             + dateTime.getHours() + ':'
             + dateTime.getMinutes() + ':'
             + dateTime.getSeconds()
        }
        return strResult;
      },
      formatSex: function (str) {
        if (str === '0') {
          return '未知'
        } else if (str === '1') {
          return '男'
        } else {
          return '女'
        }
      },
      formatDev: function (str) {
        return str === '0'? '玩家': '开发者'
      },
      formatAvatar: function (url) {
        return url? url: '/img/avatar.png'
      },
      shareLink: function () {
        // TODO: copy link & alert
        // alert('链接已复制，发送给小伙伴们一起来加入吧~')
        alert('开发中')
      },
      focusFriend: function () {
        // console.log('this.tempConndata:', this.tempConndata)
        if (!this.userInfo.u_address) return
        const contract = this.$store.state.dappAddr
        const fnName   = 'addFriendforUser'
        const args     = [this.userInfo.u_address]
        const options  = { value: '0' }
        const that     = this
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.isFocusingFriend = true;
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp);
            } else if (resp.status === 1) {
              console.log('success:', resp);
              console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
              that.neb.api.call({
                from:   resp.from,
                to:     resp.to,
                value:  0,
                contract: {
                  function: 'getUserInfoByAddress',
                  args:     JSON.stringify([resp.from])
                },
                gasPrice: 1000000,
                gasLimit: 2000000
              }).then((data) =>{
                console.log('data', data);
                var userObj = JSON.parse(data.result);
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
              }, (error) => {
                console.error('error:', error)
              });
            } else {
              console.log('waiting:', resp);
            }
            that.isFocusingFriend = false
          }, (error) => {
            console.error('queryPayId error:', error);
            that.isFocusingFriend = false
          });
        }, (error) => {
          console.error('login error:', error)
          that.isFocusingFriend = false
        })
      },
      unfocusFriend: function (address) {
        if (!this.userInfo.u_address) return
        const contract = this.$store.state.dappAddr
        const fnName   = 'deleteFriendforUser'
        const args     = [this.userInfo.u_address]
        const options  = { value: '0' }
        const that     = this
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.isUnfocusingFriend = true;
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp);
            } else if (resp.status === 1) {
              console.log('success:', resp);
              console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
              that.neb.api.call({
                from:   resp.from,
                to:     resp.to,
                value:  0,
                contract: {
                  function: 'getUserInfoByAddress',
                  args:     JSON.stringify([resp.from])
                },
                gasPrice: 1000000,
                gasLimit: 2000000
              }).then((data) =>{
                console.log('data', data);
                var userObj = JSON.parse(data.result);
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
              }, (error) => {
                console.error('error:', error)
              });
            } else {
              console.log('waiting:', resp);
            }
            that.isUnfocusingFriend = false
          }, (error) => {
            console.error('queryPayId error:', error);
            that.isUnfocusingFriend = false
          });
        }, (error) => {
          console.error('login error:', error)
          that.isUnfocusingFriend = false
        })
      },
      addFocus: function () {
        alert('开发中, 通过地址添加好友')
      }
    },
    computed: {
      hasFocus: function () {
        console.log('hasFocus')
        const that  = this
        let isFocus = false
        this.$store.state.userInfo.friendlist.forEach(user => {
          if(user.u_address === that.userInfo.u_address) {
            isFocus = true
          }
        })
        return isFocus
      }
    },
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
        const resultData = JSON.parse(data.result)
        console.log('resultData.data:', resultData.data)
        that.setUserInfo(resultData.data)
      })
    }
  }
</script>