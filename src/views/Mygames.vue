<template>
  <div>
    <md-card md-with-hover v-bind:key="game.id" v-for="game in gamelist" @click="jump2GamePage(game.address)">
      <md-card-media-cover md-solid>
        <router-link :to="'/gamepage/'+game.address">
        <md-card-media md-ratio="1:1">
          <img :src="game.img.mini" alt="" style="top: 0; transform: translateY(0);">
        </md-card-media>

        <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
          <md-card-header>
            <span class="md-title">{{game.name}}</span>
            <span class="md-subhead">{{game.desc}}</span>
          </md-card-header>
        </md-card-area>
        </router-link>
      </md-card-media-cover>
    </md-card>
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" 
      :md-active.sync="showSnackbar" md-persistent>
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
  var HttpRequest = require("nebulas/lib/httprequest");
  var Neb = require('nebulas/lib/neb');
  var Account = require('nebulas/lib/account');
  var Transaction = require('nebulas/lib/transaction');

  // console.info('Neb：', Neb);
  // console.info('Account:', Account)
  // console.info('Transaction:', Transaction)
  // console.info('Utils', Utils)
  // console.info('Util', Util)
  // console.info('Api', Api)

  
  var neb = new Neb();
  neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"))
  console.log('neb.api:', neb.api)
  var that = this;
  export default {
    name: 'Mygames',
    data: () => ({
      gamelist: [
        { id: 1, address: 'a', name: '侠客风云传-前传', desc: '就埃里克森大家开始拉家带口垃圾的老咔叽安康阿斯顿垃圾的撒', img: { mini: '/img/game-1.jpg', headerbg: '/img/bg-1-header', mainbg: '/img/bg-1-body'}},
        { id: 2, address: 'b', name: '古剑奇谭', desc: '哈哈哈哈', img: { mini: '/img/game-2.jpg', headerbg: '/img/bg-2-header', mainbg: '/img/bg-2-body'}},
        { id: 3, address: 'c', name: '轩辕剑', desc: '哈哈哈', img: { mini: '/img/game-3.jpg', headerbg: '/img/bg-3-header', mainbg: '/img/bg-3-body'}}
      ],
      showSnackbar: true,
      position: 'center',
      isInfinity: true
    }),
    methods: {
      // jump2GamePage: function (addr) {
      //   console.log('click:', addr);
      //   console.log('this.$router:', this.$router);
      //   this.$router.push({ name: 'gamepage', params: { address: addr }});
      // }
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
        neb.api.call({
          from: "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
          to:   "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
          value: 0,
          contract: {
            function: 'getUserInfoByAddress',
            args: JSON.stringify([that.$store.state.userInfo.u_address])
          },
          gasPrice: 1000000,
          gasLimit: 2000000
        }).then(function (data) {
          console.log('data', data);
          console.log('that:', that);
          console.log('this:', this);
          var userObj = JSON.parse(data.result);
          console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          console.log('userObj.data:', userObj.data)
          that.$store.commit('update_userInfo', userObj.data)
          console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          // that.$router.push('/dashboard');
          // console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          // console.log('userObj.data:', userObj.data)
          // that.$store.commit('update_userInfo', userObj.data)
          // console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          // that.$router.push('/dashboard');
        });
    }
  }
</script>
