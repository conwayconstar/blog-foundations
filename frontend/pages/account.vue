<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        Hello {{ user.fullName | ucFirst }}
      </h1>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  filters: {
    ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  computed: {
    ...mapState('account', ['user'])
  }
}
</script>
