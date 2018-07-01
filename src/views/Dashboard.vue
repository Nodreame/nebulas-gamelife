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
          <!-- <div class="md-game-limitheight" v-if="gamelist.length === 0"></div>
          <md-card md-with-hover  v-for="game in gamelist" v-bind:key="game.g_address"
            @click="jump2GamePage(game.g_address)" class="md-game-card"> -->
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
          <md-button class="md-icon-button">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-app-content style="height: 85vh; display: flex; flex-direction: column; overflow-y: auto;" >
        <md-card v-bind:key="moment.createdate" v-for="moment in $store.state.userInfo.momentlist">
        <!-- <md-card v-bind:key="moment.createdate" v-for="moment in momentlist"> -->
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
    <!-- <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Activity">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Account">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog> -->



    <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Prompt</md-button> -->
    <!-- <span v-if="value">Value: {{ value }}</span> -->
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
      // momentsExample data
      showDialog: false,
      uname: '',

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
        return url? url: '/img/default_imgurl_mini.png'
      },
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
      // num_achipoints () {
      //   if (this.$store.state.userInfo.gamelist === '-') {
      //     return '数据获取中...'
      //   }
      //   if (this.$store.state.userInfo.gamelist instanceof Array && this.$store.state.userInfo.gamelist.length >= 0) {
      //     return this.$store.state.userInfo.gamelist.length + '个'
      //   }
      // }

    },
    created: function () {
      console.log('created:', this.$store.state.userInfo)
      if (!this.$store.state.userInfo.u_address) {
        this.$router.push('/');
      }
    }
  }
</script>