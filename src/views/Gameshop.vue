<template>
  <div>
    <div class="md-layout" style="flex-direction: column;">
      <div class="md-layout-item md-xsmall-90">
        <img src="../assets/gameshop-banner.jpg" alt="banner">
      </div>
      <div class="md-layout-item md-xsmall-90">
        <md-tabs class="md-transparent" md-alignment="fixed">
          <md-tab id="tab-home" md-label="全部">
            <md-card md-with-hover v-bind:key="game.g_address" v-for="game in gamelist" @click="jump2GamePage(game.g_address)">
              <md-card-media-cover md-solid>
                <router-link :to="'/gamepage/'+game.g_address">
                <md-card-media md-ratio="1:1">
                  <img :src="game.g_imgurl_mini" alt="" style="top: 0; transform: translateY(0);">
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
          </md-tab>
          <md-tab id="tab-pages" md-label="热门">
            <h3>暂无</h3>
          </md-tab>
          <md-tab id="tab-posts" md-label="免费">
            <h3>暂无</h3>
          </md-tab>
          <!-- <md-tab id="tab-favorites" md-label="">
            Favorites tab
            <p>Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.</p>
          </md-tab> -->
        </md-tabs>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .md-card {
    width: 240px;
    /* height: 160px; */
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-card-media.md-ratio-1-1:before {
    padding-top: 80%;
  }
</style>

<script>
  var HttpRequest = require("nebulas/lib/httprequest");
  var Neb = require('nebulas/lib/neb');
  var Account = require('nebulas/lib/account');
  var Transaction = require('nebulas/lib/transaction');
  var neb = new Neb();
  var that = this
  neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"))
  console.log('neb.api:', neb.api)

  
  export default {
    data: () => ({
      gamelist: []
    }),
    created: function () {
        console.log('created')
        if (!this.$store.state.userInfo.u_address) {
          // jump to login page
          // this.$router.push('/');
        }
    },
    mounted: function () {
        var that = this
        neb.api.call({
          from: "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
          to:   "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
          value: 0,
          contract: {
            function: 'getGameInfoList',
            args: JSON.stringify([50, 0])
          },
          gasPrice: 1000000,
          gasLimit: 2000000
        }).then(function (resp) {
          console.log('resp:', resp);
          var data = JSON.parse(resp.result)
          console.log('data', data);
          console.log('that:', that);
          console.log('this:', this);
          // var gameList = data.data;
          console.log('data.data.length:', data.data.length);
          // var gamelist = [];
          if (data.data) {
            for (let i=0; i<data.data.length; i++) {
              that.gamelist.push(data.data[i]);
            }
            console.log('gamelist:', that.gamelist);
          }
          // console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          // console.log('userObj.data:', userObj.data)
          // that.$store.commit('update_userInfo', userObj.data)
          // console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
          // that.$router.push('/dashboard');
        });
    }
  }
</script>