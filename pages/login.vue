<template>
  <section class="container">
    <div>
      <form>
        <div>
          <label for="username">Username</label>
          <input name="username" v-model="user.username" />
        </div>
        
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" v-model="user.password" />
        </div>
        
        <div>
          <button type="submit" @click.prevent="login">Login</button>
        </div>

      </form>
    </div>
    <hr />

  </section>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
        const data = await this.$axios.post('login', {
            "username": this.user.username,
            "password": this.user.password
        });
        this.$store.commit('setAuth', data.data); // mutating to store for client rendering
        Cookie.set('auth', data.data); // saving token in cookie for server rendering
        this.$axios.setToken(data.access_token, 'Bearer');
        this.$router.push('/admin/secret');
    }
  }
};
</script>

<style scoped>
div {
  margin: 10px 0;
}
</style>
