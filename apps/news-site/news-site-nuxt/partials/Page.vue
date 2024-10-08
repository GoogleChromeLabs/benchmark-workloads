<script setup>
import { inject, onMounted, ref } from "vue";
import { useLocalStorage, useHead } from "#imports";

import { useRoute } from "vue-router";

const { content, alerts } = inject("data");
const showPortal = ref(false);

const { name } = useRoute();

/** assign app settings from local storage */
const [reduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
const [highContrast] = useLocalStorage("news-site-settings-high-contrast", false);

onMounted(() => {
    showPortal.value = alerts[name].notification ? true : false;

    if (reduceMotion)
        document.documentElement.classList.add("reduced-motion");
    else
        document.documentElement.classList.remove("reduced-motion");

    if (highContrast)
        document.documentElement.classList.add("forced-colors");
    else
        document.documentElement.classList.remove("forced-colors");
});

useHead({
    script: [
        {
            src: "./benchmark-connector.min.js",
            tagPosition: "bodyClose",
        },
        {
            src: "./workload-test.js",
            type: "module",
            tagPosition: "bodyClose",
        }
    ],
});

function closePortal() {
    showPortal.value = false;
}
</script>

<template>
  <Section
    v-for="section in content[name]"
    :key="section.name"
    :section="section"
  />
  <Teleport to="body">
    <Toast
      v-if="alerts[name].notification"
      v-show="showPortal"
      :on-close="closePortal"
      :on-accept="closePortal"
      :on-reject="closePortal"
      :notification="alerts[name].notification"
    />
  </Teleport>
</template>
