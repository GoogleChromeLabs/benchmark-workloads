<script setup>
import styles from "news-site-css/dist/advertisement.module.css";

const { data, location } = defineProps({
    data: Object,
    location: String
});

const source = `${data.src}?w=${data.width}&h=${data.height}`;
</script>

<template>
  <div :class="[styles['advertisement-container'], styles[`advertisement-container-${location}`]]">
    <div :class="[styles['advertisement-iframe'], styles[`advertisement-${data.width}x${data.height}`]]">
      <div :class="[styles['advertisement-content']]">
        <iframe
          :src="source"
          :width="data.width"
          :height="data.height"
        />
      </div>
    </div>
    <div
      :class="[styles['advertisement-notice']]"
    >
      Advertisement
    </div>
  </div>
</template>
