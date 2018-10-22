<template>
  <section class="container mt-5">
    <div class="jumbotron">
      <div class="row">
        <div class="col-12">
          <h1>Get inside</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <form
            id="login"
            @submit.prevent="submit('login')">

            <div
              v-if="errors.login"
              class="alert alert-danger">

              <strong>Danger!</strong> {{ errors.login }}
            </div>

            <div class="form-group">
              <label for="login__email">Email Address</label>

              <input
                id="login__email"
                v-model="login.emailAddress"
                type="email"
                class="form-control"
                required>
            </div>

            <div class="form-group">
              <label for="login__password">Password</label>

              <input
                id="login__password"
                v-model="login.password"
                type="password"
                class="form-control"
                required>
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary">Submit
              </button>
            </div>
          </form>
        </div>

        <div class="col-md-6">
          <form
            id="register"
            @submit.prevent="submit('register')">

            <div
              v-if="errors.register"
              class="alert alert-danger">
              <strong>Danger!</strong> {{ errors.register }}
            </div>

            <div class="form-group">
              <label for="register__email">Email Address</label>
              <input
                id="register__email"
                v-model="register.emailAddress"
                type="email"
                class="form-control"
                required>
            </div>

            <div class="form-group">
              <label for="register__full-name">Full Name</label>
              <input
                id="register__full-name"
                v-model="register.fullName"
                type="text"
                class="form-control"
                required>
            </div>

            <div class="form-group">
              <label for="register__password">Password</label>
              <input
                id="register__password"
                v-model="register.password"
                type="password"
                class="form-control"
                required>
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary">Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        // Set login form data
        login: {
          emailAddress: '',
          password: '',
        },
        // Set register form data
        register: {
          emailAddress: '',
          fullName: '',
          password: '',
        },
        // Set form errors
        errors: {
          login: '',
          register: ''
        }
      }
    },
    methods: {
      submit(form) {
        const _this = this;
        _this.$store
          .dispatch('account/USER_' + form.toUpperCase(), this[form])
          .then(res => {
            if (res.status === 200)
              _this.$router.push('/account');
          })
          .catch(error =>
            _this.data.errors[form] = error.response.data.message);
      }
    }
  }
</script>

<style scoped>

</style>
