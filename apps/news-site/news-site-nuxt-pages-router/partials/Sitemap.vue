<script setup>
import { inject } from "vue";
import styles from "news-site-css/dist/sitemap.module.css";

defineProps({
    onClick: Function
});

const { sections, pages } = inject("data");

const keys = Object.keys(pages);
const navItems = keys.reduce(
    (result, key) => {
        result.push(key);
        return result;
    },
    []
);
</script>

<template>
  <div :class="styles.sitemap">
    <ul :class="styles['sitemap-list']">
      <li
        v-for="key in navItems"
        :key="`sitemap-page-${pages[key].name}`"
        :class="styles['sitemap-item']"
      >
        <NuxtLink
          :to="pages[key].url"
          :active-class="styles['active']"
        >
          <h4 :class="styles['sitemap-header']">
            {{ pages[key].name }}
          </h4>
        </NuxtLink>
        <ul :class="styles['sitemap-sublist']">
          <li
            v-for="section in sections[key]"
            :key="`sitemap-section${section.id}`"
            :class="styles['sitemap-subitem']"
          >
            <NuxtLink :to="`${pages[key].url}#${section.id}`">
              {{ section.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
