<script setup>
import { inject, onMounted, ref } from "vue";
import { useRoute } from "#imports";

const { content } = inject("data");
const route = useRoute();
const showPortal = ref(false);

onMounted(() => {
    showPortal.value = content[route.name].notification ? true : false;
});

function closePortal() {
    showPortal.value = false;
}
</script>

<template>
  <Section
    v-for="section in content[route.name].sections"
    :key="section.id"
    :section="section"
  />
  <Teleport to="body">
    <Toast
      v-if="content[route.name].notification"
      v-show="showPortal"
      :on-close="closePortal"
      :on-accept="closePortal"
      :on-reject="closePortal"
      :notification="content[route.name].notification"
    />
  </Teleport>
</template>
