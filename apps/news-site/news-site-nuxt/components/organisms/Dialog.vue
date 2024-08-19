<script setup>
import { inject } from "vue";
import { useLocalStorage } from "#imports";
import styles from "news-site-css/dist/dialog.module.css";

const { onClose } = defineProps({
    onClose: Function,
});

const { settings } = inject("data");

const [reduceMotion, setReduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
const [highContrast, setHighContrast] = useLocalStorage("news-site-settings-high-contrast", false);

function toggleMotion(e) {
    setReduceMotion(e.target.checked);

    if (e.target.checked)
        document.documentElement.classList.add("reduced-motion");
    else
        document.documentElement.classList.remove("reduced-motion");
}

function toggleContrast(e) {
    setHighContrast(e.target.checked);

    if (e.target.checked)
        document.documentElement.classList.add("forced-colors");
    else
        document.documentElement.classList.remove("forced-colors");
}
</script>

<template>
  <div
    id="settings"
    :class="[styles.dialog, styles.open]"
  >
    <button
      id="close-dialog-link"
      :class="styles['dialog-close-button']"
      title="Close Button"
      @click="onClose"
    >
      <div
        :class="[styles['dialog-close-button-icon'], 'animated-icon', 'close-icon', 'hover']"
        title="Close Icon"
      >
        <span class="animated-icon-inner">
          <span />
          <span />
        </span>
      </div>
    </button>
    <header :class="styles['dialog-header']">
      <h2>{{ settings.header }}</h2>
    </header>
    <section :class="styles['dialog-body']">
      <div :class="styles['dialog-item']">
        <Toggle
          id="motion"
          :label="settings.items.motion.label"
          :on-change="toggleMotion"
          :checked="reduceMotion"
        />
      </div>
      <div :class="styles['dialog-item']">
        <Toggle
          id="contrast"
          :label="settings.items.contrast.label"
          :on-change="toggleContrast"
          :checked="highContrast"
        />
      </div>
    </section>
  </div>
</template>
