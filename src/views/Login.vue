<template>
  <div class="keepcenter">
    <img src="../assets/logo.png" alt="logo">
    <h1>游戏人生</h1>
    <p>链接你的游戏人生</p>
    <md-button class="md-raised md-primary" @click="login" :disabled="isLogging">登录</md-button>
    <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px'}"
      v-if="isLogging">
    </vue-loading>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      nickname: null,
      isLogging: false
    }),
    methods: {
      login: function () {
        const contract = this.$store.state.dappAddr
        const fnName   = 'login'
        const args     = []
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.isLogging = true;
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp);
              that.isLogging = false;
            } else if (resp.status === 1) {
              console.log('success:', resp);
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
              }).then(function (data) {
                console.log('data', data);
                var userObj = JSON.parse(data.result);
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                that.$router.push('/dashboard');
                that.isLogging = false;
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
    },
    created: function () {
      // alert(Nasa.ua.isSupported())
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