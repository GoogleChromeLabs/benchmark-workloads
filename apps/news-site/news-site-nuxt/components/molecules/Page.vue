<script setup>
import { inject, onMounted, ref } from "vue";
import { useLocalStorage } from "#imports";

import { useRoute } from "vue-router";

const { content } = inject("data");
const showPortal = ref(false);

const { name } = useRoute();

/** assign app settings from local storage */
const [reduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
const [highContrast] = useLocalStorage("news-site-settings-high-contrast", false);

onMounted(() => {
    showPortal.value = content[name].notification ? true : false;

    if (reduceMotion)
        document.documentElement.classList.add("reduced-motion");
    else
        document.documentElement.classList.remove("reduced-motion");

    if (highContrast)
        document.documentElement.classList.add("forced-colors");
    else
        document.documentElement.classList.remove("forced-colors");
});

function closePortal() {
    showPortal.value = false;
}
</script>

<template>
  <Section
    v-for="section in content[name].sections"
    :key="section.name"
    :section="section"
  />
  <Teleport to="body">
    <Toast
      v-if="content[name].notification"
      v-show="showPortal"
      :on-close="closePortal"
      :on-accept="closePortal"
      :on-reject="closePortal"
      :notification="content[name].notification"
    />
  </Teleport>
</template>
