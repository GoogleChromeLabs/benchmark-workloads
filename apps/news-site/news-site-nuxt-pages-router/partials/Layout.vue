<script setup>
import { ref, inject, onMounted, watch } from "vue";
import { useRoute } from "#imports";
import styles from "news-site-css/dist/layout.module.css";

const showMessage = ref(false);
const route = useRoute();
const id = ref(route.name === "index" ? "home" : route.name);

const data = inject("data");
const { alerts, links } = data.value;

function updateShowMessage() {
    showMessage.value = alerts[id]?.message ? true : false;
    id.value = route.name === "index" ? "home" : route.name;
}

onMounted(updateShowMessage);
watch(() => route.path, updateShowMessage);

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
      v-if="data.config?.ads?.[id].hero"
      :data="data.config?.ads?.[id].hero"
      location="header"
    />
    <Header />
    <Navigation />
    <Message
      v-if="alerts[id]?.message"
      v-show="showMessage"
      :on-close="closeMessage"
      :message="alerts[id]?.message"
    />
    <Main>
      <slot />
    </Main>
    <Footer />
  </div>
</template>
