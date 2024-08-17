<template>
    <div class="navbar" :class="{ 'sidebar-logo-closed': !verticalMenuStatus }">
      <div class="sidebar-logo">
        <router-link :to="{ name: 'dashboard' }">
          <img
            src="http://127.0.0.1:8000/storage/turkai-logo.png"
            alt=""
            height="40"
            v-if="verticalMenuStatus"
          />
          <img src="http://127.0.0.1:8000/storage/turkai-logo2.jpeg" alt="" height="40" v-else />
        </router-link>
      </div>
      <div class="navbar-menu rounded shadow-sm">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-between align-items-center">
            <div class="navbar-left-side">
              <div class="vertical-menu-toggle" :class="{ 'vertical-menu-toggle-close': !verticalMenuStatus }" @click="verticalMenuToggle">
                <i class="fa-solid fa-angles-left"></i>
              </div>
              <div class="navbar-search">
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" placeholder="Ara..." />
              </div>
            </div>
            <div class="navbar-right-side">
              <div class="dropdown navbar-language">
                <button
                  class="btn navbar-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="http://127.0.0.1:8000/storage/tr-flag.png" alt="" height="25" />
                  <span>TR</span>
                </button>
                <ul class="dropdown-menu shadow">
                  <!-- <li>
                    <a class="dropdown-item">
                      <img src="../../assets/images/flag/US.png" alt="" height="20" />
                      <small>English</small>
                    </a>
                  </li> -->
                  <li>
                    <a class="dropdown-item">
                      <img src="http://127.0.0.1:8000/storage/tr-flag.png" alt="" height="20" />
                      <small>Turkish</small>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="navbar-notification">
                <small>5</small>
                <span><i class="fa-solid fa-bell"></i></span>
              </div>
              <div class="navbar-user dropdown">
                <button
                  class="btn navbar-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="http://127.0.0.1:8000/storage/default.png"
                    alt=""
                    v-if="_getCurrentUser?.img_url == null"
                  />
                  <img :src="_getCurrentUser?.img_url" alt="" v-else />
                  <span>{{ _getCurrentUser?.name }}</span>
                  <span><i class="fa-solid fa-chevron-down"></i></span>
                </button>
                <ul class="dropdown-menu shadow">
                  <li>
                    <!-- <router-link class="dropdown-item" :to="{ name: 'profile' }">
                      <span><i class="fa-solid fa-user me-2"></i></span>
                      <span>Profil</span>
                    </router-link> -->
                  </li>
                  <li @click="logout">
                    <a class="dropdown-item">
                      <span><i class="fa-solid fa-right-from-bracket me-2"></i></span>
                      <span>Çıkış Yap</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="navbar-settings">
                <span><i class="fa-solid fa-gear"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();

const store = useStore();
const router = useRouter();
const emit = defineEmits(['verticalMenu']);

const _getCurrentUser = computed(() => store.getters._getCurrentUser);
const _getSettings = computed(() => store.getters._getSettings);

const verticalMenuStatus = ref(null);

onMounted(() => {
  verticalMenuStatus.value = _getSettings.value.verticalMenu;
});

const logout = () => {
    proxy.$appAxios.post("/api/logout", _getCurrentUser.value).then(() => {
    store.commit("logoutUser");
    router.push({ name: "login" });
  });
};

const verticalMenuToggle = () => {
  verticalMenuStatus.value = !verticalMenuStatus.value;
  emit('verticalMenuFunc', verticalMenuStatus.value);
  store.commit("verticalMenuToggle");
};

</script>

<style lang="scss" scoped>

</style>