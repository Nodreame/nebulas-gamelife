<template>
  <div class="md-layout flex-column">
    <!-- <iframe src="https://plat.tgp.qq.com/middle/login/jump.html?url=https%3A%2F%2Fplat.tgp.qq.com%2Frail%2Fwegame_game_detail.html%3Ftop_class%3D3%26nav_type%3D2%26from%3Dstore_filter.game_list%26unionsite%3Dwegamesite%253A-%253Ajump%253A-%26t%3D1529638474312%26game_id%3D2000016&ticket=bnVsbA%3D%3D" 
      frameborder="0"  style="width: 100vw; height: 100vh;"></iframe> -->

    <div class="gamepage-header md-layout-item md-xsmall-size-100 md-elevation-10">
      <md-card class="md-xlarge-size-30 md-large-size-30 md-medium-size-30 md-small-size-50 md-xsmall-size-100 md-elevation-0">
        <md-card-header>
          <!-- <md-card-media> -->
          <img :src="formatBgImgurl(gameinfo.g_imgurl_mini)" alt="People" width="200" height="200"
            style="border-radius:0;">
          <!-- </md-card-media>/ -->
          <md-card-header-text style="margin-left: 20px;">
            <div class="md-title">{{gameinfo.g_name}}</div>
            <div class="md-subhead">{{formatTime(gameinfo.createdate)}}</div><br/>
            <md-button class="md-raised md-accent" @click="showAddGameDialog=true"
              :disabled="isAddingGame">
              <md-icon>add</md-icon>
              添加
              <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
                v-if="isAddingGame">
              </vue-loading>
            </md-button>
          </md-card-header-text>
        </md-card-header>
      </md-card>
    </div>

    <div class="md-layout-item md-xsmall-size-100 md-elevation-10">
      <md-tabs md-sync-route>
        <md-tab id="tab-detail" md-label="游戏详情">
          <p>简介：{{gameinfo.desc}}</p>
          <p>官方网站：<a :href="gameinfo.websiteurl" target="_blank">{{gameinfo.websiteurl}}</a></p>
          <p>游戏截图：暂无</p>
          <p>游戏评价：开发中</p>
          <p>
            <md-button class="md-raised md-primary" :href="gameinfo.websiteurl" target="_blank">
              <md-icon>play_arrow</md-icon>开始游戏
            </md-button>
          </p>
        </md-tab>

        <md-tab id="tab-achi" md-label="游戏成就">
          开发中
        </md-tab>

        <md-tab id="tab-store" md-label="游戏周边">
          开发中
        </md-tab>
      </md-tabs> 
    </div>

    <md-dialog-confirm
      :md-active.sync="showAddGameDialog"
      md-title="添加游戏"
      md-content="确定添加该游戏到你的游戏列表中？"
      md-confirm-text="确定"
      md-cancel-text="取消"
      @md-cancel="showAddGameDialog=false"
      @md-confirm="onAddGameConfirm" />
  </div>
</template>

<style lang="scss" scoped>
  .flex-column {
    flex-direction: column;
  }
  .gamepage-header {
    padding: 10px 0;
    margin-bottom: 10px;
  }
  .md-card {
    min-width: 320px;
    max-width: 768px;
  }
</style>

<script>
  export default {
    name: 'Gamepage',
    data: () => ({
      gameinfo: {},
      showAddGameDialog: false,
      isAddingGame: false
    }),
    methods: {
      onAddGameConfirm: function () {
        const contract = this.$store.state.dappAddr
        const fnName   = 'addGameforUser'
        const args     = [this.gameinfo.g_address]
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.isAddingGame = true;
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp);
              that.isAddingGame = false;
            } else if (resp.status === 1) {
              console.log('success:', resp)
              if (!resp.result.status) { 
                // TODO: hide btn_add, show 已添加
                alert(resp.result.msg)                
              }
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
                console.log('data', data)
                var userObj = JSON.parse(data.result)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                that.isAddingGame = false;
              }, (error) => {
                console.error('error:', error)
                that.isAddingGame = false;
              });
            } else {
              console.log('waiting:', resp);
            }
          }, (error) => {
            console.error('queryPayId error:', error);
          });

        }, (error) => {
          console.error('login error:', error);
        });
      },
      addGame: function () {
        var listenCount = 0;
        var hashCount   = 0;
        const to = this.$store.state.dappAddr
        console.log('to', to)
        const value    = '0'
        const callFunc = 'addGameforUser'
        const param    = [this.gameAddress]
        const callArgs = JSON.stringify(param)
        let options    = {
          goods: { name: 'nebpay' },
          callback: 'https://pay.nebulas.io/api/mainnet/pay'
        }
        var that = this;
        var serialNum = nebPay.call(to, value, callFunc, callArgs, options)
        var intervalQuery = setInterval(function() {
          nebPay.queryPayInfo(serialNum)
            .then(function (dataStr) {
              if (listenCount < 8) {
                var data = JSON.parse(dataStr);
                console.log('data:', data);
                if (data.code === 0) {    // data.code为0即serialNum已确认，可以换hash继续查或者继续等待data.data.status为1
                  if (data.data.status === 1) {
                    console.log(data);
                    clearInterval(intervalQuery);
                  } else {
                    console.log('data.data:', data.data);
                    hashListener(data.data.hash);
                    clearInterval(intervalQuery);
                  }
                } else {
                  console.log("data.msg.indexOf('does not exist')", data.msg.indexOf('does not exist'));
                  console.log('listenCount:', listenCount);
                  // if (_g.transaction.isReject) {
                  //   alert('提交请求已取消');
                  //   _g.transaction.isReject = false;
                  //   setTimeout(function () {
                  //     clearInterval(intervalQuery);
                  //   }, 5000);
                  // }
                  if (data.msg.indexOf('does not exist') !== -1 && listenCount>4) {
                    console.log('can\'t recognize state of transaction, so go to guide page.');
                    setTimeout(function () {
                      clearInterval(intervalQuery);
                    }, 5000);
                  }
                }
                listenCount++;
              } else {
                console.log('网络连接超时, 五秒后自动刷新网页');
                clearInterval(intervalQuery);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }, 10000); 
        var hashListener = function (txhash) {
          // that.showDialog = true;
          if (hashCount > 6) { return ;}
          neb.api.getTransactionReceipt({
            hash: txhash
          }).then (function (response) { // status: 2(pending) 1(success)
            console.log('response:', response); 
            if (response.status === 1) {
              console.log('write to NEBULAS success!');
              alert('游戏添加成功！');
            } else {
              hashCount++;
              setTimeout(() => {
                hashListener(txhash);
              }, 5000);
            }
          });
        }
      },
      formatBgImgurl: function (url) {
        return url? url: './img/default_imgurl_mini.png'
      },
      formatTime: function (date, type) {
        if (!date) { return '' }
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
      }
    },
    created: function () {
      console.log('created')
      if (!this.$store.state.userInfo.u_address) {
        // this.$router.push('/');
      }
    },
    mounted: function () {
      console.log('this.$route:', this.$route)
      console.log('mounted:', this.$route.params.addr)
      this.gameinfo.g_address = this.$route.params.addr
      const that = this
      this.neb.api.call({
        from:   this.$store.state.dappAddr,
        to:     this.$store.state.dappAddr,
        value:  0,
        contract: {
          function: 'getGameInfo',
          args:     JSON.stringify([this.gameinfo.g_address])
        },
        gasPrice: 1000000,
        gasLimit: 2000000
      }).then((data) => {
        console.log('data.result:', data.result)
        this.gameinfo = JSON.parse(data.result).data
        console.log('this.gameinfo:', this.gameinfo)
      }, (error) => {
        console.error('error:', error)
      })
    }
  }
</script>