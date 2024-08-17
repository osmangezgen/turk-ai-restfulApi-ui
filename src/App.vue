<template>
  <div class="d-flex align-items-center">
    <div class="header" :class="{ 'vertical-menu-closed-header': !vericalMenuChanced }">
      <navbar v-if="$route.name != 'login'" @verticalMenuFunc="verticalMenuFunc" />
      <router-view></router-view>
    </div>
    <verticalMenu
      v-if="$route.name != 'login'"
      :vericalMenuChanced="vericalMenuChanced"
    />
  </div>
</template>


<script setup>
import verticalMenu from "./components/static/verticalMenu.vue";
import navbar from "./components/static/navbar.vue";

import { ref, computed, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";

const { proxy } = getCurrentInstance();
const store = useStore();

const vericalMenuChanced = ref(false);

const _getSettings = computed(() => store.getters._getSettings);

onBeforeMount(() => {
  vericalMenuChanced.value = _getSettings.value.verticalMenu;

  // csrf-cookie
  proxy.$appAxios.get('/sanctum/csrf-cookie').then(response => {});
});

const verticalMenuFunc = (item) => {
  vericalMenuChanced.value = item;
};

</script>

<style scoped>
/* Styles */
</style>