<template>
    <addCompaniesModal @onCompanySaved="getCompanies" />
    <div class="main-content">
      <div
        class="customer d-flex align-items-center justify-content-start mb-4 position-relative"
      >
        <h1>Şirketler</h1>
        <div class="navbar-search border">
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" placeholder="Ara..." />
        </div>
        <div class="add-user d-flex">
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#add-companies-modal"
          >
            Şirket Ekle
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="customer-info customer-current shadow">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-hover companies">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Şirket Adı</th>
                      <th scope="col">Email</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Website</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in companiesData" :key="item">
                      <td class="text-primary">#{{ paginateData.total - ((paginateData.current_page - 1) * paginateData.per_page) - index  }}</td> 
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>
                        <img
                          class="rounded"
                          :src="item.logo"
                          alt=""
                          height="75"
                          width="75"
                        />
                      </td>
                      <td>
                        <a :href="item.website" target="_blank">{{ item.name }} <i class="fa-solid fa-arrow-up-right-from-square fa-sm ms-2"></i></a>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger px-2 btn-sm hint--bottom"
                          aria-label="Şirketi Sil"
                          @click="deleteCompany(item)"
                        >
                          <span><i class="fa-solid fa-trash"></i></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <paginate :paginateData="paginateData" @pageChange="pageChange" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import addCompaniesModal from "../components/modals/companies/addCompanies.vue";
import paginate from "../components/paginate/paginate.vue";

import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';


const { proxy } = getCurrentInstance();
const companiesData = ref(null);
const paginateData = ref(null);


const route = useRoute();
const router = useRouter();

// func
const pageChange = (page) => {
  router.push({ query: { page: page } });
  // getCompanies();
  window.scrollTo(0, 0);
};

const getCompanies = async (page = 1) => {
  if (route.query.page) page = route.query.page;
  const response = await proxy.$appAxios.get(`/api/companies?page=${page}`);
  companiesData.value = response?.data?.data;
  paginateData.value = response?.data?.meta;
};

const deleteCompany = (item) => {
  Swal.fire({
    title: 'Emin misiniz?',
    text: 'Bu işlemi geri alamazsınız!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Evet, şirket silinsin!',
    cancelButtonText: 'İptal',
  }).then((result) => {
    if (result.isConfirmed) {
        proxy.$appAxios.delete('/api/companies/'+ item.id).then(() => {
        Swal.fire('Silindi!', 'Şirket başarı ile silindi.', 'success');
        getCompanies();
      });
    }
  });
};

// Watchers
watch(route, (newRoute) => {
  if (route.name === 'companies') {
    getCompanies();
  }
});

// Mounted 
onMounted(() => {
  getCompanies();
});

</script>

<style scoped>
img{
    object-fit: contain;
}
</style>