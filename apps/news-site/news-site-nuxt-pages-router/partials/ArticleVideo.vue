<script setup>
import styles from "news-site-css/dist/article.module.css";
import videoStyles from "../styles/article-video.module.css";

const { data, meta } = defineProps({
    data: Object,
    meta: Object,
});

const aspectRatio = data.width / data.height;
</script>
<template v-if="data">
  <div
    :class="videoStyles.container"
    :style="{ aspectRatio }"
  >
    <div :class="videoStyles.content">
      <video
        :src="data.src"
        muted
        autoPlay
        controls
        playsinline
        webkit-playsinline
      />
    </div>
    <ArticleTag :tag="meta?.tag" />
  </div>
  <ArticleText
    :text-class="styles['article-image-captions']"
    :text="meta?.captions"
  />
</template>
