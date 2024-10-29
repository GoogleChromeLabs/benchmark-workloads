<script setup>
import { ref } from "vue";
import styles from "news-site-css/dist/article.module.css";
import carouselStyles from "../styles/article-carousel.module.css";
import buttonStyles from "news-site-css/dist/button.module.css";

const { data, imageClass, meta } = defineProps({
    data: Object,
    imageClass: String,
    meta: Object,
});

const aspectRatio = data.width / data.height;
const direction = ref("right-to-left");
const currentIndex = ref(0);
const prevIndex = ref(data.images.length - 1);
const nextIndex = ref(1);

function animate(dir) {
    direction.value = dir === "prev" ? "left-to-right" : "right-to-left";

    if (dir === "prev") {
        prevIndex.value = prevIndex.value === 0 ? data.images.length - 1 : prevIndex.value - 1;
        currentIndex.value = currentIndex.value === 0 ? data.images.length - 1 : currentIndex.value - 1;
        nextIndex.value = nextIndex.value === 0 ? data.images.length - 1 : nextIndex.value - 1;
    } else {
        prevIndex.value = prevIndex.value === data.images.length - 1 ? 0 : prevIndex.value + 1;
        currentIndex.value = currentIndex.value === data.images.length - 1 ? 0 : currentIndex.value + 1;
        nextIndex.value = nextIndex.value === data.images.length - 1 ? 0 : nextIndex.value + 1;
    }
}

function prev() {
    animate("prev");
}

function next() {
    animate("next");
}

</script>
<template>
  <div
    v-if="data"
    :class="carouselStyles.container"
    :style="{ aspectRatio }"
  >
    <div
      :class="carouselStyles.content"
    >
      <div
        v-for="(image, index) in data.images"
        :key="image.id"
        :class="[imageClass, carouselStyles.image, carouselStyles[direction], {
          [carouselStyles['prev-slide']]: index === prevIndex,
          [carouselStyles['next-slide']]: index === nextIndex,
          [carouselStyles['current-slide']]: index === currentIndex,
        }]"
      >
        <img
          :key="image.id"
          :class="styles['article-image']"
          :src="image.src"
          :width="image.width"
          :height="image.height"
          :alt="image.alt"
        >
        <ArticleText
          :text="image.alt"
          :text-class="carouselStyles.text"
        />
      </div>
    </div>
    <div
      :class="carouselStyles.buttons"
    >
      <button
        id="prev-button"
        :class="[buttonStyles.button, buttonStyles['primary-button'], buttonStyles['icon-button']]"
        @click="prev"
      >
        <LeftButtonIcon />
      </button>
      <button
        id="next-button"
        :class="[buttonStyles.button, buttonStyles['primary-button'], buttonStyles['icon-button']]"
        @click="next"
      >
        <RightButtonIcon />
      </button>
    </div>
    <ArticleTag :tag="meta?.tag" />
  </div>
</template>
