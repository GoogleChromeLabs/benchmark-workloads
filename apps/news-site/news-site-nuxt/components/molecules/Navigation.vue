<script lang="js">
import { inject } from "vue";
import navStyles from "news-site-css/dist/nav.module.css";
import buttonStyles from "news-site-css/dist/button.module.css";
export default {
    setup() {
        const { buttons } = inject("data");
        return { buttons };
    },
    data () {
        return {
            navStyles,
            buttonStyles,
            showSidebar: false,
            showLogin: false,
        };
    },
    methods: {
        openLogin() {
            this.showLogin = true;
        },
        closeLogin() {
            this.showLogin = false;
        },
        openSidebar() {
            this.showSidebar = true;
        },
        closeSidebar() {
            this.showSidebar = false;
        }
    },
};
</script>

<template>
  <nav
    :class="navStyles['page-navigation']"
    aria-label="main menu"
  >
    <div :class="navStyles['page-navigation-row']">
      <div :class="navStyles['page-navigation-column-left']">
        <Navbar :callback="openSidebar" />
      </div>
      <div :class="navStyles['page-navigation-column-right']">
        <button
          id="login-button"
          :class="[buttonStyles.button, buttonStyles['secondary-button'], navStyles['nav-button']]"
          @click="openLogin"
        >
          {{ buttons.login.label }}
        </button>
      </div>
    </div>
  </nav>
  <Teleport to="body">
    <Sidebar
      v-show="showSidebar"
      :on-close="closeSidebar"
    />
  </Teleport>
  <Teleport to="body">
    <Modal
      v-show="showLogin"
      :on-close="closeLogin"
    />
  </Teleport>
</template>
