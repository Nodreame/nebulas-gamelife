<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <md-app-toolbar md-waterfall class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">游戏人生 - {{pagename}}</span>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" to="/setting">
              <!-- @click="showSidepanel = !showSidepanel" -->
            <md-icon>person</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation">

        <md-toolbar class="md-transparent" md-elevation="0">
          <span>游戏人生</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="showNavigation = false">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to="/dashboard" @click="showNavigation = false">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">总览</span>
          </md-list-item>
          <md-list-item to="/mygames" @click="showNavigation = false">
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">我的游戏</span>
          </md-list-item>
          <md-list-item to="/gameshop" @click="showNavigation = false">
            <md-icon>shop</md-icon>
            <span class="md-list-item-text">游戏商店</span>
          </md-list-item>
          <md-list-item to="/settings" @click="showNavigation = false">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">设置</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    height: 100vh;
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 200px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
export default {
  name: 'GameLife-Framework',
  data: () => ({
    nowTitle: '总览',
    showNavigation: false,
    showSidepanel: false
  }),
  methods: {
    
  },
  computed: {
    pagename () {
      let name = '';
      // console.log('this.$route:', this.$route);
      switch (this.$route.name) {
        case 'dashboard':
          name = '总览';
          break;
        case 'mygames':
          name = '我的游戏';
          break;
        case 'gameshop':
          name = '游戏商店';
          break;
        case 'gamepage':
          name = '游戏详情';
          break;
        case 'settings':
          name = '设置';
          break;
      }
      return name;
    }
  }
}
</script>