<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a href="#" class="menu-button d-none d-md-block" @click.prevent.stop="changeSideMenuStatus({step :menuClickCount+1,classNames:menuType,selectedMenuHasSubItems})">
        <menu-icon />
      </a>
      <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none" @click.prevent.stop="changeSideMenuForMobile(menuType)">
        <mobile-menu-icon />
      </a>
      <!-- <div :class="{'search':true, 'mobile-view':isMobileSearch}" ref="searchContainer" @mouseenter="isSearchOver=true" @mouseleave="isSearchOver=false">
        <b-input :placeholder="$t('menu.search')" @keypress.native.enter="search" v-model="searchKeyword" />
        <span class="search-icon" @click="searchClick">
          <i class="simple-icon-magnifier"></i>
        </span>
      </div> -->
      <div class="d-inline-block">
        <b-dropdown id="langddm" class="ml-2" variant="light" size="sm" toggle-class="language-button">
          <template slot="button-content">
            <span class="name">{{$i18n.locale.toUpperCase()}}</span>
          </template>
          <b-dropdown-item v-for="(l,index) in localeOptions" :key="index" @click="changeLocale(l.id, l.direction)">{{l.name}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="position-relative d-none d-none d-lg-inline-block ml-2">
        <switches id="tool-mode-switch" v-model="isDarkActive" theme="custom" class="vue-switcher-small" color="primary" />
        <b-tooltip target="tool-mode-switch" placement="left" title="Dark Mode"></b-tooltip>
      </div>
    </div>
    <router-link class="navbar-logo" tag="a" to="/app/dashboards">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
    </router-link>
    <div class="navbar-right">
      <div class="header-icons d-inline-block align-middle">
        <!-- <div class="position-relative d-none d-sm-inline-block">
          <b-dropdown variant="empty" size="sm" right toggle-class="header-icon" menu-class="position-absolute mt-3 iconMenuDropdown" no-caret>
            <template slot="button-content">
              <i class="simple-icon-grid" />
            </template>
            <div>
              <router-link tag="a" to="/app/dashboards/default" class="icon-menu-item">
                <i class="iconsminds-shop-4 d-block" />
                {{$t('menu.dashboards')}}
              </router-link>
              <router-link tag="a" to="/app/ui" class="icon-menu-item">
                <i class="iconsminds-pantone d-block" />
                {{$t('menu.ui')}}
              </router-link>
              <router-link tag="a" to="/app/ui/components/charts" class="icon-menu-item">
                <i class="iconsminds-bar-chart-4 d-block" />
                {{$t('menu.charts')}}
              </router-link>
              <router-link tag="a" to="/app/applications/chat" class="icon-menu-item">
                <i class="iconsminds-speach-bubble d-block" />
                {{$t('menu.chat')}}
              </router-link>
              <router-link tag="a" to="/app/applications/survey" class="icon-menu-item">
                <i class="iconsminds-formula d-block" />
                {{$t('menu.survey')}}
              </router-link>
              <router-link tag="a" to="/app/applications/todo" class="icon-menu-item">
                <i class="iconsminds-check d-block" />
                {{$t('menu.todo')}}
              </router-link>
            </div>
          </b-dropdown>
        </div> -->
        <!-- <div class="position-relative d-inline-block">
          <b-dropdown variant="empty" size="sm" right toggle-class="header-icon notificationButton" menu-class="position-absolute mt-3 notificationDropdown" no-caret>
            <template slot="button-content">
              <i class="simple-icon-bell" />
              <span class="count">3</span>
            </template>
            <vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }">
              <div class="d-flex flex-row mb-3 pb-3 border-bottom" v-for="(n,index) in notifications" :key="index">
                <router-link tag="a" to="/app/pages/product/details">
                  <img :src="n.img" :alt="n.title" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
                </router-link>
                <div class="pl-3 pr-2">
                  <router-link tag="a" to="/app/pages/product/details">
                    <p class="font-weight-medium mb-1">{{n.title}}</p>
                    <p class="text-muted mb-0 text-small">{{n.date}}</p>
                  </router-link>
                </div>
              </div>
            </vue-perfect-scrollbar>
          </b-dropdown>
        </div> -->
      </div>
      <div class="user d-inline-block">
        <b-dropdown class="dropdown-menu-right" right variant="empty" toggle-class="p-0" menu-class="mt-3" no-caret>
          <template slot="button-content">
            <span class="name mr-1">{{ currentUser.first_name.charAt(0).toUpperCase() + currentUser.first_name.slice(1) }} {{ currentUser.last_name.charAt(0).toUpperCase() + currentUser.last_name.slice(1) }}</span>
            <span>
              <img :alt="currentUser.title" src="https://res.cloudinary.com/coderoute/image/upload/v1581870651/coperative/jwme3tnmbsz3faj4xypf.jpg" />
            </span>
          </template>
          <b-dropdown-item to="/app/pages/profile/settings">Settings</b-dropdown-item>
          <b-dropdown-item>Referrals</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click.prevent="logout">Sign out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>
<script>
import Switches from 'vue-switches'
import notifications from '../data/notifications'
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import {
  MenuIcon,
  MobileMenuIcon
} from '../components/Svg'
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl,
  defaultColor
} from '../constants/config'
import {
  getDirection,
  setDirection
} from '../utils'
export default {
  components: {
    'menu-icon': MenuIcon,
    'mobile-menu-icon': MobileMenuIcon,
    'switches': Switches
  },
  data() {
    return {
      searchKeyword: '',
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      localeOptions,
      buyUrl,
      notifications,
      isDarkActive: false,
      isLiveActive: false
    }
  },
  methods: {
    ...mapMutations(['changeSideMenuStatus', 'changeSideMenuForMobile']),
    ...mapActions('user', ["LogoutUser"]),
    search() {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`)
      this.searchKeyword = ''
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true
        } else {
          this.search()
          this.isMobileSearch = false
        }
      } else {
        this.search()
      }
    },
    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false
        this.searchKeyword = ''
      }
    },
    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction
      if (direction !== currentDirection) {
        setDirection(direction)
      }
      this.setLang(locale)
    },
    logout() {
      try {
          this.LogoutUser();
        } catch (err) {
          console.log(err)
        }
    },
    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen()
      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    getThemeColor() {
      return localStorage.getItem('themeColor') ?
        localStorage.getItem('themeColor') :
        defaultColor
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    }
  },
  computed: {
    ...mapGetters({
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount',
      selectedMenuHasSubItems: 'getSelectedMenuHasSubItems'
    }),
    ...mapGetters('user', ['currentUser'])
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentforMobileSearch)
  },
  created() {
    const color = this.getThemeColor()
    this.isDarkActive = color.indexOf('dark') > -1
  },
  watch: {
    '$i18n.locale'(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path)
      }
    },
    isDarkActive(val) {
      let color = this.getThemeColor()
      let isChange = false
      if (val && color.indexOf('light') > -1) {
        isChange = true
        color = color.replace('light', 'dark')
      } else if (!val && color.indexOf('dark') > -1) {
        isChange = true
        color = color.replace('dark', 'light')
      }
      if (isChange) {
        localStorage.setItem('themeColor', color)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    },
    isMobileSearch(val) {
      if (val) {
        document.addEventListener('click', this.handleDocumentforMobileSearch)
      } else {
        document.removeEventListener(
          'click',
          this.handleDocumentforMobileSearch
        )
      }
    }
  }
}

</script>
