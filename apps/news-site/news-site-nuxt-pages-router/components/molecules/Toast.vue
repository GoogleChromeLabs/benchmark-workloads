<script setup>
import { useLocalStorage } from "#imports";
import toastStyles from "news-site-css/dist/toast.module.css";
import buttonStyles from "news-site-css/dist/button.module.css";

const { onClose, onAccept, onReject, notification } = defineProps({
    onClose: Function,
    onAccept: Function,
    onReject: Function,
    notification: Object
});

const [notificationSeen, setNotificationSeen] = useLocalStorage(`news-site-notification-${notification.name}-seen`, false);

function handleOnClose() {
    setNotificationSeen(true);
    onClose();
}

function handleOnAccept() {
    setNotificationSeen(true);
    onAccept();
}

function handleOnReject() {
    setNotificationSeen(false);
    onReject();
}

const callbacks = {
    "accept": handleOnAccept,
    "reject": handleOnReject
};
</script>

<template>
  <div
    v-if="!notificationSeen"
    :class="[toastStyles.toast, toastStyles.open]"
  >
    <button
      id="close-toast-link"
      :class="toastStyles['toast-close-button']"
      title="Close Button"
      @click="handleOnClose"
    >
      <div
        :class="[toastStyles['toast-close-button-icon'], 'animated-icon', 'close-icon', 'hover']"
        title="Close Icon"
      >
        <span class="animated-icon-inner">
          <span />
          <span />
        </span>
      </div>
    </button>
    <header
      v-if="notification.title"
      :class="toastStyles['toast-header']"
    >
      <h2>{{ notification.title }}</h2>
    </header>
    <section :class="toastStyles['toast-body']">
      <div :class="toastStyles['toast-description']">
        {{ notification.description }}
      </div>
      <div :class="toastStyles['toast-actions']">
        <button
          v-for="action in notification.actions"
          :id="`toast-${action.type}-button`"
          :key="`toast-${action.type}-button`"
          :class="[buttonStyles.button, buttonStyles[`${action.priority}-button`], toastStyles['toast-actions-button']]"
          @click="callbacks[action.type]"
        >
          {{ action.name }}
        </button>
      </div>
    </section>
  </div>
</template>
