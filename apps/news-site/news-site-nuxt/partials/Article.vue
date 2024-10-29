<script setup>
import layoutStyles from "news-site-css/dist/layout.module.css";
import articleStyles from "news-site-css/dist/article.module.css";
import ArticleVideo from "./ArticleVideo.vue";

const { article } = defineProps({
    article: Object,
    ad: Object
});
</script>

<template>
  <article :class="[layoutStyles.column, layoutStyles[article.class], articleStyles.article]">
    <ArticleHeader
      :header-class="articleStyles['article-header']"
      :text="article.header"
      :link="article.url"
    />
    <section :class="articleStyles['article-body']">
      <ArticleImage
        v-if="article.image"
        :image-class="articleStyles['article-image-container']"
        :image="article.image"
        :meta="article.meta"
      />
      <ArticleCarousel
        v-if="article.carousel"
        :image-class="articleStyles['article-image-container']"
        :data="article.carousel"
        :meta="article.meta"
      />
      <ArticleVideo
        v-if="article.video && article.video.type === 'HTML5 Video'"
        :data="article.video"
        :meta="article.meta"
      />
      <ArticleText
        :text-class="[articleStyles['article-title'], 'truncate-singleline']"
        :text="article.title"
        type="h3"
      />
      <ArticleContent
        :type="article.type"
        :content="article.content"
        :display="article.display"
        :ad="ad"
      />
    </section>
  </article>
</template>
