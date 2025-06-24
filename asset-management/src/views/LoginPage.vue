<template>
  <div class="login-body">
    <div
      class="container d-flex justify-content-center align-items-center min-vh-100"
    >
      <div
        class="row border rounded-6 p-3 bg-white shadow box-area"
        style="border-radius: 20px"
      >
        <!-- Left box -->
        <div
          class="col-md-6 d-flex justify-content-center align-items-center flex-column left-content"
        >
          <div class="loginimage mb-3">
            <img
              src="../assets/images/login.jpg"
              class="img-fluid login-image"
              style="width: 345px" 
            />
          </div>
        </div>

        <!-- Right box -->
        <div class="col-md-6 right-content">
          <div>
            <h4 class="login-title"
              
            >
              Hello Again
            </h4>
            <p  class="sign-in-title">
              Sign-In to get started
            </p>
          </div>
          <div>
            <div  class="email-container">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email"
                v-model="email"
              />
              <p v-if="emailErrMsg" class="error-msg">{{ emailErrMsg }}</p>
            </div>

            <div>
              <label class="form-label">Password</label>
              <!-- <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              /> -->
              <input
                 :type="showPassword ? 'text' : 'password'"   
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
              <span
      class="password-toggle-icon"
      @click="togglePasswordVisibility"
    >
    
    <v-icon :alt="showPassword ? 'Hide password' : 'Show password'" style="cursor: pointer">
    {{ showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
  </v-icon>
    </span>
              <p v-if="passwrdErrMsg" class="error-msg">{{ passwrdErrMsg }}</p>
            </div>

            <div
              class="button-group"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              "
            >
              <p v-if="GglMsg" class="error-msg">{{ GglMsg }}</p>
              <button type="button" class="btn login-btn" @click="login">
                Login
              </button>
            </div>
            <div class="sign-in-or">
              <hr style="flex: 1; border: 3px; border-top: 1px solid black" />
              <span style="padding: 0 10px; color: #666; font-size: 15px"
                >or</span
              >
              <hr style="flex: 1; border: 1px; border-top: 1px solid black" />
            </div>
            <div class="button-group">
              <button
                type="button"
                class="btn btn-light google-signin-btn"
                @click="GoogleSignin"
              >
                <img
                  src="../assets/images/google.png"
                  style="width: 1rem; margin-right: 20px"
                />
                <small  class="sign-in-ggl">Sign in with Google</small>
              </button>
            </div>

            <div class="row mt-3 mb-3">
              <small class="account"
                >Don't have an account? &nbsp;<RouterLink to="/signup-page"
                  >Sign-up</RouterLink
                ></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toastStore.toastNoAccess" class="toast">
      {{ toastStore.toastNoAccess }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/useToastStore';

const toastStore = useToastStore();
const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const auth = getAuth();

const passwrdErrMsg = ref('');
const emailErrMsg = ref('');
const GglMsg = ref('');
const showPassword = ref(false);


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};


//login with email/passwrd
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Signed in with email/password');
      router.push('/dashboard-page');
    })
    .catch((error) => {
      console.log('Signing in failed', error);
      const errorCode = error.code;
      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
      ) {
        fetchSignInMethodsForEmail(auth, email.value).then((methods) => {
          if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
            GglMsg.value =
              'Account is already associated with Google. Please sign in using Google.';
          } else {
            passwrdErrMsg.value = 'Incorrect Password or account not found.';
          }
        });
      } else if (errorCode === 'auth/invalid-email') {
        emailErrMsg.value = 'Invalid email';
      } else {
        emailErrMsg.value = 'Email or password was incorrect';
      }
    });
};

const GoogleSignin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('user', user);

      // Check for existing sign-in methods
      fetchSignInMethodsForEmail(auth, user.email || '').then((methods) => {
        console.log('methods', methods);
        if (methods.includes(EmailAuthProvider.PROVIDER_ID)) {  
          // If email/password is linked, proceed to feed
          router.push('/dashboard-page');
        } else {
          //if not then link the email/passwrd to ggl account
          const credential = EmailAuthProvider.credential(
            email.value,
            password.value
          );
          linkWithCredential(user, credential)
            .then(() => {
              console.log('Linked Google account with email/password account');
              router.push('/dashboard-page');
            })
            .catch((error) => {
              console.log('Failed to link accounts:', error);
            });
        }
      });
    })
    .catch((error) => {
      console.log('Google Sign-In failed', error);
      GglMsg.value = 'Google Sign-In failed. Please try again.';
    });
};
</script>

<style scoped>
.mdi-eye::before {
    content: "\F0208";
    margin-top: -4rem;
    margin-left: 49rem;
    color: #343a40;
    font-size: 18px;
}


.password-toggle-icon {
 position: absolute;
    top: 21.4rem;
    right: 21rem;
    font-size: 12px;
}


.box-area {
  width: 930px;
}
.error-msg {
  color: red; 
  font-size: 0.7rem;
  position: absolute;
  margin-top: 0.5rem;
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

.google-signin-btn {
  width: 100%;
  background-color: #e6f2ee;
}
.google-signin-btn:hover {
  background-color: #95b9af;
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
   margin-bottom: 1rem; margin-top: 1rem
  }
  .sign-in-or{
    display: flex; align-items: center; margin: 20px 0
  }
  .sign-in-ggl{
    font-size: 13px;
  }
/* mobile*/
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
    width:14rem !important;
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
   margin-bottom: 0.2rem; margin-top: 0.4rem
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
  .sign-in-or{
    margin: 0.2rem 0
  }
  .sign-in-ggl{
    font-size: 12px;
  }
  .account{
    font-size: 12px;
    display: flex;
        align-items: center;
        justify-content: center;
  }
  .error-msg{
    color: red;
    font-size: 0.6rem;
    position: absolute;
    margin-top: 0.2rem;
}
  
}
</style>
