<script setup>
import { ref, inject, onMounted, watch } from "vue";
import { useRoute } from "#imports";
import styles from "news-site-css/dist/layout.module.css";

const showMessage = ref(false);
const route = useRoute();

const data = inject("data");
const { alerts, links } = data.value;

function handleOnChange() {
    const url = route.path;
    requestIdleCallback(() => {
        window.dispatchEvent(new CustomEvent("route-change-complete", { detail: { url } }));
    });

    showMessage.value = alerts[route.name]?.message ? true : false;
}

onMounted(handleOnChange);
watch(() => route.path, handleOnChange);

const closeMessage = () => {
    showMessage.value = false;
};
</script>

<template>
  <NuxtLink
    :to="`${route.path}#content`"
    class="skip-link"
  >
    {{ links.a11y.skip.label }}
  </NuxtLink>
  <div
    id="page"
    :class="styles.page"
  >
    <Ad
      v-if="data.config?.ads?.[route.name].hero"
      :data="data.config?.ads?.[route.name].hero"
      location="header"
    />
    <Header />
    <Navigation />
    <Message
      v-if="alerts[route.name]?.message"
      v-show="showMessage"
      :on-close="closeMessage"
      :message="alerts[route.name]?.message"
    />
    <Main>
      <slot />
    </Main>
    <Footer />
  </div>
</template>
