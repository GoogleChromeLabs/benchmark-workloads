<script setup>
import { inject } from "vue";
import styles from "news-site-css/dist/navbar.module.css";

const { callback, id } = defineProps({
    callback: Function,
    id: String,
});

const { buttons, pages } = inject("data").value;

const navItems = [];
const dropdownItems = [];

Object.keys(pages).forEach(key => {
    if (pages[key].priority === 1)
        navItems.push(key);
    else if (pages[key].priority === 2)
        dropdownItems.push(key);
});

</script>

<template>
  <ul :class="styles['navbar-list']">
    <li
      v-for="key in navItems"
      :key="key"
      :class="styles['navbar-item']"
    >
      <NavlistItem
        :id="`${id}-${key}-link`"
        :label="pages[key].name"
        :url="pages[key].url"
        :callback="callback"
      />
    </li>
    <li
      v-if="dropdownItems.length > 0"
      :class="styles['navbar-item']"
    >
      <Dropdown
        :animated-icon-class="styles['navbar-label-icon']"
        :label="buttons.more.label"
      >
        <li
          v-for="key in dropdownItems"
          :key="key"
          :class="[styles['navbar-item'], styles['navbar-dropdown-item']]"
        >
          <NavlistItem
            :id="`${id}-${key}-link`"
            :label="pages[key].name"
            :url="pages[key].url"
            :callback="callback"
          />
        </li>
      </Dropdown>
    </li>
  </ul>
</template>
