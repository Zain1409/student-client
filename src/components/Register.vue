<template>
  <div class="register-container">
    <div class="input-form">
      <label class="label">Username</label>
      <input type="text" placeholder="Username" v-model="username" />
      <br /><br />

      <label class="label">Password</label>
      <input type="password" placeholder="Password" v-model="password" />
      <br /><br />

      <label class="label">Course</label>
      <input type="text" placeholder="Course" v-model="course" />
      <br /><br />

      <label class="label">Email</label>
      <input type="text" placeholder="Email" v-model="email" />
      <br /><br />

      <label class="label">Full name</label>
      <input type="text" placeholder="Full name" v-model="fullname" />
      <br /><br />

      <label class="label">Address</label>
      <input type="text" placeholder="Address" v-model="address" />
      <p>{{ error }}</p>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      course: "",
      email: "",
      fullname: "",
      address: "",
      error: "",
      payload: [],
    };
  },
  methods: {
    async save() {
      if (
        !this.valid(
          this.username,
          this.email,
          this.course,
          this.fullname,
          this.password,
          this.address
        )
      ) {
        this.error = "not be empty";
      } else {
        this.error ='';
        this.payload = {
          username: this.username,
          email: this.email,
          course: this.course,
          fullname: this.fullname,
          password: this.password,
          address: this.address,
        };
        await axios
          .post(`http://localhost:8081/api/student`, this.payload)
          .then((response) => {
            var res = response.data;
            if(res.id){
              alert('done!');
              this.reset();
              this.$router.push('/');
            }else{
              alert(res)
            }

          });
      }
    },
    valid(username, email, course, fullname, password, address) {
      if (
        username != "" &&
        email != "" &&
        course != "" &&
        fullname != "" &&
        password != "" &&
        address
      ) {
        return true;
      }
      return false;
    },
    reset(){
      this.username = '',
      this.email = '',
      this.course = '',
      this.fullname = '',
      this.password = '',
      this.address = ''
    }
  },
};
</script>

<style scoped>
.register-container {
  width: 400px;
  background-color: rgb(201, 212, 207);
  padding: 0;
  border: 1px solid rgb(182, 184, 182);
  border-radius: 10px;
  margin: auto;
}
button {
  width: 200px;
  height: 30px;
  margin-left: 100px;
  margin-top: 10px;
}
p {
  margin: 0px;
  color: red;
  padding-left: 100px;
}
</style>
