<template>
  <div>
    <!-- <h1>{{$router.params.addr}}</h1> -->
    <h1>Hello, {{params.addr}}</h1>
    <!-- <iframe src="https://plat.tgp.qq.com/middle/login/jump.html?url=https%3A%2F%2Fplat.tgp.qq.com%2Frail%2Fwegame_game_detail.html%3Ftop_class%3D3%26nav_type%3D2%26from%3Dstore_filter.game_list%26unionsite%3Dwegamesite%253A-%253Ajump%253A-%26t%3D1529638474312%26game_id%3D2000016&ticket=bnVsbA%3D%3D" 
      frameborder="0"  style="width: 100vw; height: 100vh;"></iframe> -->
    <div class="contenner">
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
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Gamepage',
    data: () => ({
      // test data
      isHasExtension: typeof webExtensionWallet === 'undefined',
      search: '',
      add_value: '',
      isShowAdd: false,
      hasResult: false,
      fail_add: '',
      result: {}
    }),
    methods: {
      toSearch () {
        this.$payapi.get({key: this.search}).then(res => {
          if (!res) {
            this.fail_add = this.search
            this.result = {}
          } else {
            this.fail_add = ''
            this.result = res
          }
        })
        this.isShowAdd = false
      },
      toShow () {
        this.fail_add = ''
        this.isShowAdd = true
      },
      toAdd () {
        this.$payapi.save({key: this.search, content: this.add_value}).then(res => {
          console.log('response of push: ' + res)
        })
      }
    },
    computed: {
      params () {
        // console.log('this.$route:', this.$route);
        return this.$route.params;
      }
    }
  }
</script>