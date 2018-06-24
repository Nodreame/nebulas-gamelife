<template>
  <div>
    <!-- <h1>{{$router.params.addr}}</h1> -->
    <!-- <h1>Hello, {{params.addr}}</h1>
    <md-button @click="addGame">添加游戏</md-button> -->
    <iframe src="https://plat.tgp.qq.com/middle/login/jump.html?url=https%3A%2F%2Fplat.tgp.qq.com%2Frail%2Fwegame_game_detail.html%3Ftop_class%3D3%26nav_type%3D2%26from%3Dstore_filter.game_list%26unionsite%3Dwegamesite%253A-%253Ajump%253A-%26t%3D1529638474312%26game_id%3D2000016&ticket=bnVsbA%3D%3D" 
      frameborder="0"  style="width: 100vw; height: 100vh;"></iframe>
    <!-- <div class="contenner">
      <div class="logo">
        <div class="name">SUPER DICTIONARY</div>
        <div class="img logo_rotate">
            <img src="img/logo.png" alt="">
        </div>
      </div>
      <div class="noExtension" v-if="isHasExtension" id="noExtension">
        NOTE: Please install <a target="_blank" href="https://github.com/ChengOrangeJu/WebExtensionWallet">WebExtensionWallet</a>  to use SUPER DICTIONARY
      </div>
      <div class="search">
        <input id="search_value" v-model="search" type="text" :disabled="isHasExtension" @keyup.enter="toSearch">
        <button id="search" @click="toSearch" :disabled="isHasExtension">search</button>
      </div>

      <div class="result_success" v-if="Object.keys(result).length > 0">
        <div id=search_banner></div>
        <p id=search_result>{{result.value}}</p>
        <div class="author">
          <i><p> Author:</p> <p id=search_result_author> {{result.author}}</p></i>
        </div>
      </div>

      <div class="result_faile" v-if="fail_add">
        Failed to find related information. Do you want to <button id="add" @click="toShow">add</button> infromation for "<i id="result_faile_add">{{fail_add}}</i>"?
      </div>

      <div class="add_banner" v-if="isShowAdd">
        <input type="text" id="add_value" v-model="add_value" placeholder="input contents for your keyword">
        <button id="push" @click="toAdd">submit</button>
      </div>
    </div> -->


  </div>
</template>
<script>
  import NebPay from 'nebpay.js'
  const nebPay = new NebPay()

  var HttpRequest = require("nebulas/lib/httprequest");
  var Neb = require('nebulas/lib/neb');
  var Account = require('nebulas/lib/account');
  var Transaction = require('nebulas/lib/transaction');
  var neb = new Neb();
  var that = this
  neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"))
  console.log('neb.api:', neb.api)

  export default {
    name: 'Gamepage',
    data: () => ({

      // test data
      // isHasExtension: typeof webExtensionWallet === 'undefined',
      // search: '',
      // add_value: '',
      // isShowAdd: false,
      // hasResult: false,
      // fail_add: '',
      // result: {},

      // for add 
      gameAddress: ''
    }),
    methods: {
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
              // console.log('this.$router:', this.$router);
              // reget(response.from)
              // goDashboard(response.from)
            } else {
              hashCount++;
              setTimeout(() => {
                hashListener(txhash);
              }, 5000);
            }
          });
        }

        // var reget = function (userAddr) {
        //   neb.api.call({
        //     from: userAddr,
        //     to:   "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
        //     value: 0,
        //     contract: {
        //       function: 'getUserInfoByAddress',
        //       args: JSON.stringify([userAddr])
        //     },
        //     gasPrice: 1000000,
        //     gasLimit: 2000000
        //   }).then(function (data) {
        //     console.log('data', data);
        //     console.log('that:', that);
        //     console.log('this:', this);
        //     var userObj = JSON.parse(data.result);
        //     console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
        //     console.log('userObj.data:', userObj.data)
        //     that.$store.commit('update_userInfo', userObj.data)
        //     console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
        //     that.$router.push('/dashboard');
        //   });
        // }
      }

      // toSearch () {
      //   this.$payapi.get({key: this.search}).then(res => {
      //     if (!res) {
      //       this.fail_add = this.search
      //       this.result = {}
      //     } else {
      //       this.fail_add = ''
      //       this.result = res
      //     }
      //   })
      //   this.isShowAdd = false
      // },
      // toShow () {
      //   this.fail_add = ''
      //   this.isShowAdd = true
      // },
      // toAdd () {
      //   this.$payapi.save({key: this.search, content: this.add_value}).then(res => {
      //     console.log('response of push: ' + res)
      //   })
      // }
    },
    computed: {
      params () {
        // console.log('this.$route:', this.$route);
        this.gameAddress = this.$route.params
        return this.$route.params;
      }
    },
    created: function () {
      console.log('created')
      if (!this.$store.state.userInfo.u_address) {
        // jump to login page
        // this.$router.push('/');
      }
    }
  }
</script>