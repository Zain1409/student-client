<template>
  <div class="container">
    <div class="login">
    <h2>Student Login</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <p>{{ error }}</p>
    <button @click="login">Login</button>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      error: "",
      username: "",
      password: "",
      isShow: false,
      payload: [],
    };
  },
  methods: {
    async login() {
      if (!this.valid(this.username, this.password)) {
        this.error = "Enter username or password";
      } else {
        this.payload = {
          username: this.username,
          password: this.password,
        };
        await axios
          .post(`http://localhost:8081/api/student/login`, this.payload)
          .then((response) => {
            let res = response.data;
            if (res == "SUCCESS") {
              alert("OK");
              this.reset();
            } else {
              this.error = "Wrong username or password";
            }
          });
      }
    },
    reset() {
      (this.username = ""), (this.password = ""), (this.error = "");
    },
    valid(username, password) {
      if (username != "" && password != "") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.container{
  padding-bottom: 50%;
}
.login {
  width: 300px;
  height: auto;
  border: 1px solid rgb(69, 71, 71);
  border-radius: 10px;
  margin: auto;
  text-align: center;
  background-color: rgb(194, 206, 201);
}
input {
  width: 200px;
  height: 30px;
  margin: 10px;
  outline: none;
  border: 1px solid rgb(86, 153, 173);
  border-radius: 5px;
  padding-left: 10px;
}
button {
  width: 210px;
  height: 30px;
  margin: 10px;
  outline: none;
  border: 1px solid rgb(86, 153, 173);
  border-radius: 5px;
}
p {
  margin: 0px;
  color: red;
}
</style>
