<template>
  <div>
    <!-- <md-button class="md-raised" @click="showDialog = true">个人信息修改</md-button>
    <md-button class="md-raised" >开发者设置</md-button> -->

    <md-tabs md-sync-route>
       <!-- to="/components/tabs/home" -->
      <md-tab id="tab-home" md-label="个人信息">
        <!-- <md-button @click="testVuex">testVuex</md-button> -->
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
                <span>{{$store.state.userInfo.sex}}</span>
                <span>性别</span>
              </div>
              <md-field v-show="isBasedataEdit">
                <label>性别</label>
                <md-input v-model="tempBasedata.sex"></md-input>
              </md-field>
            </md-list-item>
            <md-list-item>
              <div class="md-list-item-text">
                <span>{{$store.state.userInfo.createdate}}</span>
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
        <md-steppers :md-active-step.sync="active" md-linear>
          <md-step id="first" md-label="承诺" :md-done.sync="first"  style="text-align: center;">
           <h3>《网络游戏防沉迷系统宣言书》</h3> 
　　        <p>网络游戏是一项新兴事物，作为先进生产力和高科技手段的重要表现形式，网络游戏是先进文化传播的重要途径和社会主义精神文明的重要组成部分，促进了电脑科技文化知识的快速普及带动了电影音乐文化产业的发展，尤其是在对外文化输出方面，网络游戏是中国与世界接轨的重要途径，是中国文化产业中能在世界上占有一席置地，但是网络游戏和任何新生一样，出现了一些缺陷，比如有些玩家过于沉迷游戏，对身心造成不利的影响，这些需要我们全社会一起共同努力，消除这些不利，面对这样的问题，解决的态度与方法，是非常重要的。如果我们一味夸大起负面因素造成某些不必要的社会影响是得不偿失的。</p>
            <md-button class="md-raised md-primary" @click="setDone('first', 'second')">下一步</md-button>
          </md-step>

          <md-step id="second" md-label="合约" :md-error="secondStepError" :md-done.sync="second"  style="text-align: center;">
            <h3>游戏商合约接入</h3>
            <p>"游戏人生平台"为游戏厂商提供了固定的游戏成就智能合约，游戏商可以通过下载星云智能合约文档实现玩家游戏成就的接入.</p>
            <p>智能合约分为两部分，AchievementDataContent部分是游戏厂商为游戏设计的成就列表，AchiUserContent部分是用于记录该游戏中所有玩家的所获得的成就.</p>
            <p><a href="http://172.16.52.19:8080/ipfs/QmVhVGkpFQ6TiCHoRkVhAUxkutyrbp8RqWHzEMtV2A1Zxp">智能合约下载</a></p>

            <h3>IPFS永久保存文件对接</h3>
            <p>星际文件系统IPFS（InterPlanetary File System）是一个面向全球的、点对点的分布式版本文件系统，目标是为了补充（甚至是取代）目前统治互联网的超文本传输协议（HTTP），将所有具有相同文件系统的计算设备连接在一起.</p>
            <p>通过存储多个数据副本，IPFS协议被认为可以用于创建一种更加永久的网络，使数据更加难以被擦除, 实现长期甚至永远保存图片的目标.</p>
            <p>"游戏人生平台"向游戏厂商提供IPFS文件接口以保存玩家游戏图片，一次保存，永久留念.</p>
            <p><a href="http://172.16.52.19:8080/ipfs/QmWb9xa1ZYFEuy7WcurpfrcfxPCRLsYBHRNoKPWwV5kgfA">IPFS文件上传对接文档地址</a></p>

            <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
            <!-- <md-button class="md-raised md-primary" @click="setError()">Set error!</md-button> -->
          </md-step>

          <md-step id="third" md-label="提交" :md-done.sync="third" style="text-align: center;">
            <h3>游戏相关资料提交</h3>
            <md-field>
              <label>游戏名称</label>
              <md-input v-model="gameinfo.g_name"></md-input>
            </md-field>

            <md-field>
              <label>游戏合约地址</label>
              <md-input v-model="gameinfo.g_address"></md-input>
            </md-field>

            <md-field>
              <label>开发者钱包地址</label>
              <md-input v-model="gameinfo.d_address"></md-input>
            </md-field>

            <md-field>
              <label>游戏官网地址</label>
              <md-input v-model="gameinfo.websiteurl"></md-input>
            </md-field>

            <md-field>
              <label>游戏图标</label>
              <md-file v-model="gameinfo.g_imgurl_mini" />
              <!-- <file-upload
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
                type="button">停止上传</button> -->
            </md-field>

            <!-- <md-field>
              <label>Number</label>
              <md-input v-model="number" type="number"></md-input>
            </md-field>

            <md-field>
              <label>Textarea</label>
              <md-textarea v-model="textarea"></md-textarea>
            </md-field>

            <md-field>
              <label>Textarea with Autogrow</label>
              <md-textarea v-model="autogrow" md-autogrow></md-textarea>
            </md-field>

            <md-field>
              <label>Disabled</label>
              <md-input v-model="disabled" disabled></md-input>
            </md-field> -->
            <md-button class="md-raised md-primary" @click="commitGameInfo">提交</md-button>
          </md-step>
        </md-steppers>
      </md-tab>

      <md-tab id="tab-posts" md-label="关于" style="text-align: center;">
        <h3>关于"游戏人生平台"DApp应用</h3>
        <p style="font-weight: 700;">基于星云公链开发</p>
        <p>策划：王灿昆、林文烁</p>
        <p>前端设计&制作：林文烁</p>
        <p>智能合约设计&制作：王灿昆</p>
        <p>IPFS接口设计&制作：王灿昆</p>
      </md-tab>
    </md-tabs>




  </div>
</template>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
  .viewport {
    width: 375px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
</style>
<script>
  export default {
    name: 'DialogCustom',
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
      // game 接入
      gameinfo: {}
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
        // TODO: use $payapi        
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
        // TODO: use $payapi        
      },
      clearConndataChange: function () {
        this.tempConndata = {
          email: this.$store.state.userInfo.email,
          phone: this.$store.state.userInfo.phone,
          wechatId: this.$store.state.userInfo.wechatId
        }
        this.isConndataEdit = false
      },
      commitGameInfo: function () {
        console.log('gameinfo:', this.gameinfo)
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
      }
      // copy_address: function () {
      //   // alert(this.$store.state.userInfo.u_address)
      //   const clipboard = new Clipboard('#addr');
      //   clipboard.on('success', e => {
      //     this.$message.success(e.text + ' 已复制到剪贴板！');
      //   });
      // }
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