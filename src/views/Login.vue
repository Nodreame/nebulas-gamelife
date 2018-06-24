<template>
  <div class="keepcenter">
    <img src="../assets/logo.png" alt="logo">
    <h1>游戏人生</h1>
    <md-button class="md-raised md-primary" @click="login">登录</md-button>
    <!-- <md-dialog-prompt
      :md-active.sync="showDialog"
      md-title="登录中，请稍候..."
      md-confirm-text="确定"/> -->
    <md-dialog-confirm
      :md-active.sync="showDialog"
      md-title="登录中，请稍候..."
      md-confirm-text="确定"
      md-cancel-text="取消"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import NebPay from 'nebpay.js'
  // import { Neb } from 'nebulas'
  // import Neb from 'nebulas/lib/neb'
  // import Account from 'nebulas/lib/account'
  // import Transaction from 'nebulas/lib/transaction'
  // import Utils from 'nebulas/lib/utils/utils'
  // import Util from 'nebulas/lib/utils/unit'
  // import Api from 'nebulas/lib/api'
  // import HttpRequest from 'nebulas/lib/httprequest'

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


  // 
  // console.error('Nebpay.config:', NebPay.config);
  // import { setTimeout } from 'timers';
  const nebPay = new NebPay()
  // var nebulas = require("nebulas")
  // console.error('nebulas:', nebulas)
  // import {Account, Utils} from 'nebulas'
  // console.log('nebulas:', nebulas)
  // const Neb = new nebulas.Neb()
  // console.log('Neb:', Neb);

  export default {
    name: 'Login',
    data: () => ({
      nickname: null,
      showDialog: false
    }),
    methods: {
      login: function () {
        // Todo: contract get userinfo
        //        if obj include addr -> save to vuex
        //        else obj without addr
        var listenCount = 0;
        var hashCount   = 0;
        const to = this.$store.state.dappAddr
        console.log('to', to)
        const value    = '0'
        const callFunc = 'getUserInfo'
        const param    = []
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
                    // console.log(data.data.execute_result);
                    // this.$payapi.getUserInfoByAddress();
                    // var result = JSON.parse(data.data.execute_result);
                    // if (result.status) {
                    // TODO: 同步状态
                    // } else {
                    // this.openNameDialog()
                    // console.log('this.showDialog', this.showDialog);
                    // this.showDialog = true   
                    // Vue.set('showDialog', true)   
                    // }

                      // var userObj = JSON.parse(result.data);
                      // console.log('result.data:', result.data);
                      // console.log('this.$store.state.userInfo:', this.$store.state.userInfo)
                      // this.$store.commit('update_userInfo', fakeUserObj)
                      // console.log('this.$store.state.userInfo:', this.$store.state.userInfo)

                      // ToFix: this.fail
                      // this.$router.push('/');
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
        // var hashlistener = function () {
        //   console.log('hashlistener');
        // }
        var hashListener = function (txhash) {
          that.showDialog = true;
          if (hashCount > 6) { return ;}
          neb.api.getTransactionReceipt({
            hash: txhash
          }).then (function (response) { // status: 2(pending) 1(success)
            console.log('response:', response); 
            if (response.status === 1) {
              console.log('write to NEBULAS success!');
              // console.log('this.$router:', this.$router);
              reget(response.from)
              // goDashboard(response.from)
            } else {
              hashCount++;
              setTimeout(() => {
                hashListener(txhash);
              }, 5000);
            }
          });
        }

        var reget = function (userAddr) {
          neb.api.call({
            from: userAddr,
            to:   "n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc",
            value: 0,
            contract: {
              function: 'getUserInfoByAddress',
              args: JSON.stringify([userAddr])
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
            that.$router.push('/dashboard');
          });
        }
          // var goDashboard =  function () {
          //   console.log('goDashboard:', goDashboard);
          //   // this.$router.push('/');
          // }
      },

      dialog_confirm: function () {
        this.showDialog = true
      },
      dialog_cancel: function () {
        this.showDialog = true
      },
      openNameDialog: function () {
        console.log('this.showDialog', this.showDialog);
        this.showDialog = true  
      }
    }
  }
</script>
<style scoped>
  .keepcenter {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
  }
</style>


    <!-- <md-field>
      <label>昵称</label>
      <md-input v-model="nickname"></md-input>
    </md-field>
    <md-button>确认</md-button> -->
    <!-- <div class="center">
      haha
    </div> -->
