<template>
<form @submit.prevent="register">

    <!-- Modal -->
    <div
      class="modal fade"
      id="add-employees-modal"
      tabindex="-1"
      aria-labelledby="add-employees-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <span><i class="fa-solid fa-building me-2"></i></span>
              <span>Çalışan Ekle</span>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="mb-3">
                      <label for="add-employees-company" class="form-label">
                        <span
                          class="text-danger hint--bottom me-1"
                          aria-label="Bu alan gereklidir!"
                          >*</span
                        >
                        <span>Şirket:</span>
                      </label>
                      <select class="form-control" name="add-employees-company_id" id="add-employees-company" v-model="form.company_id"  required>
                        <option value="" disabled selected>Şirket Seçiniz</option>
                        <option :value="item.id" v-for="(item, index) in companiesAllData" :key="index">{{ item.name }}</option>
                      </select>
                      <Select2
                      v-model="form.company_id"
                      :options="companiesAllData"
                      placeholder="Şirket Seçiniz"
                      :allow-clear="true"
                      </select2>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="add-employees-name" class="form-label">
                        <span
                          class="text-danger hint--bottom me-1"
                          aria-label="Bu alan gereklidir!"
                          >*</span
                        >
                        <span>Çalışan Adı:</span>
                      </label>
                      <input
                        type="text"
                        max="255"
                        class="form-control"
                        id="add-employees-name"
                        aria-describedby="employees-name"
                        placeholder="Çalışan Adı"
                        v-model="form.first_name"
                        required
                      />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                      <label for="add-employees-surname" class="form-label">
                        <span
                          class="text-danger hint--bottom me-1"
                          aria-label="Bu alan gereklidir!"
                          >*</span
                        >
                        <span>Çalışan Soyadı:</span>
                      </label>
                      <input
                        type="text"
                        max="255"
                        class="form-control"
                        id="add-employees-surname"
                        aria-describedby="employees-surname"
                        placeholder="Çalışan Soyadı"
                        v-model="form.last_name"
                        required
                      />
                    </div>
                </div>
                </div>
                <div class="mb-3">
                  <label for="add-employees-email" class="form-label">
                    <span
                      class="text-danger hint--bottom me-1"
                      aria-label="Bu alan gereklidir!"
                      >*</span
                    >
                    <span>Çalışan Email:</span>
                  </label>
                  <input
                    type="email"
                    max="255"
                    class="form-control"
                    id="add-employees-email"
                    aria-describedby="employees-email"
                    placeholder="Çalışan Email"
                    v-model="form.email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="add-employees-phone" class="form-label">
                    <span
                      class="text-danger hint--bottom me-1"
                      aria-label="Bu alan gereklidir!"
                      >*</span
                    >
                    <span>Çalışan Telefon:</span>
                  </label>
                  <input
                    type="text"
                    max="20"
                    class="form-control"
                    id="add-employees-phone"
                    aria-describedby="employees-phone"
                    placeholder="Çalışan Telefon"
                    v-model="form.phone"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <div>
              <div v-if="error.length > 0">
                <div class="text-danger ms-1" style="font-size: 15px;">
                  {{ error[0] }}
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                id="closeModal"
              >
                Kapat
              </button>
              <button type="submit" class="btn btn-success">
                Çalışan Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</form>

</template>
  
<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';

const { proxy } = getCurrentInstance();
const emit = defineEmits(['onEmployeSaved']);

const companiesAllData = ref(null);
const form = reactive({
  company_id: "",
  first_name: "",
  last_name: "",
  email: null,
  phone: "",
});

const error = ref([]);

const getAllCompanies = async () => {
  const response = await proxy.$appAxios.get(`/api/companies-read`);
  companiesAllData.value = response?.data?.data;
};
getAllCompanies()

const register = () => {

  proxy.$appAxios
    .post("/api/employees", form)
    .then(() => {
      document.getElementById('closeModal').click()
      Swal.fire({
        title: "Çalışan Eklendi!",
        text: "Başarı ile Çalışan eklendi.",
        icon: "success"
      });
      form.company_id = "";
      form.first_name = "";
      form.last_name = "";
      form.email = null;
      form.phone = "";
      emit('onEmployeSaved');
    })
    .catch((err) => {
        if(err.response?.data)
            error.value = err.response?.data?.messages || ['Beklenmedik bir hata oluştu.'];
    });
};



</script>

  
<style scoped>
  label {
    height: 20px;
  }
  .features:nth-child(n + 1) {
    margin-top: 10px;
  }
  .add-features {
    height: 20px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .features-delete {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 5px;
    cursor: pointer;
  }
  .features-delete:hover {
    color: red;
  }
</style>
  