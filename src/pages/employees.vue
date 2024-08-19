<template>
    <addEmployeesModal @onEmployeSaved="getEmployees" />
    <div class="main-content">
      <div
        class="customer d-flex align-items-center justify-content-start mb-4 position-relative"
      >
        <h1>Çalışanlar</h1>
        <div class="navbar-search border">
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" placeholder="Çalışan adına göre ara..." v-model="searchData"/>
        </div>
        <div class="add-user d-flex">
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#add-employees-modal"
          >
            Çalışlan Ekle
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="customer-info customer-current shadow">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-hover employees">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Çalışan Adı</th>
                      <th scope="col">Çalışan Soyadı</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telefon</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in employeesData" :key="item">
                      <td class="text-primary">#{{ searchDataStatus == false ? paginateData.total - ((paginateData.current_page - 1) * paginateData.per_page) - index : "" }}</td> 
                      <td>{{ item.first_name }}</td>
                      <td>{{ item.last_name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.phone }}</td>
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
import addEmployeesModal from "../components/modals/employees/addEmployees.vue";
import paginate from "../components/paginate/paginate.vue";

import { ref, onMounted, watch, getCurrentInstance, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';


const { proxy } = getCurrentInstance();
const employeesData = ref(null);
const paginateData = ref(null);
const searchData = ref("");
const searchDataStatus = ref(false);

const route = useRoute();
const router = useRouter();

// func
const pageChange = (page) => {
  router.push({ query: { page: page } });
  // getEmployees();
  window.scrollTo(0, 0);
};

const getEmployees = async (page = 1) => {
  if (route.query.page) page = route.query.page;
  const response = await proxy.$appAxios.get(`/api/employees?page=${page}`);
  employeesData.value = response?.data?.data;
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
    confirmButtonText: 'Evet, çalışan silinsin!',
    cancelButtonText: 'İptal',
  }).then((result) => {
    if (result.isConfirmed) {
        proxy.$appAxios.delete('/api/employees/'+ item.id).then(() => {
        Swal.fire('Silindi!', 'Şirket başarı ile silindi.', 'success');
        getEmployees();
      });
    }
  });
};

// Watchers
watch(route, (newRoute) => {
  if (route.name === 'employees') {
    getEmployees();
  }
});

watchEffect((onValidate) => {
  if (searchData.value.length > 2) { 
      const response = setTimeout(() => {
         proxy.$appAxios.get('/api/employees-search', {
            params: { query: searchData.value }
          }).then((response) => {
            searchDataStatus.value = true;
            employeesData.value = response?.data?.data;
          });
      }, 500);

      onValidate(() => {
        clearTimeout(response)
      })
  }else if(searchData.value.length == 0 && searchDataStatus.value == true) {
    searchDataStatus.value = false;
    getEmployees();
  }
});

// Mounted 
onMounted(() => {
  getEmployees();
});

</script>

<style scoped>
img{
    object-fit: contain;
}
</style>