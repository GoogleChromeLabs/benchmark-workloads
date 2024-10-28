<script setup>
import { inject } from "vue";
import styles from "news-site-css/dist/layout.module.css";

const data = inject("data");

const { section, sectionIndex, pageId } = defineProps({
    section: Object,
    sectionIndex: Number,
    pageId: String,
});

</script>

<template>
  <div
    v-if="section?.name"
    :id="section.id"
    :class="styles['row-header']"
  >
    <h2>{{ section.name }}</h2>
  </div>
  <section :class="styles.row">
    <Article
      v-for="(article, index) in section.articles"
      :key="article.id"
      :article="article"
      :section-index="sectionIndex"
      :page-id="pageId"
      :ad="index === section.articles.length - 1 ? data.config?.ads?.[pageId].articles?.[sectionIndex] : null"
    />
  </section>
</template>
