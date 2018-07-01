<template>
  <div class="md-layout">
    <div class="md-layout-item md-xlarge-size-70 md-large-size-70 md-medium-size-70 md-small-size-50 md-xsmall-size-100" style="display:flex;flex-direction: column;">
      <md-card class="md-primary md-elevation-10" md-theme="black-card" style="margin: 4px;">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">
              {{$store.state.userInfo.nickname}}
              <!-- <md-button class="md-icon-button md-dense" style="color: #fff" to="/settings">
                <md-icon>edit</md-icon>
              </md-button> -->
            </div>
            <div class="md-subhead">
              <!-- <p>最后登录时间：<span>{{formatTime($store.state.userInfo.logindate, 'hour')}}</span></p> -->
              <p>游戏数：<span>{{$store.state.userInfo.gamelist.length}}</span></p>
              <p>关注人数：<span>{{$store.state.userInfo.friendlist.length}}</span></p>
            </div>
          </md-card-header-text>
          <md-card-media md-big>
            <router-link :to="'/userpage/' + $store.state.userInfo.u_address">
              <img :src="$store.state.userInfo.avatar" alt="Avatar">
            </router-link>
          </md-card-media>
        </md-card-header>
        <md-card-content>{{$store.state.userInfo.desc}}</md-card-content>
      </md-card>
      
      <md-card style="margin: 4px;">
        <md-toolbar class="md-dense" md-elevation="0">
          <span>
            <md-icon class="md-dense">videogame_asset</md-icon>
            我的游戏
          </span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" to="/mygames">
              <md-icon>settings</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <div class="elevation-demo md-elevation-5">
          <div class="md-game-limitheight" v-if="$store.state.userInfo.gamelist.length === 0"></div>
          <md-card md-with-hover  v-for="game in $store.state.userInfo.gamelist" v-bind:key="game.g_address"
            @click="jump2GamePage(game.g_address)" class="md-game-card">
            <md-card-media-cover md-solid>
              <router-link :to="'/gamepage/'+game.g_address">
                <md-card-media md-ratio="1:1">
                  <img :src="formatBgImgurl(game.g_imgurl_mini)" alt="" style="top: 0; transform: translateY(0);">
                </md-card-media>

                <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
                  <md-card-header>
                    <span class="md-title">{{game.g_name}}</span>
                    <span class="md-subhead">{{formatTime(game.add_date)}}出品</span>
                  </md-card-header>
                </md-card-area>
              </router-link>
            </md-card-media-cover>
          </md-card>
        </div>
      </md-card>
    </div>
    <div class="md-layout-item md-xlarge-size-30 md-large-size-30 md-medium-size-30 md-small-size-50 md-xsmall-size-100 md-elevation-10" 
        style="flex-direction: column; background-color: #545454;">
      <md-toolbar class="md-dense" md-elevation="0">
        <span>
          <md-icon class="md-dense">local_play</md-icon>
          游戏人生
        </span>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="showAddMomentDialog=true"
            v-if="!isCommitingMoment">
            <md-icon>add</md-icon>
          </md-button>
          <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
            v-if="isCommitingMoment">
          </vue-loading>
        </div>
      </md-toolbar>
      <md-app-content style="height: 85vh; display: flex; flex-direction: column; overflow-y: auto;" >
        <md-card v-bind:key="moment.createdate" v-for="moment in $store.state.userInfo.momentlist">
        <!-- <md-card v-bind:key="moment.createdate" v-for="moment in momentlist"> -->
          <md-card-header>
            <md-avatar>
              <img src="../assets/avatar.jpg" alt="Avatar">
            </md-avatar>
            <div class="md-title">{{moment.nickname}}</div>
            <p class="md-subhead">{{formatTime(moment.date, 'hour')}}</p>
          </md-card-header>
          <!-- <md-card-media>
            <img :src="moment.m_imgurllist" alt="img" v-bind::key="imgurl"
              v-for="imgurl in moment.m_imgurllist">
          </md-card-media> -->
          <md-card-content>{{moment.desc}}</md-card-content>
        </md-card>
      </md-app-content>
    </div>

<!-- nickname+avatar+m_imgurllist+date -->
    <md-dialog :md-active.sync="showAddMomentDialog" style="padding: 0 20px;">
      <md-dialog-title>发圈圈</md-dialog-title>

      <md-field>
        <label>我的想法:</label>
        <md-textarea v-model="newMomentInfo.desc"></md-textarea>
      </md-field>

      <!-- <md-field>
        <label>游戏图标</label>
        <md-file v-model="localpath" accept="image/*" @md-change="uploadImg"/>
      </md-field> -->
      <!-- <img :src="newMomentInfo.m_imgurllist[0]" alt="" width="200" height="100"> -->

      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddMomentDialog = false">取消</md-button>
        <md-button class="md-primary" @click="commitMomentInfo">确定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<style lang="scss" scoped>
  ::-webkit-scrollbar {display: none;}
  .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-game-limitheight {
    min-height: 40vh;
  }
  .md-game-card {
    width: 240px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .elevation-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
  }
  .elevation-demo > .md-content {
    width: 100px;
    height: 100px;
    margin: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
  export default {
    name: 'Dashboard',
    data: () => ({
      uname: '',
      showAddMomentDialog: false,
      isCommitingMoment: false,
      newMomentInfo: {},
      localpath: [],
      momentlist: [
        { username: 'Nodreame', createdate: 1530281304000, imgurl: '/img/card-content-1.jpg', desc: '6666'},
        { username: 'Nodreame', createdate: 1530281388000, imgurl: '/img/card-content-2.jpg', desc: '这家伙很懒，什么也没留下.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.'},
        { username: 'Nodreame', createdate: 1530281355000, imgurl: '/img/card-content-3.jpg', desc: '6666'},
      ],
      gamelist: [
        { g_address: 'a22222313213', g_name: '侠客风云传-前传', add_date: 1529744363000, g_imgurl_mini: '/img/game-1.jpg', isHold: false},
        { g_address: 'b11112332323', g_name: '古剑奇谭', add_date: 1529744363000, g_imgurl_mini: '/img/game-2.jpg', isHold: false},
        { g_address: 'c41412231311', g_name: '轩辕剑', add_date: 1529744360003, g_imgurl_mini: '/img/game-3.jpg', isHold: false}
      ],
    }),
    methods: {
      switchPage: function (title) {
        this.nowTitle = title
        this.showNavigation = false
      },
      formatTime: function (date, type) {
        const dateTime = new Date(date)
        let strResult = ''
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
      formatBgImgurl: function (url) {
        return url? url: './img/default_imgurl_mini.png'
      },
      uploadImg: function (e) {
        console.log('e', e)
        const that  = this
        let file    = e[0]
        let param   = new FormData()
        param.append('file', file, file.name)
        console.log(param.get('file'))
        let config = {
          headers: { 'Content-Type': 'multipart/form-data'}
        }
        this.$http.post(this.$store.state.imgUrl, param, config)
          .then(resp => {
            console.log('resp.data', resp.data)
            const moment = JSON.parse(JSON.stringify(that.newMomentInfo))
            moment.m_imgurllist = []
            moment.m_imgurllist[0] = resp.data.data
            that.newMomentInfo = moment
            console.log('that.newMomentInfo:', that.newMomentInfo)
          })
      },
      commitMomentInfo: function () {
        const contract = this.$store.state.dappAddr
        const fnName   = 'addMomentInfo'
        const args     = [this.newMomentInfo]
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then(payId => {
          console.log('payId:', payId);
          this.showAddMomentDialog = false
          this.isCommitingMoment = true
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp)
              that.isCommitingMoment = false
            } else if (resp.status === 1) {
              console.log('success:', resp)
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
              }).then(function (data) {
                console.log('data', data);
                var userObj = JSON.parse(data.result);
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                // that.$router.push('/dashboard');
                this.newMomentInfo = {}
              });
            } else {
              console.log('waiting:', resp)
            }
            that.isCommitingMoment = false
            that.showAddMomentDialog = false
          }, (error) => {
            console.error('queryPayId error:', error)
            that.isCommitingMoment = false
            that.showAddMomentDialog = false
          });
        }, (error) => {
          console.error('login error:', error)
          that.isCommitingMoment = false
          that.showAddMomentDialog = false
        })
      }
    },
    computed: {
      num_games () {
        console.log('this.$store.state', this.$store.state)
        if (this.$store.state.userInfo.gamelist === '-') {
          return '数据获取中...'
        }
        if (this.$store.state.userInfo.gamelist instanceof Array && this.$store.state.userInfo.gamelist.length >= 0) {
          return this.$store.state.userInfo.gamelist.length + '个'
        }
      },
    },
    created: function () {
      console.log('created:', this.$store.state.userInfo)
      if (!this.$store.state.userInfo.u_address) {
        this.$router.push('/');
      }
    }
  }
</script>