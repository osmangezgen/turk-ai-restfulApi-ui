<template>
    <div class="main-content">
      <h1 class="mb-4">Kontrol Paneli</h1>
      <div class="row dashboard">
        <div class="col-md-4">
          <div class="shadow-sm">
            <div class="dashboard-user">
              <h4>Tekrar Hoşgeldin !</h4>
              <span>Kontrol Paneli</span>
            </div>
            <div class="dashboard-user-info">
              <img
                src="http://127.0.0.1:8000/storage/default.png"
                alt=""
                v-if="_getCurrentUser?.img_url == null"
              />
              <img :src="_getCurrentUser?.img_url" alt="" v-else />
              <div>{{ _getCurrentUser?.name }}</div>
              <button
                type="button"
                class="btn btn-primary btn-sm d-flex align-items-center"
              >
                <span>Profili Görüntüle</span>
                <span><i class="fa-solid fa-arrow-right ms-2"></i></span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="d-flex flex-wrap">
            <div class="report-info mb-4">
              <div class="report-info-back bg-white shadow-sm">
                <div>
                  <h4>Ürünler</h4>
                  <span>
                    <small class="px-1" style="font-size: 14px">Toplam:</small>
                    <small class="p-0 px-1"> {{ statistics?.products }}</small>
                  </span>
                </div>
                <div class="report-info-icon"><i class="fa-solid fa-cube"></i></div>
              </div>
            </div>
            <div class="report-info mb-4">
              <div class="report-info-back bg-white shadow-sm">
                <div>
                  <h4>Kategoriler</h4>
                  <span>
                    <small class="px-1" style="font-size: 14px">Toplam:</small>
                    <small class="p-0 px-1"> {{ statistics?.categories }}</small>
                  </span>
                </div>
                <div class="report-info-icon"><i class="fa-brands fa-buffer"></i></div>
              </div>
            </div>
            <div class="report-info mb-4">
              <div class="report-info-back bg-white shadow-sm">
                <div>
                  <h4>Alışverişler</h4>
                  <span>
                    <small class="px-1" style="font-size: 14px">Toplam:</small>
                    <small class="p-0 px-1"> {{ statistics?.sales }}</small>
                  </span>
                </div>
                <div class="report-info-icon">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
              </div>
            </div>
            <div class="report-info mb-4">
              <div class="report-info-back bg-white shadow-sm">
                <div>
                  <h4>Günlük Alışverişler</h4>
                  <span>
                    <small class="px-1" style="font-size: 14px">Toplam:</small>
                    <small class="p-0 px-1"> {{ statistics?.salesDaily }}</small>
                  </span>
                </div>
                <div class="report-info-icon"><i class="fa-solid fa-clock"></i></div>
              </div>
            </div>
          </div>
          <div class="report-card shadow-sm p-2 bg-white">
            <div id="chart"></div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>

</script>

<style scoped>

</style>