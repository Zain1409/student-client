<template>
  <div class="register-container">
    <div class="input-form">
      <label class="label">Username</label>
      <input type="text" placeholder="Username" v-model="username" disabled />
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
  name: "student",
  data() {
    return {
      error:"",
      username: "",
      course: "",
      email: "",
      fullname: "",
      address: "",
      students: [],
    };
  },
  async beforeCreate() {
    await axios
      .get("http://localhost:8081/api/student/" + this.$route.params.id)
      .then((response) => {
        this.username = response.data.username;
        this.course = response.data.course;
        this.email = response.data.email;
        this.fullname = response.data.fullname;
        this.address = response.data.address;
        console.log(response.data);
      });
  },
  methods:{
    async save(){
      if(!this.valid(this.course, this.email, this.fullname, this.address)){
        this.error = "not be empty"; 
      }else{
        this.students = {
          username: this.username,
          course: this.course,
          email: this.email,
          fullname: this.fullname,
          address: this.address,
        },
        await axios.put('http://localhost:8081/api/student',this.students)
              .then(() => {
                // console.log(response.data)
                alert('okkk')
                this.$router.push({ name: 'home' })
              });
      }
    },
    valid(course, email, fullname, address){
      if(course != "" && email != "" && fullname != "" && address != ""){
        return true;
      }
      return false;
    }
  }
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
