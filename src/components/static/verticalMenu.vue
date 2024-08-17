<template>
    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu" :class="{ 'vertical-menu-closed': !verticalMenuStatus }">
      <div data-simplebar class="h-100">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
          <!-- <div class="sidebar-logo">
            <img src="images/noisoft-logo.png" alt="" height="40" />
          </div> -->
          <!-- Left Menu Start -->
          <ul class="list-unstyled" id="side-menu">
            <li class="menu-title" key="t-menu">Menu</li>
            <router-link :to="{ name: 'dashboard' }">
              <li>
                <div class="menu-content">
                  <div class="menu-content-inside d-flex align-items-center">
                    <span class="me-3 menu-icon"
                      ><i class="fa-solid fa-house-user"></i
                    ></span>
                    <span>Kontrol Paneli</span>
                  </div>
                </div>
              </li>
            </router-link>

            <li class="menu-title" key="t-menu">Uygulama</li>

            <router-link :to="{ name: 'companies' }">
              <li>
                <div class="menu-content">
                  <div class="menu-content-inside d-flex align-items-center">
                    <span class="me-4 menu-icon"
                      ><i class="fa-solid fa-building"></i
                    ></span>
                    <span>Companies</span>
                  </div>
                </div>
              </li>
            </router-link>

            <router-link :to="{ name: 'employees' }">
              <li>
                <div class="menu-content">
                  <div class="menu-content-inside d-flex align-items-center">
                    <span class="me-3 menu-icon"
                      ><i class="fa-solid fa-users"></i
                    ></span>
                    <span>Employees</span>
                  </div>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
</template>
  

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const _getSettings = computed(() => store.getters._getSettings);
const _getCurrentUser = computed(() => store.getters._getCurrentUser);

const props = defineProps(['vericalMenuChanced']);

const verticalMenuStatus = ref(null);
const verticalMenuChanced = computed(() => props.vericalMenuChanced);

onMounted(() => {
    verticalMenuStatus.value = _getSettings.value.verticalMenu;
});

watch(verticalMenuChanced, (newValue) => {
    verticalMenuStatus.value = newValue;
});
</script>

<style scoped>

</style>
