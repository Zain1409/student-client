<template>
  <div class="container">
    <div class="input-form">
      <label class="label">Username</label>
      <input type="text" placeholder="Username" v-model="username" />
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
    </div>
    <hr />

    <div class="show-button">
      <button @click="search">Search</button>
      <button @click="register">Register</button>
      <button>Back</button>
    </div>

    <div class="show-table">
      <br />
      <table border="1px">
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Address</th>
            <th>Course</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) of students" :key="index">
            
            <td>{{ student.username }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.fullname }}</td>
            <td>{{ student.address }}</td>
            <td>{{ student.course }}</td>
            <td>
              <!-- <button style="background: #72ACFF"  @click="detailStudent" >Detail</button> 
                <button style="background: red"  @click="deleteStudent" >Delete</button> -->
              <router-link :to="{ name: 'detail', params: { id: student.id } }">
                <button style="background: #72ACFF">Detail</button>
              </router-link>
              <button style="background: red" @click="deleteStudent(student)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div id="footer">
      <div id="pages">
        <div id="pages_left">
          <p>Row per page</p>
          <select @change="showRow($event)">
            <option
              v-for="(row, index) of rows"
              :key="index"
              :value="row.value"
              >{{ row.value }}</option
            >
          </select>
        </div>
        <div id="pages_right">
          <div style="clear: both; display: flex;">
            <p
              style="font-weight: bold; display: inline-block; margin: 0; padding-top: 5px;"
            >
              <span @click="showPage(page)" v-for="(page, index) of totalPages" :key="index" :value="page"> {{page}} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",

  data() {
    return {
      id: "",
      username: "",
      course: "",
      email: "",
      fullname: "",
      studentId: "",
      rows: [
        { id: 1, value: 5 },
        { id: 2, value: 10 },
        { id: 3, value: 15 },
        { id: 4, value: 20 },
      ],
      pageNo: 0,
      pageSize: 5,
      totalPages: 0,
      students: [],
      payload: [],
      errors: [],
    };
  },

  async beforeCreate() {
     this.payload = {
       pageNo: 0,
       pageSize: 5
     }
    await axios
    .post("http://localhost:8081/api/student/getAll", this.payload)
    .then((response) => {
      this.totalPages = response.data.totalPages
      this.students = response.data.content;
    });
  },
  methods: {
    async getAll() {
      this.payload = {
        pageNo: 0,
        pageSize: this.pageSize,
      };
      await axios
        .post("http://localhost:8081/api/student/getAll", this.payload)
        .then((response) => {
          console.log(response);
          this.totalPages = response.data.totalPages;
          console.log(this.totalPages);
          this.students = response.data.content;
        });
    },
    async search() {
      this.payload = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        username: this.username,
        email: this.email,
        course: this.course,
        fullname: this.fullname,
      };
      await axios
        .post(`http://localhost:8081/api/student/search`, this.payload)
        .then((response) => {
          this.students = response.data.content;
          this.totalPages = response.data.totalPages;
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    async deleteStudent(student) {
      let response = confirm(
        `Are you sure you want to delete ${student.username}`
      );
      if (response) {
        await axios
          .delete(`http://localhost:8081/api/student/${student.id}`)
          .then((response) => {
            alert(response.data);
            this.$router.go();
          });
      }
    },
    register() {
      // window.location.href = "http://localhost:8080/register";
      this.$router.push("/register");
    },

    showRow(event) {
      this.pageSize = event.target.value;
      this.pageNo = 0;
      this.search();
      console.log(event.target);
    },
    showPage(page){
      this.pageNo = page -  1;
      this.search();
      console.log(this.pageNo);
    }
  },
};
</script>

<style>
.container {
  margin-left: 0px;
}
.input-form {
  width: 600px;
  margin-left: 20px;
  padding-top: 5px;
}
.label {
  width: 100px;
  height: 40px;
  opacity: 1;
  display: inline-block;
}
input {
  width: 250px;
  height: 40px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 2px solid #72acff;
  border-radius: 6px;
  outline: none;
  opacity: 1;
  padding-left: 10px;
}
.show-button {
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}
button {
  width: 90px;
  height: 30px;
  background: var(--unnamed-color-18c090) 0% 0% no-repeat padding-box;
  background: #18c090 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  text-align: center;
  font: normal normal bold 11px/20px Helvetica;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 5px;
}
.show-table {
  clear: both;
}
table {
  width: 1000px;
  height: auto;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 90px #00000029;
  border: 0.5px solid #977c7c;
  border-radius: 6px;
  opacity: 1;
  margin: auto;
}
th {
  width: 16, 6%;
  height: 30px;
  background: #72acff 0% 0% no-repeat padding-box;
  box-shadow: 30px 3px 90px #00000029;
  border: 0.5px solid #c8c8c8;
  opacity: 1;
  text-align: center;
}
td {
  text-align: center;
  height: 30px;
}
#footer {
  clear: both;
}
#pages {
  width: 1182px;
  height: 31px;
  opacity: 1;
  margin: auto;
}
#pages_left {
  float: left;
}
#pages_left p {
  display: inline-block;
  margin: 0;
  font-weight: bold;
  padding-top: 8px;
}
#pages_right {
  float: right;
}
span{
  width: 20px;
  height: 10px;
  border: 1px solid rgb(69, 29, 216);
  background-color: wheat;
  margin-left: 5px;
}
span.active {
   background: green;
}
</style>
