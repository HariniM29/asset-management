<template>
  <div class="login-body">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row border rounded-6 p-3 bg-white shadow box-area" style="border-radius: 20px;">
        <!-- Left box -->
        <div class="col-md-6 d-flex justify-content-center align-items-center flex-column left-content">
          <div class="loginimage mb-3">
            <img src="../assets/images/signup.jpg" class="img-fluid login-image" style="width: 345px" />
          </div>
        </div>

        <!-- Right box -->
        <div class="col-md-6 right-content">
          <div>
            <h4 class="login-title">Sign Up</h4>
            <p class="sign-in-title">Unlock possibilities. Sign up to explore more.</p>
          </div>
          <div style="margin-top: 0.2rem">
            <div class="email-container">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email"
                v-model="email"
                @input="emailValidate"
              />
              <small v-if="emailError" class="error-message">{{ emailError }}</small>
            </div>

            <div>
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
                @input="passwordValidate"
              />
              <small v-if="passwordError" class="error-message">{{ passwordError }}</small>
            </div>

            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <button type="button" class="btn login-btn" @click="register">Sign-up</button>
            </div>

            <div class="row mt-3 mb-3">
              <small class="account">
                Already have an account? &nbsp;
                <RouterLink to="/login-page">Login</RouterLink>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="toastStore.toastNoAccess"
      :class="['toast', toastStore.toastType === 'success' ? 'toast-success' : 'toast-error']"
    >
      {{ toastStore.toastNoAccess }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/useToastStore';

const toastStore = useToastStore();
const email = ref('');
const password = ref('');
const router = useRouter();
const passwordError = ref('');
const emailError = ref('');

// Email Validation
const emailValidate = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(email.value) ? '' : 'Invalid email format.';
};

// Password Validation
const passwordValidate = () => {
  const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8}$/;
  passwordError.value = pattern.test(password.value)
    ? ''
    : 'Password must be 8 characters, 1 uppercase, 1 special character.';
};

// Dummy Register Function for Static Deploy
const register = () => {
  if (emailError.value || passwordError.value || !email.value || !password.value) {
    toastStore.setToastMessage('Please fix the form errors', 'error');
    return;
  }

  toastStore.setToastMessage('Successfully signed up!', 'success');
  setTimeout(() => router.push('/login-page'), 1500);
};
</script>

<style scoped>
.box-area {
  width: 930px;
}
.toast {
  position: fixed;
  top: 22px;
  right: 30px;
  background-color: #fff;
  color: #333;
  padding: 14px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: opacity 0.5s ease;
  z-index: 9999;
}
.toast-success {
  background-color: #28a745; /* Green for success */
  color: white;
}
.toast-error {
  background-color: #dc3545; /* Red for error */
  color: white;
  border: none;
}

.form-label {
  margin-bottom: 0.3rem !important;
  font-size: 13px;
  color: #212529;
}

.form-control {
  border-radius: 7px !important;
  box-shadow: 0 0px 2px rgb(184 199 210) !important;
  border: none !important;
}

::placeholder {
  font-size: 14px;
}

.login-btn {
  width: 200px;
  margin-top: 2rem;
  background-color: #14b789;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}
.login-body{
  background-color: #d1eae2
}
.login-title{
    margin-top: 1rem;
    color: #1dab83;
    font-weight: 500;
    font-size: 20px ;
  }
  .sign-in-title{
  color: #343a40; font-size: 14px
 
  }
  .email-container{
   margin-bottom: 1rem;
  }
  .login-btn{
    
                  width: 200px;
                  margin-top: 2rem;
                  background-color: #14b789;
                  color: white;
                  font-weight: 00;
                
  }
  .account{
   
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-top: 20px;
                
  }
@media only screen and (max-width:480px){
  .login-body{
   background-color: white;
  }
  .box-area{
    border-radius: none;
    border:none !important;
    box-shadow: none !important;
    padding: 10px !important;
  }
  .login-image{
    width:17rem !important;
  }
  .login-title{
    margin-top: 0rem;
    color: #1dab83;
    font-weight: 500;
    font-size: 15px ;
    margin-bottom: 0.1rem;
  }
  .sign-in-title{
  color: #343a40; font-size: 13px
  }
  .email-container{
   margin-bottom: 0.2rem;
  /* margin-top: 0.4rem */
  }
  .form-label{
    font-size: 12px;
    margin-top:1.1rem
  }
  .login-btn{
    width: 9rem;
    margin-top: 1.5rem;
    font-size: 15px;
  }
  .account{
 
   margin-top: 0.5rem;
   font-size: 12px;
 
}
}
</style>
