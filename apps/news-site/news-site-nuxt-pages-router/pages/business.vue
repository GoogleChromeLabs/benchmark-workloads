<script setup>
import { useHead } from "#imports";
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
</script>
<template>
  <Page id="business" />
</template>
