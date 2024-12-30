<script setup>
import { inject, onMounted, ref } from "vue";
import { useLocalStorage } from "#imports";

import { BenchmarkConnector } from "workload-testing-utils/dist/benchmark.mjs";
import suites, { appName, appVersion } from "../src/workload-test.mjs";

const { id } = defineProps({
    id: String
});
const data = inject("data");
const { alerts } = data.value;
const showPortal = ref(false);

/** assign app settings from local storage */
const [reduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
const [highContrast] = useLocalStorage("news-site-settings-high-contrast", false);

onMounted(() => {
    showPortal.value = alerts[id].notification ? true : false;

    if (reduceMotion)
        document.documentElement.classList.add("reduced-motion");
    else
        document.documentElement.classList.remove("reduced-motion");

    if (highContrast)
        document.documentElement.classList.add("forced-colors");
    else
        document.documentElement.classList.remove("forced-colors");

    /*
        Paste below into dev console for manual testing:
        window.addEventListener("message", (event) => console.log(event.data));
        window.postMessage({ id: "news-site-nuxt-pages-router-1.0.0", key: "benchmark-connector", type: "benchmark-suite", name: "default" }, "*");
    */
    const benchmarkConnector = new BenchmarkConnector(suites, appName, appVersion);
    benchmarkConnector.connect();

    return () => benchmarkConnector.disconnect();
});

function closePortal() {
    showPortal.value = false;
}
</script>

<template>
  <template
    v-for="(section, index) in data.content[id]"
    :key="section.id"
  >
    <Ad
      v-if="data.config?.ads?.[id].sections[index]"
      :data="data.config?.ads?.[id].sections[index]"
      location="section"
    />
    <Section
      :section="section"
      :section-index="index"
      :page-id="id"
    />
  </template>
  <Teleport to="body">
    <Toast
      v-if="alerts[id].notification"
      v-show="showPortal"
      :on-close="closePortal"
      :on-accept="closePortal"
      :on-reject="closePortal"
      :notification="alerts[id].notification"
    />
  </Teleport>
</template>
