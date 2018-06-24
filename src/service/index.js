import NebPay from 'nebpay.js'
// import nebulas from 'nebulas'
const nebPay = new NebPay()

// const Neb = new nebulas.Neb()
// const dappAddress = 'n1ifNRidzevuLGnvdrc6Eb39fa7jNft8KQn'

// var nebulas = require("nebulas")
// var Account = nebulas.Account
// var neb = new nebulas.Neb();
// neb.setRequest(
//   new nebulas.HttpRequest(
//     "https://mainnet.nebulas.io"
//   )
// );

const dappAddress = 'n1vQTC6WnL9NNjY8RcVMCszLaDqDb73TMtc'

/**
 *
 * @param {String} callFunction 调用合约的方法
 * @param {Array} param 请求的参数
 * @param {Boolean} needPay 是否需要支付
 */
const api = function (callFunction, param = [], needPay = false) {
  return new Promise((resolve, reject) => {
    const to = dappAddress
    const value = '0'
    const callArgs = JSON.stringify(param)
    /**
     * 如果只查询类的请求 就不需要去支付 直接使用 nebPay 的 simulateCall 即可
     * 如果不是查询类的 需要调用支付接口 使用 nebPay 的 call 调用
     */
    const way = needPay ? 'call' : 'simulateCall'
    nebPay[way](to, value, callFunction, callArgs, {
      listener: (res) => {
        try {
          resolve(JSON.parse(res.result))
        } catch (e) {
          reject(res.result)
        }
      }
    })
  })
}

const payapi = function (callFunction, param = [], needPay = false) {
  // return new Promise((resolve, reject) => {
    const to = dappAddress
    const value = '0'
    const callArgs = JSON.stringify(param)
    let options     = {
      goods: { name: 'nebpay' },
      callback: 'https://mainnet.nebulas.io'
    }
    /**
     * 如果只查询类的请求 就不需要去支付 直接使用 nebPay 的 simulateCall 即可
     * 如果不是查询类的 需要调用支付接口 使用 nebPay 的 call 调用
     */
    const way = needPay ? 'call' : 'simulateCall'
    return nebPay[way](to, value, callFunction, callArgs, options)
  // })
}

// const payapi = function (callFunction, param = []) {
// // return new Promise((resolve, reject) => {
//   const to        = dappAddress
//   const value     = '0'
//   const callArgs  = JSON.stringify(param)
//   let listenCount = 0
//   // let hashCount   = 0
//   let options     = {
//     goods: { name: 'nebpay' },
//     // callback: NebPay.config.mainnetUrl
//   }
//   /**
//    * 如果只查询类的请求 就不需要去支付 直接使用 nebPay 的 simulateCall 即可
//    * 如果不是查询类的 需要调用支付接口 使用 nebPay 的 call 调用
//    */
//   // const way = needPay ? 'call' : 'simulateCall'
//   const serialNum = nebPay.call(to, value, callFunction, callArgs, options)
//   const intervalQuery = setInterval(function () {
//     nebPay.queryPayInfo(serialNum, options)
//       .then(function (dataStr) {
//         if (listenCount < 8) {
//           var data = JSON.parse(dataStr);
//           // console.log('data:', data);
//           if (data.code === 0) {    // data.code为0即serialNum已确认，可以换hash继续查或者继续等待data.data.status为1
//             if (data.data.status === 1) {
//               // TODO: success
//               clearInterval(intervalQuery)
//               return data
//             } else {
//               // setTimeout(function () {
//               // clearInterval(intervalQuery);
//               // hashListener(data.data.hash);
//               // }, 2000);
//             }
//           }
//           listenCount++;
//         } else {
//           // console.log('网络连接超时, 五秒后自动刷新网页');
//           clearInterval(intervalQuery);
//           return false;
//           // setTimeout(function () {
//           //   window.location.reload(); 
//           // }, 5000);
//         }
//       })
//   }, 10000)

//   // var hashListener = function (txhash) {
//   //   if (hashCount < 8) {
//   //     Neb.api.getTransactionReceipt({
//   //       hash: txhash
//   //     }).then (function (response) { // status: 2(pending) 1(success)
//   //       // console.log('response:', response); 
//   //       if (response.status === 1) {
//   //         // alert('评论写入星云链成功!');
//   //       } else {
//   //         hashCount++;
//   //         setTimeout(() => {
//   //           hashListener(txhash);
//   //         }, 5000);
//   //       }
//   //     });
//   //   }
//   // }
  
// }

export default {
  // 保存字典内容
  save ({key, content}) {
    return api('save', [key, content], true)
  },
  // 查看字典
  get ({key}) {
    return api('get', [key])
  },
  createUser ({nickname}) {
    return api('createUser', [{nickname: nickname}], true)
  },
  addGameforUser({gameAddr}) {
    return api('addGameforUser', [{g_address: gameAddr}], true)
  },
  addFriendforUser(friendAddr) {
    return api('addFriendforUser', [{u_address: friendAddr}], true)
  },
  getGameInfoList() {
    return api('getGameInfoList', [], false)
  },
  getUserInfo () {
    return payapi('getUserInfo', [], true);
  },
  // for developer
  getAchievementByAddress ({devAddr}) {
    return api('getAchievementByAddress', [{g_address: devAddr}], true)
  },
  // for common
  updateToDev () {
    return api('updateToDev', [], true)
  },
  getMomentList() {
    return api('getMomentList', [], false)
  },
  // getUserInfoByAddress() {
  //   return api('getUserInfoByAddress', [], true);
  // }
}