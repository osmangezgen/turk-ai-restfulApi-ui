<template>
<form @submit.prevent="register">

    <!-- Modal -->
    <div
      class="modal fade"
      id="add-companies-modal"
      tabindex="-1"
      aria-labelledby="add-companies-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <span><i class="fa-solid fa-building me-2"></i></span>
              <span>Şirket Ekle</span>
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
              <div class="col-md-12">
                <div class="mb-3">
                  <label for="add-companies-name" class="form-label">
                    <span
                      class="text-danger hint--bottom me-1"
                      aria-label="Bu alan gereklidir!"
                      >*</span
                    >
                    <span>Şirket Adı:</span>
                  </label>
                  <input
                    type="text"
                    max="255"
                    class="form-control"
                    id="add-companies-name"
                    aria-describedby="companies-name"
                    placeholder="Şirket Adı"
                    v-model="form.name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="add-companies-email" class="form-label">
                    <span
                      class="text-danger hint--bottom me-1"
                      aria-label="Bu alan gereklidir!"
                      >*</span
                    >
                    <span>Şirket Email:</span>
                  </label>
                  <input
                    type="email"
                    max="255"
                    class="form-control"
                    id="add-companies-email"
                    aria-describedby="companies-email"
                    placeholder="Şirket Email"
                    v-model="form.email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    <span class="text-danger hint--bottom me-1" aria-label="Bu alan gereklidir!">*</span>
                    Şirket Logo:
                  </label>
                  <input class="form-control" type="file" id="formFile" @change="addImage">
                </div>
                <div class="mb-3">
                  <label for="add-companies-website" class="form-label">
                    <span
                      class="text-danger hint--bottom me-1"
                      aria-label="Bu alan gereklidir!"
                      >*</span
                    >
                    <span>Şirket Website:</span>
                  </label>
                  <input
                    type="text"
                    max="255"
                    class="form-control"
                    id="add-companies-website"
                    aria-describedby="companies-webiste"
                    placeholder="Şirket Website"
                    v-model="form.website"
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
                Şirket Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</form>

</template>
  
<script setup>
import { ref, getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';
const { proxy } = getCurrentInstance();
const emit = defineEmits(['onCompanySaved']);

const form = ref({
  name: "",
  email: "",
  logo: null,
  website: "",
});

const error = ref([]);

const addImage = (event) => {
  form.value.logo = event.target.files[0];
};

const register = () => {

  let frm = new FormData();
  frm.append("name", form.value.name);
  frm.append("email", form.value.email);
  frm.append("logo", form.value.logo);
  frm.append("website", form.value.website);

  proxy.$appAxios
    .post("/api/companies", frm)
    .then(() => {
      document.getElementById('closeModal').click()
      Swal.fire({
        title: "Şirket Eklendi!",
        text: "Başarı ile Şirket eklendi.",
        icon: "success"
      });
      form.value = {
        name: "",
        email: "",
        logo: null,
        website: "",
      };
      emit('onCompanySaved');
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
  