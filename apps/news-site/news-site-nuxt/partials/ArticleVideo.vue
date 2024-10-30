<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "#imports";
import styles from "news-site-css/dist/article.module.css";
import videoStyles from "../styles/article-video.module.css";

const { data, meta } = defineProps({
    data: Object,
    meta: Object,
});

const aspectRatio = data.width / data.height;
const autoplayRef = ref(false);

const { elementRef, disconnect } = useIntersectionObserver({
    callback: handleOnIntersection
});

function handleOnIntersection(entries) {
    for (const entry of entries) {
        if (!entry.isIntersecting)
            return;

        disconnect();
        autoplayRef.value = true;
    }
}

</script>
<template v-if="data">
  <div
    ref="elementRef"
    :class="videoStyles.container"
    :style="{ aspectRatio }"
  >
    <div :class="videoStyles.content">
      <video
        :src="data.src"
        autoplay="autoplayRef"
        muted
        controls
        playsInline
      />
    </div>
    <ArticleTag :tag="meta?.tag" />
  </div>
  <ArticleText
    :text-class="styles['article-image-captions']"
    :text="meta?.captions"
  />
</template>
