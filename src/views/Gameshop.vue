<template>
  <div class="md-layout flex-column">
    <div class="md-layout-item md-xsmall-size-90">
      <img src="../assets/gameshop-banner.jpg" alt="banner">
    </div>
    <div class="md-layout-item md-xsmall-size-90">
      <md-tabs class="md-transparent" md-alignment="fixed">
        <md-tab id="tab-home" md-label="全部">
          <md-card md-with-hover v-bind:key="game.g_address" v-for="game in gamelist" @click="jump2GamePage(game.g_address)">
            <md-card-media-cover md-solid>
              <router-link :to="'/gamepage/'+game.g_address">
                <md-card-media md-ratio="1:1">
                  <img :src="formatBgImgurl(game.g_imgurl_mini)" alt="" style="top: 0; transform: translateY(0);">
                </md-card-media>

                <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
                  <md-card-header>
                    <span class="md-title">{{game.g_name}}</span>
                    <span class="md-subhead">创建日期：{{formatTime(game.createdate)}}</span>
                  </md-card-header>
                </md-card-area>
              </router-link>
            </md-card-media-cover>
          </md-card>
        </md-tab>
        <md-tab id="tab-pages" md-label="最新">
          <md-card md-with-hover v-bind:key="game.g_address" v-for="game in gamelist" @click="jump2GamePage(game.g_address)"
            v-if="isNewgame(game.createdate)">
            <md-card-media-cover md-solid>
              <router-link :to="'/gamepage/'+game.g_address">
              <md-card-media md-ratio="1:1">
                <img :src="formatBgImgurl(game.g_imgurl_mini)" alt="" style="top: 0; transform: translateY(0);">
              </md-card-media>

              <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
                <md-card-header>
                  <span class="md-title">{{game.g_name}}</span>
                  <span class="md-subhead">创建日期：{{formatTime(game.createdate)}}</span>
                </md-card-header>
              </md-card-area>
              </router-link>
            </md-card-media-cover>
          </md-card>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>
<style scoped>
  .flex-column {
    flex-direction: column;
  }
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
  export default {
    data: () => ({
      gamelist: []
    }),
    methods: {
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
      formatBgImgurl: function (url) {
        return url? url: './img/default_imgurl_mini.png'
      },
      isNewgame: function (date) {
        console.log('Date.now() - date:', Date.now() - date)
        return (Date.now() - date > 604800000)? false: true
      }
    },
    created: function () {
        console.log('created')
        if (!this.$store.state.userInfo.u_address) {
          // jump to login page
          this.$router.push('/')
        }
    },
    mounted: function () {
        const that = this
        console.log('this.$store.state.dappAddr:', this.$store.state.dappAddr)
        this.neb.api.call({
          from: this.$store.state.dappAddr,
          to:   this.$store.state.dappAddr,
          value: 0,
          contract: {
            function: 'getGameInfoList',
            args: JSON.stringify([50, 0])
          },
          gasPrice: 1000000,
          gasLimit: 2000000
        }).then(function (resp) {
          console.log('resp.result:', resp.result)
          var resultData = JSON.parse(resp.result)
          console.log('resultData.data.length:', resultData.data.length)
          var gamelist = [];
          if (resultData.data) {
            for (let i=0; i<resultData.data.length; i++) {
              that.gamelist.push(resultData.data[i]);
            }
            console.log('gamelist:', that.gamelist);
          }
        });
    }
  }
</script>