<template>
  <div>
    <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="个人信息">
        <div class="viewport">
          <md-list class="md-double-line">
            <md-subheader>
              基础信息
              <div class="md-toolbar-section-end">
                <md-button class="md-icon-button md-dense" @click="switchBasedataState()" v-if="!isBasedataEdit">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="clearBasedataChange()" v-if="isBasedataEdit">
                  <md-icon>clear</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="submitBasedataChange()" v-if="isBasedataEdit">
                  <md-icon>done</md-icon>
                </md-button>
              </div>  
            </md-subheader>
            <md-list-item>
              <div class="md-list-item-text">
                <span id="addr">{{$store.state.userInfo.u_address}}</span>
                <span>钱包地址</span>
              </div>
              <!-- <md-button class="md-icon-button md-list-action" @click="copy_address">
                <md-icon>file_copy</md-icon>
              </md-button> -->
            </md-list-item>
            <md-list-item>
              <div class="md-list-item-text" v-show="!isBasedataEdit">
                <span>{{$store.state.userInfo.nickname}}</span>
                <span>姓名</span>
              </div>
              <md-field v-show="isBasedataEdit">
                <label>姓名</label>
                <md-input v-model="tempBasedata.nickname"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <div class="md-list-item-text" v-show="!isBasedataEdit">
                <span>{{$store.state.userInfo.desc}}</span>
                <span>签名</span>
              </div>
              <md-field v-show="isBasedataEdit">
                <label>签名</label>
                <md-input v-model="tempBasedata.desc"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <div class="md-list-item-text" v-show="!isBasedataEdit">
                <span>{{formatSex($store.state.userInfo.sex)}}</span>
                <span>性别</span>
              </div>
              <md-field v-show="isBasedataEdit">
                <label>性别</label>
                <md-input v-model="tempBasedata.sex"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <div class="md-list-item-text">
                <span>{{formatTime($store.state.userInfo.createdate)}}</span>
                <span>创建日期</span>
              </div>
            </md-list-item>
            
            <md-divider></md-divider>
            <md-subheader>
              联系方式
              <div class="md-toolbar-section-end">
                <md-button class="md-icon-button md-dense" @click="switchConndataState()" v-if="!isConndataEdit">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="clearConndataChange()" v-if="isConndataEdit">
                  <md-icon>clear</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="submitConndataChange()" v-if="isConndataEdit">
                  <md-icon>done</md-icon>
                </md-button>
              </div>    
            </md-subheader>

            <md-list-item>
              <md-icon class="md-primary">email</md-icon>
              <div class="md-list-item-text" v-show="!isConndataEdit">
                <span>{{$store.state.userInfo.email}}</span>
                <span>电子邮箱</span>
              </div>
              <md-field v-show="isConndataEdit">
                <label>电子邮箱</label>
                <md-input v-model="tempConndata.email"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <md-icon class="md-primary">phone</md-icon>
              <div class="md-list-item-text" v-show="!isConndataEdit">
                <span>{{$store.state.userInfo.phone}}</span>
                <span>联系电话</span>
              </div>
              <md-field v-show="isConndataEdit">
                <label>联系电话</label>
                <md-input v-model="tempConndata.phone"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <md-icon class="md-primary">people</md-icon>
              <div class="md-list-item-text" v-show="!isConndataEdit">
                <span>{{$store.state.userInfo.wechatId}}</span>
                <span>微信号</span>
              </div>
              <md-field v-show="isConndataEdit">
                <label>微信号</label>
                <md-input v-model="tempConndata.wechatId"></md-input>
              </md-field>
            </md-list-item>
          </md-list>
        </div>
      </md-tab>

      <md-tab id="tab-pages" md-label="游戏接入">
        <div v-if="$store.state.userInfo.type === '0'">
          <md-steppers :md-active-step.sync="active" md-linear>
            <md-step id="first" md-label="承诺" :md-done.sync="first"  style="text-align: center;">
              <h3>《网络游戏防沉迷系统宣言书》</h3>
              <p>网络游戏是一项新兴事物，作为先进生产力和高科技手段的重要表现形式，网络游戏是先进文化传播的重要途径和社会主义精神文明的重要组成部分，促进了电脑科技文化知识的快速普及带动了电影音乐文化产业的发展.</p>
              <p>尤其是在对外文化输出方面，网络游戏是中国与世界接轨的重要途径，使中国文化产业中能在世界上占有一席置地.<p>
              <p>网络游戏和任何新生一样，出现了一些缺陷，比如有些玩家过于沉迷游戏，对身心造成不利的影响，这些需要我们全社会一起共同努力，消除这些不利，面对这样的问题，解决的态度与方法，是非常重要的.</p>
              <p>如果我们一味夸大起负面因素造成某些不必要的社会影响是得不偿失的。</p>
              <md-button class="md-raised md-primary" @click="setDone('first', 'second')">下一步</md-button>
            </md-step>

            <md-step id="second" md-label="合约" :md-error="secondStepError" :md-done.sync="second"  style="text-align: center;">
              <h3>游戏商合约接入</h3>
              <p>"游戏人生平台"为游戏厂商提供了固定的游戏成就智能合约，游戏商可以通过下载星云智能合约文档实现玩家游戏成就的接入.</p>
              <p>智能合约分为两部分，AchievementDataContent部分是游戏厂商为游戏设计的成就列表，AchiUserContent部分是用于记录该游戏中所有玩家的所获得的成就.</p>
              <p><a href="http://172.16.52.19:8080/ipfs/QmVhVGkpFQ6TiCHoRkVhAUxkutyrbp8RqWHzEMtV2A1Zxp" target="_blank">智能合约下载</a></p>

              <h3>IPFS永久保存文件对接</h3>
              <p>星际文件系统IPFS（InterPlanetary File System）是一个面向全球的、点对点的分布式版本文件系统，目标是为了补充（甚至是取代）目前统治互联网的超文本传输协议（HTTP），将所有具有相同文件系统的计算设备连接在一起.</p>
              <p>通过存储多个数据副本，IPFS协议被认为可以用于创建一种更加永久的网络，使数据更加难以被擦除, 实现长期甚至永远保存图片的目标.</p>
              <p>"游戏人生平台"向游戏厂商提供IPFS文件接口以保存玩家游戏图片，一次保存，永久留念.</p>
              <p><a href="http://172.16.52.19:8080/ipfs/QmWb9xa1ZYFEuy7WcurpfrcfxPCRLsYBHRNoKPWwV5kgfA" target="_blank">IPFS文件上传对接文档地址</a></p>

              <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
              <!-- <md-button class="md-raised md-primary" @click="setError()">Set error!</md-button> -->
            </md-step>

            <md-step id="third" md-label="提交" :md-done.sync="third" style="text-align: center;">
              <p>同意承诺,并完成合约确认</p>
              <md-button class="md-raised md-primary" @click="userLevelup" :disabled="isUpdating">成为游戏发布者</md-button>
              <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px'}"
                v-if="isUpdating">
              </vue-loading>
            </md-step>
          </md-steppers>
        </div>
        <div v-if="$store.state.userInfo.type === '1'">
          <p>
            <md-button class="md-raised md-primary" @click="showCommitDialog = true" 
              :disabled="isCommitingGames">
              <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
                v-if="isCommitingGames">
              </vue-loading>
              提交游戏
            </md-button>
          </p>
          <div>
            <!-- <md-card md-with-hover v-bind:key="game.g_address" v-for="game in gamelist" v-if="game.isHold"> -->
            <md-card md-with-hover v-bind:key="game.g_address" v-for="game in $store.state.userInfo.gamelist" v-if="game.isHold">
              <md-card-media-cover md-solid>
                  <md-card-media md-ratio="1:1">
                    <img :src="formatBgImgurl(game.g_imgurl_mini)" alt="" style="top: 0; transform: translateY(0);">
                  </md-card-media>
                  <md-card-area style="background-color: rgba(0,0,0,.54); color: #fff;">
                    <md-card-header>
                      <span class="md-title">
                        {{game.g_name}}
                        <md-button class="md-icon-button md-dense" style="color: #fff"
                          @click="openModifyGameInfo(game)"  v-if="!isUpdatingGames">
                          <md-icon>edit</md-icon>
                        </md-button>
                        <vue-loading type="spin" color="#d9544e" :size="{ width: '16px', height: '16px'}"
                          v-if="isUpdatingGames">
                        </vue-loading>
                      </span>
                      <span class="md-subhead">{{game.desc}}</span>
                    </md-card-header>
                  </md-card-area>
              </md-card-media-cover>
            </md-card>
          </div>
        </div>
      </md-tab>

      <md-tab id="tab-posts" md-label="关于" style="text-align: center;">
        <h3>关于"星云游戏人生"DApp应用</h3>
        <h4>应用简介</h4>
        <p>『星云游戏人生』基于星云公链开发，围绕游戏建立起个人游戏成就、厂商游戏推广、游戏好友交流的社区. </p>
        <p>用星云链的智能合约记录游戏数据及为游戏厂商数据上链提供便利。利用IPFS技术实现游戏多媒体数据永久保存。</p><br/>
        <h4>开发成员</h4>
        <p>策划：<a href="https://github.com/Wangcankun">Wangcankun</a>、<a href="https://github.com/Nodreame">Nodreame</a></p>
        <p>前端设计&制作：<a href="https://github.com/Nodreame">Nodreame</a></p>
        <p>智能合约设计&制作：<a href="https://github.com/Wangcankun">Wangcankun</a></p>
        <p>IPFS接口设计&制作：<a href="https://github.com/Wangcankun">Wangcankun</a></p><br/>
        <h4>项目代码(欢迎star & fork)</h4>
        <p>前端代码地址：<a href="https://github.com/Nodreame/nebulas-gamelife">nebulas-gamelife</a></p>
        <p>智能合约：<a href="https://github.com/Wangcankun/game_life_contract">game_life_contract</a></p>
        <p>IPFS数据上传接口：<a href="https://github.com/Wangcankun/upload-ipfs-api">upload-ipfs-api</a></p>
      </md-tab>
    </md-tabs>

    <!-- <md-dialog-prompt
      :md-active.sync="active"
      v-model="value"
      md-title="What's your name?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-confirm-text="Done" /> -->

    <md-dialog :md-active.sync="showCommitDialog">
      <md-dialog-title>游戏信息提交</md-dialog-title>

      <md-field>
        <label>游戏名称</label>
        <md-input v-model="gameinfo_commit.g_name"></md-input>
      </md-field>

      <md-field>
        <label>游戏介绍</label>
        <md-textarea v-model="gameinfo_commit.desc"></md-textarea>
      </md-field>

      <md-field>
        <label>游戏合约地址</label>
        <md-input v-model="gameinfo_commit.g_address"></md-input>
      </md-field>

      <md-field>
        <label>开发者钱包地址</label>
        <md-input v-model="gameinfo_commit.d_address"></md-input>
      </md-field>

      <md-field>
        <label>游戏官网地址</label>
        <md-input v-model="gameinfo_commit.websiteurl"></md-input>
      </md-field>

      <md-field>
        <label>开始游戏地址</label>
        <md-input v-model="gameinfo_commit.starturl"></md-input>
      </md-field>

      <!-- <md-field>
        <label>游戏图标</label>
        <md-file v-model="gameinfo_commit.g_imgurl_mini" />
        <file-upload
          ref="upload"
          v-model="files"
          post-action="/post.method"
          put-action="/put.method"
          @input-file="inputFile"
          @input-filter="inputFilter">
          上传文件
        </file-upload>
        <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" 
          type="button">开始上传</button>
        <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" 
          type="button">停止上传</button>
      </md-field>

      <md-field>
        <label>游戏背景</label>
        <md-file v-model="gameinfo_commit.g_imgurl_bg" />
      </md-field>
      <md-field>
        <label>游戏截图</label>
        <md-file v-model="gameinfo_commit.g_imgurl_exlist" />
      </md-field> -->

      <md-dialog-actions>
        <md-button class="md-primary" @click="showCommitDialog = false">取消</md-button>
        <md-button class="md-primary" @click="commitGameInfo">确定</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showModifyDialog">
      <md-dialog-title>游戏信息修改</md-dialog-title>

      <md-field>
        <label>游戏名称</label>
        <md-input v-model="gameinfo_modify.g_name"></md-input>
      </md-field>

      <md-field>
        <label>游戏介绍</label>
        <md-textarea v-model="gameinfo_modify.desc"></md-textarea>
      </md-field>

      <md-field>
        <label>游戏合约地址</label>
        <md-input v-model="gameinfo_modify.g_address"></md-input>
      </md-field>

      <md-field>
        <label>开发者钱包地址</label>
        <md-input v-model="gameinfo_modify.d_address"></md-input>
      </md-field>

      <md-field>
        <label>游戏官网地址</label>
        <md-input v-model="gameinfo_modify.websiteurl"></md-input>
      </md-field>

      <md-field>
        <label>开始游戏地址</label>
        <md-input v-model="gameinfo_modify.starturl"></md-input>
      </md-field>

      <!-- <md-field>
        <label>游戏图标</label>
        <md-file v-model="gameinfo_commit.g_imgurl_mini" />
        <file-upload
          ref="upload"
          v-model="files"
          post-action="/post.method"
          put-action="/put.method"
          @input-file="inputFile"
          @input-filter="inputFilter">
          上传文件
        </file-upload>
        <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" 
          type="button">开始上传</button>
        <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" 
          type="button">停止上传</button>
      </md-field>

      <md-field>
        <label>游戏背景</label>
        <md-file v-model="gameinfo_commit.g_imgurl_bg" />
      </md-field>
      <md-field>
        <label>游戏截图</label>
        <md-file v-model="gameinfo_commit.g_imgurl_exlist" />
      </md-field> -->

      <md-dialog-actions>
        <md-button class="md-primary" @click="showModifyDialog = false">取消</md-button>
        <md-button class="md-primary" @click="modifyGameInfo">确定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
    min-width: 300px;
    padding: 0 30px;
    overflow-y: auto;
  }
  .viewport {
    width: 375px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
  .md-card {
    width: 240px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
<script>
  export default {
    name: 'Setting',
    data: () => ({
      showDialog: false,
      isBasedataEdit: false,
      isConndataEdit: false,
      tempBasedata: {},
      tempConndata: {},
      // stepperbar
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      // 提交 & 修改
      showCommitDialog: false,
      showModifyDialog: false,
      gameinfo_commit: {},    // 准备提交的游戏信息
      gameinfo_modify: {},
      gamelist_dev: [],         // 本开发者名下的游戏信息
      isCommitingGames: false,  // 提交游戏中
      isUpdatingGames: false,   // 更新游戏中
      // updateToDev
      isUpdating: false,
      // work for testing
      // gamelist: [
      //   { g_address: 'aaaaaa', g_name: '侠客风云传-前传', desc: '就埃里克森大家开始拉家带口垃圾的老咔叽安康阿斯顿垃圾的撒', g_imgurl_mini: '/img/game-1.jpg', isHold: true},
      //   { g_address: 'bbbbbb', g_name: '古剑奇谭', desc: '哈哈哈哈', g_imgurl_mini: '/img/game-2.jpg', isHold: false},
      //   { g_address: 'cccccc', g_name: '轩辕剑', desc: '哈哈哈', g_imgurl_mini: '/img/game-3.jpg', isHold: true}
      // ]
    }),
    methods: {
      testVuex: function () {
        console.log(this.$store.state.count)
        this.$store.commit('increment')
        console.log(this.$store.state.count)
      },
      // switchData
      switchBasedataState: function () {
        this.tempBasedata = {
          nickname: this.$store.state.userInfo.nickname,
          sex: this.$store.state.userInfo.sex,
          desc: this.$store.state.userInfo.desc
        }
        this.isBasedataEdit = true
      },
      submitBasedataChange: function () {
        console.log('this.tempBasedata:', this.tempBasedata)
        // TODO: use nebpay
      },
      clearBasedataChange: function () {
        this.tempBasedata = {
          nickname: this.$store.state.userInfo.nickname,
          sex: this.$store.state.userInfo.sex,
          desc: this.$store.state.userInfo.desc
        }
        this.isBasedataEdit = false
      },

      // connData
      switchConndataState: function () {
        this.tempConndata = {
          email: this.$store.state.userInfo.email,
          phone: this.$store.state.userInfo.phone,
          wechatId: this.$store.state.userInfo.wechatId
        }
        this.isConndataEdit = true
      },
      submitConndataChange: function () {
        console.log('this.tempConndata:', this.tempConndata)
        // TODO: use nebpay
      },
      clearConndataChange: function () {
        this.tempConndata = {
          email: this.$store.state.userInfo.email,
          phone: this.$store.state.userInfo.phone,
          wechatId: this.$store.state.userInfo.wechatId
        }
        this.isConndataEdit = false
      },
      userLevelup: function () {
        // alert('TODO:updateToDev')
        const contract = this.$store.state.dappAddr
        const fnName   = 'updateToDev'
        const args     = []
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.isUpdating = true;
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp);
              that.isUpdating = false;
            } else if (resp.status === 1) {
              console.log('success:', resp);
              // console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
              // console.log('userObj.data:', userObj.data)
              that.$store.commit('update_userInfo', {type: '1'})
              console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
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
                console.log('data', data);
                var userObj = JSON.parse(data.result);
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                console.log('userObj.data:', userObj.data)
                that.$store.commit('update_userInfo', userObj.data)
                console.log('this.$store.state.userInfo:', that.$store.state.userInfo)
                // that.$router.push('/dashboard');
                // if (data.status) {
                //   console.log('data.result:', data.result)
                // } else {
                //   console.log('data.msg:', data.msg)
                // }
                that.isUpdating = false;
              }, (error) => {
                console.error('error:', error)
                that.isUpdating = false;
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
      commitGameInfo: function () {
        console.log('this.gameinfo_commit:', this.gameinfo_commit)
        const contract = this.$store.state.dappAddr
        const fnName   = 'createGame'
        const args     = [this.gameinfo_commit]
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.showCommitDialog = false
          this.isCommitingGames = true      // TODO: update button_commit
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp)
              that.isCommitingGames = false
            } else if (resp.status === 1) {
              console.log('success:', resp)
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
                // that.$router.push('/dashboard');
                that.isCommitingGames = false
              });
            } else {
              console.log('waiting:', resp)
              that.isCommitingGames = false
            }
          }, (error) => {
            console.error('queryPayId error:', error);
            that.isCommitingGames = false
          });
        }, (error) => {
          console.error('login error:', error);
        });
      },
      openModifyGameInfo: function (gameinfo) {
        const that     = this;
        this.neb.api.call({
          from:   this.$store.state.dappAddr,
          to:     this.$store.state.dappAddr,
          value:  0,
          contract: {
            function: 'getGameInfo',
            args:     JSON.stringify([gameinfo.g_address])
          },
          gasPrice: 1000000,
          gasLimit: 2000000
        }).then((data) => {
          console.log('data.result:', data.result)
          const resultData = JSON.parse(data.result)
          if (resultData.status) {
            console.log('resultData.data:', resultData.data)
            // var gameObj = resultData.data
            this.gameinfo_modify = resultData.data
          } else {
            console.log('data.msg:', data.msg)
          }
        }, (error) => {
          console.log('error:', error)
        });
        this.gameinfo_modify = JSON.parse(JSON.stringify(gameinfo))
        console.log('this.gameinfo_modify:', this.gameinfo_modify)
        this.showModifyDialog = true
      },
      modifyGameInfo: function () {
        console.log('this.gameinfo_modify:', this.gameinfo_modify)
        const contract = this.$store.state.dappAddr
        const fnName   = 'updateGame'
        const args     = [this.gameinfo_modify]
        const options  = { value: '0' }
        const that     = this;
        Nasa.call(contract, fnName, args, options).then((payId)=> {
          console.log('payId:', payId);
          this.showModifyDialog = false
          this.isUpdatingGames = true      // TODO: update button_commit
          Nasa.checkTx(payId).then((resp) => {
            if (resp.status === 0) {
              console.error('fail:', resp)
              that.isUpdatingGames = false
            } else if (resp.status === 1) {
              console.log('success:', resp)
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
                that.isUpdatingGames = false
              });
            } else {
              console.log('waiting:', resp)
              that.isUpdatingGames = false
            }
          }, (error) => {
            console.error('queryPayId error:', error);
            that.isUpdatingGames = false
          });
        }, (error) => {
          console.error('login error:', error);
        });
      },
      setDone (id, index) {
        this[id] = true
        this.secondStepError = null
        if (index) {
          this.active = index
        }
      },
      setError () {
        this.secondStepError = 'This is an error!'
      },
      // copy_address: function () {
      //   // alert(this.$store.state.userInfo.u_address)
      //   const clipboard = new Clipboard('#addr');
      //   clipboard.on('success', e => {
      //     this.$message.success(e.text + ' 已复制到剪贴板！');
      //   });
      // },
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
      formatSex: function (str) {
        if (str === '0') {
          return '未知'
        } else if (str === '1') {
          return '男'
        } else {
          return '女'
        }
      },
      formatBgImgurl: function (url) {
        return url? url: '/img/default_imgurl_mini.png'
      },
    },
    created: function () {
      console.log('created')
      if (!this.$store.state.userInfo.u_address) {
        // jump to login page
        this.$router.push('/');
      }
    }
  }
</script>