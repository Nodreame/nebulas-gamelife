<template>
  <div>
    <md-card md-with-hover v-bind:key="game.g_address" v-for="game in $store.state.userInfo.gamelist" @click="jump2GamePage(game.address)">
      <md-card-media-cover md-solid>
        <router-link :to="'/gamepage/' + game.g_address">
        <md-card-media md-ratio="1:1">
          <img :src="formatBgImgurl(game.g_imgurl_mini)" alt="" style="top: 0; transform: translateY(0);">
        </md-card-media>

        <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
          <md-card-header>
            <span class="md-title">{{game.g_name}}</span>
            <span class="md-subhead">{{game.desc}}</span>
          </md-card-header>
        </md-card-area>
        </router-link>
      </md-card-media-cover>
    </md-card>
    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
      <span>商店里又有新游戏啦，快去看看吧!</span>
      <!-- <md-button class="md-primary" to="/mygames" @click="showSnackbar=false">知道了</md-button> -->
      <md-button class="md-primary" to="/gameshop">前往</md-button>
    </md-snackbar>
  </div>
</template>
<style lang="scss" scoped>
  .md-card {
    width: 240px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
<script>
  export default {
    name: 'Mygames',
    data: () => ({
      gamelist: [
        { g_address: 'aaaaaa', g_name: '侠客风云传-前传', desc: '就埃里克森大家开始拉家带口垃圾的老咔叽安康阿斯顿垃圾的撒', g_imgurl_mini: '/img/game-1.jpg', isHold: false},
        { g_address: 'bbbbbb', g_name: '古剑奇谭', desc: '哈哈哈哈', g_imgurl_mini: '/img/game-2.jpg', isHold: false},
        { g_address: 'cccccc', g_name: '轩辕剑', desc: '哈哈哈', g_imgurl_mini: '/img/game-3.jpg', isHold: false}
      ],
      showSnackbar: true
    }),
    methods: {
      formatBgImgurl: function (url) {
        return url? url: '/img/default_imgurl_mini.png'
      },
    },
    created: function () {
      console.log('created')
      if (!this.$store.state.userInfo.u_address) {
        // jump to login page
        this.$router.push('/');
      }
    },
    mounted: function () {
      var that = this
      this.neb.api.call({
        from: this.$store.state.dappAddr,
        to:   this.$store.state.dappAddr,
        value: 0,
        contract: {
          function: 'getUserInfoByAddress',
          args: JSON.stringify([this.$store.state.userInfo.u_address])
        },
        gasPrice: 1000000,
        gasLimit: 2000000
      }).then(function (data) {
        console.log('data', data);
        console.log('that:', that);
        var userObj = JSON.parse(data.result);
        console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
        console.log('userObj.data:', userObj.data)
        that.$store.commit('update_userInfo', userObj.data)
        console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
      });
    }
  }
</script>
