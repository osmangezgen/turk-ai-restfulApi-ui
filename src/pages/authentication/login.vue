<template>
  <div class="authentication">
    <div class="login">
      <div class="login-module rounded">
        <h1 class="d-flex justify-content-center align-items-center">
          <span>Log In</span>
        </h1>
        <form @submit.prevent="login" class="login-data">
          <div class="mb-3 position-relative">
            <label for="login-email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="login-email"
              aria-describedby="emailHelp"
              placeholder="enter your email"
              v-model="form.email"
              required
            />
            <span class="login-input-icon"><i class="fa-solid fa-user"></i></span>
          </div>
          <div class="mb-3 mt-4 position-relative">
            <label for="login-password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="login-password"
              aria-describedby="passwordHelp"
              placeholder="enter your password"
              v-model="form.password"
              required
            />
            <span class="login-input-icon"><i class="fa-solid fa-lock"></i></span>
          </div>
          <div class="text-danger ms-1" style="font-size: 15px; height: 15px">
            <div v-if="error.length > 0">
              {{ error[0] }}
            </div>
          </div>
          <div class="login-submit text-center mt-3">
            <button type="submit" class="btn btn-primary">
              <div v-if="!spin">Submit</div>
              <div class="spinner-border" role="status" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const { proxy } = getCurrentInstance();
const router = useRouter()
const store = useStore();

const form = reactive({
    email: "admin@admin.com",
    password: "123456"
})

const error = ref([]);
const spin = ref(false);

const login = () => {
  spin.value = true;
  proxy.$appAxios.post("/api/login", form)
      .then((x) => {
          store.commit('setUser', x.data);
          router.push({ name: 'dashboard' });
          location.reload();
      })
      .catch((err) => {
          error.value = err.response?.data?.messages || ['Beklenmedik bir hata oluştu.'];
          spin.value = false;
        });
}

</script>

<style lang="scss" scoped>

</style>