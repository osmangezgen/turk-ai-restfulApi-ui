<template>
    <div class="main-content">
      <h1 class="mb-4">Kontrol Paneli</h1>
      <div class="row dashboard">
        <div class="col-md-12">
          <div class="shadow-sm">
            <div class="dashboard-user">
              <h4>Tekrar Hoşgeldin !</h4>
              <span>Kontrol Paneli</span>
            </div>
            <div class="dashboard-user-info">
              <img
                src="http://127.0.0.1:8000/storage/default.png"
                alt=""
              />
              <div>{{ _getCurrentUser?.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const _getCurrentUser = computed(() => store.getters._getCurrentUser);

</script>

<style scoped>

</style>