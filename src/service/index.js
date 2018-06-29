import NebPay from 'nebpay.js'
const nebPay = new NebPay()

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
}

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